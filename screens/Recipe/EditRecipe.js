import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CameraIcon, PlayIcon } from "react-native-heroicons/solid";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import IP_ADDRESS from "../../config";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { ScrollView } from "react-native";

const EditRecipe = () => {
  const navigation = useNavigation();
  const {
    params: { RecipeID },
  } = useRoute();
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [description, setDescription] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [category, setCategory] = useState("");
  const [suggestedCategories, setSuggestedCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [calorie, setCalorie] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [uploadedRecipeImage, setUploadedRecipeImage] = useState("");
  const [creator, setCreator] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const recipeResponse = await axios.get(
            `http://${IP_ADDRESS}:8000/api/recipes/find/${RecipeID}`
          );

          const { recipe } = recipeResponse.data;

          if (recipe) {
            setTitle(recipe.title || "");
            setCookingTime(recipe.cookingTime || "");
            setDescription(recipe.description || "");
            setDifficultyLevel(recipe.difficultyLevel || "");
            setCategory(recipe.category || "");
            setCuisine(recipe.cuisine || "");
            setCreator(recipe.creatorUser || "");
            setCalorie(recipe.calorie || "");
            setRecipeImage(recipe.image || "");
          }

          const fetchCategoryResponse = await axios.get(
            `http://${IP_ADDRESS}:8000/api/categories/find/${recipe.category}`
          );

          const { category: fetchedCategory } = fetchCategoryResponse.data; // Destructure category here
          if (fetchedCategory) {
            setCategoryInput(fetchedCategory.Name || "");
            // Access the Name property
          }
          setLoading(false);
        } catch (error) {
          console.log("Error fetching data", error);
        }
      };

      fetchData();
    }, [])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Use "canceled" instead of "cancelled"
      setUploadedRecipeImage(result.assets[0].uri); // Access the uri from the "assets" array
    }
  };

  const handleNextPress = () => {
    if (
      title.trim() === "" ||
      description === "" ||
      cookingTime === "" ||
      difficultyLevel === "" ||
      category === "" ||
      calorie === "" ||
      cuisine === ""
    ) {
      Alert.alert("Empty Fields", "Please fill in all required fields.");
      return;
    }

    const updatedRecipeData = new FormData();

    if (uploadedRecipeImage) {
      updatedRecipeData.append("image", {
        uri: uploadedRecipeImage,
        type: "image/jpeg",
        name: "recipe.jpg",
      });
    } else if (recipeImage) {
      // Use the fetched image if uploadedRecipeImage is empty
      updatedRecipeData.append("image", recipeImage);
    }

    updatedRecipeData.append("title", title);
    updatedRecipeData.append("description", description);
    updatedRecipeData.append("cookingTime", parseInt(cookingTime));
    updatedRecipeData.append("difficultyLevel", difficultyLevel);
    updatedRecipeData.append("category", categoryInput);
    updatedRecipeData.append("cuisine", cuisine);
    updatedRecipeData.append("creatorUser", creator);
    updatedRecipeData.append("calorie", calorie);

    axios
      .put(
        `http://${IP_ADDRESS}:8000/api/recipes/updateRecipe/${RecipeID}`,
        updatedRecipeData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("API Response:", response);

        Alert.alert(
          "Recipe Updated",
          "Your recipe has been updated successfully"
        );
        navigation.navigate("InstructionIngredient", { recipeId: RecipeID }); // Pass recipeId as a parameter
      })

      .catch((error) => {
        if (error.response) {
          console.log("Update Failed:", error.response.data);
        } else if (error.message) {
          console.log("Update Failed:", error.message);
        } else {
          console.log("Update Failed:", error);
        }

        Alert.alert(
          "Update Error",
          "An error occurred while updating the Recipe"
        );
      });
  };

  if (loading && !categoryInput) {
    return (
      <SafeAreaView className="flex-1 bg-CF4FFF5 ">
        <LinearGradient
          colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
          start={[0, 0]} // Starting point (optional, default is [0,0])
          end={[1, 0]} // Ending point (optional, default is [1,0])
          className="flex p-4 pt-10 justify-center flex-row w-full h-[80]  items-center"
        >
          <Text className="text-lg font-bold text-white">Create a Recipe</Text>
        </LinearGradient>
        <View
          style={styles.container}
          className="items-center justify-center w-100 h-4/5"
        >
          <ActivityIndicator size="large" color="#7caf75" />
        </View>
      </SafeAreaView>
    );
  }

  const imageUrl = recipeImage;
  const cleanedImageUrl = imageUrl ? imageUrl.replace(/\\/g, "/") : ""; // Replace backslashes with forward slashes
  const filename = cleanedImageUrl ? cleanedImageUrl.split("/").pop() : ""; // Add a conditional check

  const source = uploadedRecipeImage
    ? uploadedRecipeImage
    : `http://${IP_ADDRESS}:8000/api/files/${filename}`;

  const handleCategoryInputChange = async (text) => {
    setCategoryInput(text);

    // Make an API call to your server to fetch suggested categories based on the user's input
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/categories/searchByName?q=${text}`
      );

      // Extract the suggested categories from the response
      const suggestedCategories = response.data.categories;

      // Update the suggestedCategories state
      setSuggestedCategories(suggestedCategories);
    } catch (error) {
      console.error("Error fetching suggested categories:", error);
    }
  };

  console.log(suggestedCategories);

  return (
    <SafeAreaView className="flex-1 bg-CF4FFF5 ">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-center flex-row w-full h-[80]  items-center"
      >
        <Text className="text-lg font-bold text-white">Create a Recipe</Text>
      </LinearGradient>
      <View className="w-100 p-2 pt-4 ">
        <View
          className="w-100 rounded-xl bg-white items-center pt-4 pb-4 gap-y-2"
          style={styles.cardContainer}
        >
          <View className="flex-row">
            <TouchableOpacity
              onPress={pickImage}
              className="w-[100] h-[100] rounded-xl"
            >
              {uploadedRecipeImage ? (
                <Image
                  source={{ uri: uploadedRecipeImage }}
                  className="w-[100] h-[100] rounded-xl"
                />
              ) : (
                <Image
                  source={{ uri: source }}
                  className="w-[100] h-[100] rounded-xl"
                />
              )}
            </TouchableOpacity>

            {/* Text input for the Title and Cooking Time */}
            <View className="ml-4">
              <View>
                <Text>Recipe Title</Text>
                <TextInput
                  className="w-[200] bg-white border-solid border-gray-600 border-[1px] h-[30] items-center justify-center rounded-[5px] pl-2"
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                />
              </View>
              <View className="flex-row gap-x-2">
                <View className="mt-1">
                  <Text>Cooking Time</Text>
                  <TextInput
                    className="w-[80] bg-white border-solid border-gray-600 border-[1px] h-[30] items-center justify-center rounded-[5px] pl-2"
                    value={cookingTime.toString()} // Convert it to a string when displaying
                    onChangeText={(text) => {
                      // Use parseInt to convert the input value to an integer
                      const intValue = parseInt(text, 10); // Base 10 (decimal)

                      // Check if the conversion was successful (not NaN)
                      if (!isNaN(intValue)) {
                        setCookingTime(intValue); // Set the integer value in the state
                      }
                    }}
                  />
                </View>
                <View className="mt-1">
                  <Text>Calorie</Text>
                  <TextInput
                    className="w-[80] bg-white border-solid border-gray-600 border-[1px] h-[30] items-center justify-center rounded-[5px] pl-2"
                    value={calorie.toString()} // Convert it to a string when displaying
                    onChangeText={(text) => {
                      // Use parseInt to convert the input value to an integer
                      const intValue = parseInt(text, 10); // Base 10 (decimal)

                      // Check if the conversion was successful (not NaN)
                      if (!isNaN(intValue)) {
                        setCalorie(intValue); // Set the integer value in the state
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View className="w-[300]">
            <Text>Recipe Description</Text>
            <TextInput
              multiline
              numberOfLines={4} // You can adjust the number of visible lines
              className="w-100 bg-white border-solid border-gray-600 border-[1px] h-[90] items-center justify-center rounded-[5px] pl-2"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          <View className="w-300 flex-row gap-4">
            <View>
              <Text>Difficulty Level</Text>
              <TextInput
                className="w-[140] bg-white border-solid border-gray-600 border-[1px] h-[30] items-center justify-center rounded-[5px] pl-2"
                value={difficultyLevel}
                onChangeText={setDifficultyLevel}
              />
            </View>
            <View className="mt-1">
              <Text>Cuisine</Text>
              <TextInput
                className="w-[140] bg-white border-solid border-gray-600 border-[1px] h-[30] items-center justify-center rounded-[5px] pl-2"
                value={cuisine}
                onChangeText={setCuisine}
              />
            </View>
          </View>
          <View className="w-[300]">
            <Text>Category</Text>
            <TextInput
              className="w-full bg-white border-solid border-gray-600 border-[1px] h-[30] items-center justify-center rounded-[5px] pl-2"
              onChangeText={handleCategoryInputChange}
              value={categoryInput}
            />
            {/* Display the suggested categories */}
            {suggestedCategories.length > 0 && (
              <ScrollView className="h-[200] w-100">
                {suggestedCategories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      // When a suggested category is selected, update the category input field
                      setCategoryInput(category);
                      // Clear the suggested categories list
                      setSuggestedCategories([]);
                    }}
                  >
                    <Text className="p-1 rounded-xl bg-gray-100 my-1">
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </View>

      <View className="absolute bottom-4 left-4 ">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="w-18 bg-CEEAEA0 h-8 justify-around px-3 rounded-[5px] items-center flex-row"
        >
          <PlayIcon
            size={18}
            color="#642323"
            style={{ transform: [{ scaleX: -1 }] }}
          />
          <Text className="font-bold text-base text-C642323">Back</Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-4 right-4 ">
        <TouchableOpacity
          onPress={handleNextPress}
          className="w-18 bg-C73CEE2   h-8 justify-around px-3 rounded-[5px] items-center flex-row"
        >
          <Text className="font-bold text-base text-C11434E">Next</Text>
          <PlayIcon size={18} color="#11434E" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

//style
const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default EditRecipe;

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  CameraIcon,
  PlayIcon,
  PlayPauseIcon,
  PlusIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../../config";
import * as ImagePicker from "expo-image-picker";

const AddRecipe = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [description, setDescription] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [calorie, setCalorie] = useState(""); // Added state for calorie
  const [recipeImage, setRecipeImage] = useState(""); // Added state for recipe image

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Use "canceled" instead of "cancelled"
      setRecipeImage(result.assets[0].uri); // Access the uri from the "assets" array
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      } catch (error) {
        console.log("Error fetching userId", error);
      }
    };

    fetchUserId();
  }, []);

  const handleNextPress = () => {
    if (
      title.trim() === "" ||
      description === "" ||
      cookingTime === "" ||
      difficultyLevel === "" ||
      category === "" ||
      calorie === "" ||
      cuisine === "" ||
      recipeImage === "" // Check if recipeImage is empty
    ) {
      Alert.alert("Empty Fields", "Please fill in all required fields.");
      return;
    }

    const recipeData = new FormData(); // Create a new FormData object
    recipeData.append("title", title);
    recipeData.append("description", description);
    recipeData.append("cookingTime", parseInt(cookingTime)); // Convert to number
    recipeData.append("difficultyLevel", difficultyLevel);
    recipeData.append("category", category);
    recipeData.append("cuisine", cuisine);
    recipeData.append("creatorUser", userId); // Use creatorUser instead of creatorUserID
    recipeData.append("calorie", calorie); // Use creatorUser instead of creatorUserID
    recipeData.append("image", {
      uri: recipeImage,
      type: "image/jpeg", // or photo.type
      name: "recipe.jpg", // Adjust the file name as needed
    }); // Add image to recipe data

    axios
      .post(`http://${IP_ADDRESS}:8000/api/recipes`, recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      // After successful recipe addition in handleNextPress
      .then((response) => {
        console.log("API Response:", response);
        const recipeId = response.data.recipe._id; // Access the recipeId from the correct path in the response
        console.log("Recipe ID:", recipeId);
        if (!recipeId) {
          // Check if recipeId is undefined
          console.log("Error: Recipe ID is undefined");
          return;
        }
        Alert.alert("Recipe Added", "Your recipe has been added successfully");
        setTitle("");
        setDescription("");
        setCookingTime("");
        setDifficultyLevel("");
        setCategory("");
        setCuisine("");
        setRecipeImage(""); // Reset recipe image
        setCalorie(""); // Reset recipe image

        navigation.navigate("InstructionIngredient", { recipeId }); // Pass recipeId as a parameter
      })

      .catch((error) => {
        if (error.response) {
          console.log("Recipe Addition Failed:", error.response.data);
        } else if (error.message) {
          console.log("Recipe Addition Failed:", error.message);
        } else {
          console.log("Recipe Addition Failed:", error);
        }

        Alert.alert(
          "Recipe Addition Error",
          "An error occurred while adding the recipe"
        );
      });
  };

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
            <View className="w-[100] h-[100] bg-gray-300 justify-center items-center rounded-[10px]">
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#ddd",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                {recipeImage ? (
                  <Image
                    source={{ uri: recipeImage }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                ) : (
                  <CameraIcon size={25} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>

            {/* Text input for the Title and Cooking Time */}
            <View className="ml-4">
              <View>
                <Text>Recipe Title</Text>
                <TextInput
                  className="w-[200] bg-white border-solid border-gray-600 border-[1px] h-[30] items-center justify-center rounded-[5px] pl-2"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
              <View className="flex-row gap-x-2">
              <View className="mt-1">
                <Text>Cooking Time</Text>
                <TextInput
                  className="w-[80] bg-white border-solid border-gray-600 border-[1px] h-[30] items-center justify-center rounded-[5px] pl-2"
                  value={cookingTime}
                  onChangeText={setCookingTime}
                />
              </View>
              <View className="mt-1">
                <Text>Calorie</Text>
                <TextInput
                  className="w-[80] bg-white border-solid border-gray-600 border-[1px] h-[30] items-center justify-center rounded-[5px] pl-2"
                  value={calorie}
                  onChangeText={setCalorie}
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
              onChangeText={setDescription}
            />
          </View>

          <View className="w-300 flex-row gap-4">
            <View>
              <Text>Difficulty Level</Text>
              <TextInput
                className="w-[90] bg-white border-solid border-gray-600 border-[1px] h-[30] items-center justify-center rounded-[5px] pl-2"
                value={difficultyLevel}
                onChangeText={setDifficultyLevel}
              />
            </View>
            <View className="mt-1">
              <Text>Category</Text>
              <TextInput
                className="w-[90] bg-white border-solid border-gray-600 border-[1px] h-[30] items-center justify-center rounded-[5px] pl-2"
                onChangeText={setCategory}
              />
            </View>
            <View className="mt-1">
              <Text>Cuisine</Text>
              <TextInput
                className="w-[90] bg-white border-solid border-gray-600 border-[1px] h-[30] items-center justify-center rounded-[5px] pl-2"
                onChangeText={setCuisine}
              />
            </View>
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

export default AddRecipe;




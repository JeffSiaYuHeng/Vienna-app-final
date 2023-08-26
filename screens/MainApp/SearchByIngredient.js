import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native"; // Import useFocusEffect
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import SelectionToggle from "../../widgets/SelectionToggle";
import { XMarkIcon, PlusIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import SearchByIngredientSmallBox from "../../widgets/SearchByIngredientSmallBox";
import { Alert } from "react-native";
import RecipeCard from "../../widgets/RecipeCard";

const IngredientSearchScreen = () => {
  const [ingredientName, setIngredientName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searching, setSearching] = useState(false); // To display a loading indicator
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isAddIngredientVisible, setIsAddIngredientVisible] = useState(false);
  const navigation = useNavigation();

  const HomepageGate = () => {
    navigation.navigate("TabNavigator");
  };

  // Function to toggle the visibility of the "Add Ingredient" section
  const toggleAddIngredient = () => {
    setIsAddIngredientVisible(!isAddIngredientVisible);
  };
  // Fetch ingredients from the API
  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/ingredients/`
      );
      setIngredients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Use useFocusEffect to fetch data when the component gains focus
  useFocusEffect(
    React.useCallback(() => {
      fetchIngredients();
    }, [])
  );

  // Filter ingredients based on user input
  useEffect(() => {
    const newData = ingredients.filter((item) =>
      item.Name.toUpperCase().includes(searchText.toUpperCase())
    );
    setFilteredData(newData);
  }, [searchText, ingredients]);

  // Handle search input change
  const handleSearch = (text) => {
    setSearchText(text);
  };

  // Toggle ingredient selection
  const handleToggle = (IngredientId) => {
    if (selectedIngredients.includes(IngredientId)) {
      setSelectedIngredients((prev) =>
        prev.filter((item) => item !== IngredientId)
      );
    } else {
      setSelectedIngredients((prev) => [...prev, IngredientId]);
    }
  };

  // Clear all selected ingredients
  const clearAllSelections = () => {
    setSelectedIngredients([]);
    setRecipes([]);
    // fetchIngredients();
    // You may need to fetch additional data and update their selection state here
  };

  useEffect(() => {
    console.log(selectedIngredients);
  }, [selectedIngredients]); // Log the state whenever it changes

  const searchRecipes = async () => {

    if (selectedIngredients.length === 0) {
      Alert.alert("Error", "At least select one Ingredient");
      return; // Exit the function early
    }



    try {
      setSearching(true); // Start searching, show a loading indicator
  
      const response = await axios.post(
        `http://${IP_ADDRESS}:8000/api/ingredientSearch/search`,
        { ingredientIds: selectedIngredients }, // Send the selected ingredient IDs as the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

  
      if (!response.data.recipes) {
        throw new Error("Ingredient not found");
      }
  
      setRecipes(response.data.recipes);
      console.log(recipes);
    } catch (error) {
      console.error(error);
      // Handle error appropriately (e.g., show an error message)
    } finally {
      setSearching(false); // Finish searching, hide the loading indicator
    }
  };
  
  return (
    <SafeAreaView className="flex-1 bg-CF4FFF5 ">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-between flex-row w-full h-[80]  items-center"
      >
        <View></View>
        <Text className="text-lg font-bold text-white">
          {"Search By Ingredient"}
        </Text>
        <TouchableOpacity onPress={HomepageGate}>
          <XMarkIcon size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      <View className="w-100 p-4 h-screen  ">

        <View className="flex-row justify-between  mb-4">
        <TouchableOpacity
          onPress={toggleAddIngredient}
          className=" items-center flex-row justify-between px-3  h-8   bg-CC5ECBE rounded-lg"
        >
          <Text className="font-bold text-C2B5708  text-sm">Add Ingredient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={clearAllSelections} // Call the clearAllSelections function
          className=" w-[70px] bg-red-400 h-8 justify-around px-3 rounded-lg items-center flex-row "
        >
          <Text className="font-bold text-sm text-white">Clear All</Text>
        </TouchableOpacity>
</View>



        <View  style={styles.cardContainer} className="w-100 bg-white h-32 rounded-xl flex-row flex-wrap p-4">

        {selectedIngredients.length > 0 ? (
          selectedIngredients.map((selectedIngredient) => (
            <SearchByIngredientSmallBox
              key={selectedIngredient._id} // Use a unique identifier from your data here
              RecipeIngredientId={selectedIngredient}
            />
          ))
        ) : (
          <Text className="ml-2">No ingredients Selected.</Text>
        )}


        </View>


        <View className="w-100 items-center justify-center pt-2">
        <TouchableOpacity
          onPress={searchRecipes}
          className=" items-center flex-row justify-between px-3  h-8  bg-CC5ECBE rounded-lg"
        >
          <Text className="font-bold text-C2B5708  text-sm">Search</Text>
        </TouchableOpacity>
                  <Text className="font-bold text-C2B5708 text-lg py-2">
          Match's Recipes
        </Text>
      </View>
      <ScrollView
        className="p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
          marginBottom: 30,
        }}
      >
                {recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe._id} // This should be category._id
            RecipeID={recipe._id} // This should be category._i
            imgUrl={recipe.image}
            Title={recipe.title || "Unknown Title"}
            date={recipe.createdAt}
            Description={recipe.description || "No description available"}
            rates={5}
            Calorie={recipe.calorie}
            CreatorID={recipe.creatorUser}
            Recipe_View={150}
            Cooking_Time={recipe.cookingTime || "Unknown Time"}
            Difficulty_Level={recipe.difficultyLevel || "Unknown Level"}
            Like={15}
          />
        ))
      ) : (
        <View className="w-100 items-center">
          <Text>No Recipe found.</Text>
        </View>
      )}
              </ScrollView>

      </View>

      {isAddIngredientVisible && (
        <View className="absolute top-[100] w-screen h-screen items-center ">
          <View
            className="w-[300px] rounded-xl bg-white p-4 pt-0 gap-y-4"
            style={styles.cardContainer}
          >
            <View className="w-full justify-between flex-row">
              <View></View>
              <TouchableOpacity className="" onPress={toggleAddIngredient}>
                <XMarkIcon size={18} color="#000000" />
              </TouchableOpacity>
            </View>
            <View className="bg-gray-200 w-full h-9 rounded-[10px] px-2 flex-row items-center justify-between">
              <TextInput
                onChangeText={handleSearch}
                value={searchText}
                placeholder="Search Ingredient"
              />
            </View>

            <ScrollView className="h-[300px]">
              {filteredData.map((item) => (
                <View key={item.IngredientId}>
                  <SelectionToggle
                    value={item.Name}
                    isSelected={selectedIngredients.includes(item.IngredientId)}
                    onToggle={() => handleToggle(item.IngredientId)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
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

export default IngredientSearchScreen;

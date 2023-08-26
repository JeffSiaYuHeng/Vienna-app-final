import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import MyRecipeCard from "../../widgets/MyRecipeCard";
import { MagnifyingGlassIcon, PlusIcon } from "react-native-heroicons/outline";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../../config"; // Adjust the path as needed

export default function RecipeScreens() {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch recipes from the database
    const refreshPage = navigation.addListener("focus", () => {
      const fetchRecipes = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
          if (!userId) {
            console.error("User ID is null or undefined");
            return;
          }
          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/api/recipes/user/${userId}`
          );
          setRecipes(response.data.recipes);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching recipes", error);
        }
      };
      fetchRecipes();
    });
    return refreshPage;
  }, []);

  useEffect(() => {
    const newData = recipes.filter((item) =>
      item.title.toUpperCase().includes(searchText.toUpperCase())
    );
    setFilteredData(newData);
  }, [searchText, recipes]);

  if (loading) {
    return (
      <View>
        <LinearGradient
          colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
          start={[0, 0]} // Starting point (optional, default is [0,0])
          end={[1, 0]} // Ending point (optional, default is [1,0])
          className="flex p-4 pt-10 justify-center flex-row w-full h-[80]  items-center"
        >
          <Text className="text-lg font-bold text-white">My Recipe</Text>
        </LinearGradient>
        <View className="w-100 h-4/5 items-center justify-center">
          <ActivityIndicator size="large" color="#7caf75" />
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-CF4FFF5 ">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-center flex-row w-full h-[80]  items-center"
      >
        <Text className="text-lg font-bold text-white">My Recipe</Text>
      </LinearGradient>

      <View className="w-100 h-4/5 p-2 pt-4 ">
        <View className="w-100 bg-white border-solid border-CC5ECBE border-2 h-10 justify-around items-center flex-row rounded-[5px] mb-5">
          <TextInput
            placeholder="Search Recipe from your creation"
            onChangeText={setSearchText}
            value={searchText}
            className="pl-2"
          />
          <MagnifyingGlassIcon size={25} color="#B4B4B4" />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
            marginBottom: 40,
          }}
        >
          {recipes.length > 0 ? (
            filteredData.map((recipe, index) => (
              <MyRecipeCard
                key={recipe._id} // This should be category._id
                RecipeID={recipe._id} // This should be category._i
                imgUrl={recipe.image}
                Title={recipe.title || "Unknown Title"}
                date={recipe.createdAt}
                Description={recipe.description || "No description available"}
                rates={null}
                Calorie={recipe.calorie}
                Recipe_View={null}
                Cooking_Time={recipe.cookingTime || "Unknown Time"}
                Difficulty_Level={recipe.difficultyLevel || "Unknown Level"}
                Like={null}
              />
            ))
          ) : (
            <View className="w-100 items-center">
              <Text>No Recipe found.</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View className="absolute bottom-20 right-4 ">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddRecipe");
          }}
          className="w-24 bg-C9BC17C h-8 justify-around px-3 rounded-[5px] items-center flex-row"
        >
          <PlusIcon size={20} color="#ffffff" />
          <Text className="font-bold text-base text-white">Recipe</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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

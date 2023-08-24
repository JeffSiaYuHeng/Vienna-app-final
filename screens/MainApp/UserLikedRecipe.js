import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import RecipeCard from "../../widgets/RecipeCard";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { LinearGradient } from "expo-linear-gradient";

export default function UserLikedRecipe() {
  const navigation = useNavigation();

  const [recipeLikes, setRecipeLikes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeLikes = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
  
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/recipeLikes/byUser?userId=${userId}`
        );
  
        setRecipeLikes(response.data);
      } catch (error) {
        console.log("Error fetching recipe likes", error);
      }
    };
  
    fetchRecipeLikes();
  }, []);
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (recipeLikes.length > 0) {
          // Map through recipeLikes and fetch recipes for each RecipeId
          const recipePromises = recipeLikes.map(async (like) => {
            const response = await axios.get(
              `http://${IP_ADDRESS}:8000/api/recipes/find/${like.RecipeID}`
            );
            return response.data;
          });
  
          // Wait for all requests to complete and set the recipes
          const fetchedRecipes = await Promise.all(recipePromises);
          setRecipes(fetchedRecipes);
          setLoading(false); // Set loading to false once recipes are fetched
  
          // Additional logic here if needed after fetching recipes
        }
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };
  
    fetchRecipes();
  }, [recipeLikes]);





  useFocusEffect(
    React.useCallback(() => {


      setRecipes([]);
      const fetchRecipeLikes = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
    
          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/api/recipeLikes/byUser?userId=${userId}`
          );
    
          setRecipeLikes(response.data);
        } catch (error) {
          console.log("Error fetching recipe likes", error);
        }
      };
    
      fetchRecipeLikes();
    }, [])
  );

  if (loading) {
    return (
      <View>
        <LinearGradient
          colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
          start={[0, 0]} // Starting point (optional, default is [0,0])
          end={[1, 0]} // Ending point (optional, default is [1,0])
          className="flex p-4 pt-10 justify-center flex-row w-full h-[80]  items-center"
        >
          <Text className="text-lg font-bold text-white">Liked Recipe</Text>
        </LinearGradient>
        <View className="w-100 h-screen items-center justify-center">
          <ActivityIndicator size="large" color="#7caf75" />
        </View>
      </View>
    );
  }
  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-center flex-row w-full h-[80]  items-center"
      >
        <Text className="text-lg font-bold text-white">Liked Recipe</Text>
      </LinearGradient>

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
              key={recipe.recipe._id} // This should be category._id
              RecipeID={recipe.recipe._id} // This should be category._i
              imgUrl={recipe.recipe.image}
              Title={recipe.recipe.title || "Unknown Title"}
              date={recipe.recipe.createdAt}
              Description={
                recipe.recipe.description || "No description available"
              }
              rates={5}
              Calorie={recipe.recipe.calorie}
              CreatorID={recipe.recipe.creatorUser}
              Recipe_View={150}
              user_img={require("../../assets/UserIcon/User_1.png")}
              Cooking_Time={recipe.recipe.cookingTime || "Unknown Time"}
              Difficulty_Level={
                recipe.recipe.difficultyLevel || "Unknown Level"
              }
              Like={15}
            />
          ))
        ) : (
          <View className="w-100 items-center">
            <Text>There is No liked recipe</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

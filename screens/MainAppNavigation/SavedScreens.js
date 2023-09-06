import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import RecipeCard from "../../widgets/RecipeCard";
import IP_ADDRESS from "../../config"; // Adjust the path as needed

export default function UserSavedRecipe() {
  const navigation = useNavigation();

  const [savedRecipes, setSavedRecipes] = useState([]); // Change variable name
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Use useFocusEffect to refresh the component when it comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchSavedRecipes = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;

          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/api/savedRecipes/byUser?userId=${userId}`
          );

          setSavedRecipes(response.data);
        } catch (error) {
          console.log("Error fetching saved recipes", error);
        }
      };

      fetchSavedRecipes();
    }, []) // Empty dependency array, so this effect only runs once when the component mounts
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchRecipes = async () => {
        try {
          if (savedRecipes && savedRecipes.length > 0) {
            const recipePromises = savedRecipes.map(async (savedRecipe) => {
              const response = await axios.get(
                `http://${IP_ADDRESS}:8000/api/recipes/find/${savedRecipe.RecipeID}`
              );
              return response.data;
            });

            const fetchedRecipes = await Promise.all(recipePromises);
            setRecipes(fetchedRecipes);
          } else {
            setRecipes([]);
          }

          setLoading(false);
        } catch (error) {
          console.error("Error fetching recipes", error);
        }
      };

      fetchRecipes();
    }, [savedRecipes]) // Dependency array includes savedRecipes
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
        <Text className="text-lg font-bold text-white">Saved</Text>
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
              key={recipe.recipe._id} // This should be _id
              RecipeID={recipe.recipe._id} // This should be _id
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
          <View className="items-center justify-center w-100 h-4/5">
            <ActivityIndicator size="large" color="#7caf75" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

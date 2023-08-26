import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StarIcon, HeartIcon, FireIcon } from "react-native-heroicons/solid";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import IP_ADDRESS from "../config"; // Adjust the path as needed
import RecipeIngredientSmallBox from "./RecipeIngredientSmallBox";
import { RenderStartWidgets } from "./RenderStartWidgets";

//main part
export default function MyRecipeCard({
  RecipeID,
  imgUrl,
  Title,
  Description,
  date,
  rates,
  Calorie,
  Recipe_View,
  Cooking_Time,
  Difficulty_Level,
  Like,
}) {
  const navigation = useNavigation();

  const imageUrl = imgUrl;
  const cleanedImageUrl = imageUrl ? imageUrl.replace(/\\/g, "/") : ""; // Replace backslashes with forward slashes
  const filename = cleanedImageUrl ? cleanedImageUrl.split("/").pop() : ""; // Add a conditional check
  const source = { uri: `http://${IP_ADDRESS}:8000/api/files/${filename}` };
  const imgUrlSource = source;

  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeLikes, setRecipeLikes] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchRecipeIngredient = async () => {
        try {
          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/api/recipeIngredients/${RecipeID}`
          );
          setRecipeIngredients(response.data.recipeIngredients);
        } catch (error) {
          console.error("Error fetching recipeIngredients", error);
        }
      };

      fetchRecipeIngredient();
    }, []) // Dependency array includes RecipeID
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchRecipeLikesByRecipeId = async () => {
        try {
          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/api/recipeLikes/byRecipe/${RecipeID}`
          );

          setRecipeLikes(response.data);
        } catch (error) {
          console.log("Error fetching RecipeLikes by RecipeID", error);
        }
      };

      fetchRecipeLikesByRecipeId();
    }, [RecipeID]) // Dependency array includes RecipeID
  );

  const totalRecipeLikes = recipeLikes.length;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedCookingTime =
    Cooking_Time > 60
      ? `${Math.floor(Cooking_Time / 60)} hour ${Cooking_Time % 60} minutes`
      : `${Cooking_Time} minutes`;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("MyRecipeTabs", {
          RecipeID,
          imgUrlSource,
          Title,
          Description,
          formattedDate,
          rates,
          Calorie,
          Recipe_View,
          formattedCookingTime,
          Difficulty_Level,
          Like,
        });
      }}
      style={styles.cardContainer}
    >
      <View className="w-100 h-28 rounded-xl flex-row pr-1">
        <Image source={source} className="w-28 h-28 rounded-xl" />

        <View className="absolute mt-1 flex-row w-28 justify-around">
          <View className="flex-row items-center justify-center px-2 h-5 bg-CEFA8C2 rounded-xl">
            <HeartIcon size={10} color="#ffffff" />
            <Text className="text-white font-bold text-xs">
              {totalRecipeLikes}
            </Text>
          </View>

          <View className="  flex items-center justify-center px-1 h-5 ml-1 bg-C9BC17C rounded">
            <Text className="text-white font-bold text-xs">
              {formattedCookingTime}
            </Text>
          </View>
        </View>
        <View className="absolute bottom-2 left-2 flex items-center justify-center w-16 h-5 bg-CE38D68 rounded-lg">
          <Text className="text-white text-xs font-bold ">
            {Difficulty_Level}
          </Text>
        </View>
        <View className=" pl-1 pt-1">
          <View className="flex-row items-center">
            <View className="mr-1">
              <Text className="font-bold text-lg text-black">{Title}</Text>
            </View>
          </View>

          <RenderStartWidgets recipeId={RecipeID} />
          <View className="flex-row items-center justify-center px-2 h-5 w-20 ml-1 mt-1 bg-CEEDDA0 rounded">
            <Text className="text-C645623 text-xxs font-bold pt-1">est.</Text>
            <FireIcon size={15} color="#6D4731" />
            <Text className="text-C645623 font-bold text-xs">
              {Calorie} Cal
            </Text>
          </View>
          <View className="flex-row">
            <View className="flex-row  mt-1 ">
              {recipeIngredients.length > 0 ? (
                recipeIngredients.slice(0, 3).map((recipeIngredient) => (
                  <RecipeIngredientSmallBox
                    key={recipeIngredient._id} // Use a unique identifier from your data here
                    recipeIngredientID={recipeIngredient._id}
                    IngredientId={recipeIngredient.RecipeIngredientId}
                  />
                ))
              ) : (
                <Text className="ml-2"></Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

//style
const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
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

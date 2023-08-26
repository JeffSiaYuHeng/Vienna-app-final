import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { StarIcon, HeartIcon, FireIcon } from "react-native-heroicons/solid";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../config"; // Adjust the path as needed
import { ActivityIndicator } from "react-native";
import RecipeIngredientSmallBox from "./RecipeIngredientSmallBox";
import { RenderStartWidgets } from "./RenderStartWidgets";
//rating system


//main part
export default function RecipeCard({
  RecipeID,
  imgUrl,
  Title,
  Description,
  date,
  Calorie,
  CreatorID,
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
  const [loading, setLoading] = useState(true);

  const [userProfile, setUserProfile] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeLikes, setRecipeLikes] = useState([]);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/users/user/${CreatorID}`
        );
        setUserProfile(response.data);
      } catch (error) {
        console.log("Error fetching user profile", error);
      }
    };
    fetchUserProfile();
  }, [CreatorID]);
  const username = userProfile.username;

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

  useFocusEffect(
    React.useCallback(() => {
      const fetchRecipeIngredient = async () => {
        try {
          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/api/recipeIngredients/${RecipeID}`
          );
          setRecipeIngredients(response.data.recipeIngredients);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching recipeIngredients", error);
          setLoading(false);
        }
      };

      fetchRecipeIngredient();
    }, []) // Dependency array includes RecipeID
  );

  const imgUrlUser = userProfile.UserImage;

  const cleanedImageUrlUser = imgUrlUser ? imgUrlUser.replace(/\\/g, "/") : ""; // Replace backslashes with forward slashes
  const filenameUser = cleanedImageUrlUser
    ? cleanedImageUrlUser.split("/").pop()
    : ""; // Add a conditional check
  const sourceUser = {
    uri: `http://${IP_ADDRESS}:8000/api/files/${filenameUser}`,
  };

  if (!userProfile.UserImage) {
    imageSourceUser = require("../assets/UserIcon/User_1.png");
  } else {
    imageSourceUser = sourceUser;
  }

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedCookingTime =
    Cooking_Time > 60
      ? `${Math.floor(Cooking_Time / 60)} hour ${Cooking_Time % 60} minutes`
      : `${Cooking_Time} minutes`;

  if (loading) {
    return (
      <View className="w-100 h-screen items-center justify-center">
        <ActivityIndicator size="large" color="#7caf75" />
      </View>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("RecipeTabs", {
          RecipeID,
          imgUrlSource,
          Title,
          Description,
          formattedDate,
          Calorie,
          username,
          sourceUser,
          CreatorID,
          formattedCookingTime,
          Difficulty_Level,
          totalRecipeLikes,
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
        <View className=" pt-1 px-1">
          <View className="flex-row items-center">
            <View className="mr-1">
              <Text className="font-bold text-lg text-black">{Title}</Text>
            </View>
          </View>
          <View>
            <Text className="text-gray-600 text-xs ml-1">{formattedDate}</Text>
          </View>
          {/* <RatingIcon /> */}
          <RenderStartWidgets recipeId={RecipeID}/>
          <View className="flex-row ml-1 items-center py-1">
            <Image source={sourceUser} className="w-4 h-4 rounded-full" />
            <View className="ml-1">
              <Text className="font-medium text-xs">{username}</Text>
            </View>
          </View>
          <View className="flex-row ">
            <View className="flex-row">
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

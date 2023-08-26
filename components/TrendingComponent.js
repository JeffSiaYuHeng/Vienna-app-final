import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import RecipeCard from "../widgets/RecipeCard";
import IP_ADDRESS from "../config"; // Adjust the path as needed
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function TrendingComponent() {
  const navigation = useNavigation();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/api/recipes/home`
          );
          setRecipes(response.data.recipes);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching recipes", error);
        }
      };

      fetchRecipes();
    }, []) // The empty dependency array means this effect runs when the component comes into focus and unmounts when it goes out of focus
  );

  if (loading) {
    return (
      <View className="w-100 h-screen items-center justify-center">
        <ActivityIndicator size="large" color="#7caf75" />
      </View>
    );
  }
  return (
    <View>
      {/* Header */}
      <View className="flex-row px-5 mt-2 justify-between">
        <View>
          {/* <TouchableOpacity className=" w-14 h-6 flex mb-2 items-center justify-center bg-CC5ECBE rounded-full">
            <Text className="text-xs text-C2B5708">View All</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      {/**Content */}
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
  );
}

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TrashIcon } from "react-native-heroicons/solid";
import IP_ADDRESS from "../config"; // Adjust the path as needed
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function RecipeIngredientSmallBox({
  recipeIngredientID,
  IngredientId,
}) {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/ingredients/${IngredientId}`
      );

      if (response.status === 404) {
        console.error("Ingredient not found");
        // Handle the 404 error appropriately, e.g., show an error message to the user.
      } else {
        setIngredients(response.data);
      }
    } catch (error) {
      console.error("Error fetching ingredient:", error);
      // Handle other errors, e.g., network issues.
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchIngredients();
    }, [])
  );

  return (
    <View className="flex items-center justify-center px-1 h-5 ml-1 bg-CEEDDA0 rounded">
      <Text className="text-C645623 text-xs">{ingredients.Name}</Text>
    </View>
  );
}

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TrashIcon } from "react-native-heroicons/solid";
import IP_ADDRESS from "../config"; // Adjust the path as needed
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function AddRecipeIngredientRow({
  recipeIngredientID,
  IngredientId,
  onDelete,
}) {
  const [ingredients, setIngredients] = useState([]);




  const handleDeleteRecipeIngredient = async () => {
    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:8000/api/recipeIngredients/delete/${recipeIngredientID}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data.message);
      onDelete();
      // Add any additional logic or UI updates after successful deletion
    } catch (error) {
      console.log("Error deleting Recipe ingredient", error);
      console.log(error.message);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/ingredients/${IngredientId}`
      );
      
      if (response.status === 404) {
        console.error('Ingredient not found');
        // Handle the 404 error appropriately, e.g., show an error message to the user.
      } else {
        setIngredients(response.data);
      }
    } catch (error) {
      console.error('Error fetching ingredient:', error);
      // Handle other errors, e.g., network issues.
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      fetchIngredients();
    }, [])
  );



  return (
    <View
      className="flex-row items-center justify-between w-full bg-gray-100 px-2 my-2 rounded-xl py-2"
      style={styles.cardContainer}
    >
      <View className="flex-row items-center gap-1 w-10/12">
        <Text>{ingredients.Name}</Text>
      </View>
      <TouchableOpacity>
        <TrashIcon size={20} color="#000" onPress={handleDeleteRecipeIngredient} />
      </TouchableOpacity>
    </View>
  );
}

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

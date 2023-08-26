import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
// import IngredientRow from "../widgets/IngredientRow";
import InstructionRow from "../widgets/InstructionRow";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../config"; // Adjust the path as needed
import axios from "axios";
import RecipeIngredientRow from "./../widgets/RecipeIngredientRow";

const RecipeToggle = ({ RecipeID }) => {
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [userId, setUserId] = useState(true);
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
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

    const fetchInstructions = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/instructions/${RecipeID}`
        );
        setInstructions(response.data.instructions);
      } catch (error) {
        console.error("Error fetching instructions", error);
      }
    };

    fetchInstructions();
  }, []);

  const createShoppingList = async () => {
    try {
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }
      const newShoppingList = recipeIngredients.map((recipeIngredient) => ({
        userID: userId, // Make sure userId is defined
        itemName: recipeIngredient.RecipeIngredientId, // Assuming IngredientName is the property that contains the ingredient name
      }));

      console.log(newShoppingList);

      if (newShoppingList.some((item) => !item.userID || !item.itemName)) {
        console.error("Invalid shopping list data.");
        return;
      }
      // Send a POST request to create the shopping list items
      const response = await axios.post(
        `http://${IP_ADDRESS}:8000/api/shoppingList/create`,
        newShoppingList
      );

      // Update your UI or state with the newly created shopping list
      setShoppingList(newShoppingList);
      Alert.alert(
        "Created Successful",
        "The items already add to your shopping list"
      );
      // Handle success or update your UI as needed
    } catch (error) {
      // Log the error
      console.error("Shopping List Item Creation Error", error);
    }
  };

  const [isCollapsedIngredient, setIsCollapsedIngredient] = useState(true);

  const toggleCollapsibleIngredient = () => {
    setIsCollapsedIngredient(!isCollapsedIngredient);
  };

  const [isCollapsedInstruction, setIsCollapsedInstruction] = useState(true);

  const toggleCollapsibleInstruction = () => {
    setIsCollapsedInstruction(!isCollapsedInstruction);
  };
  return (
    <View>
      <View
        className="w-full duration-500 bg-white rounded-[5] mt-3 px-4 py-2 items-center "
        style={styles.cardContainer}
      >
        <View className="flex-row w-full justify-between items-center">
          <Text className="text-l font-bold">Ingredient</Text>
          <TouchableOpacity onPress={toggleCollapsibleIngredient}>
            <ChevronRightIcon
              size={20}
              color="#000000"
              style={{
                transform: isCollapsedIngredient ? [] : [{ rotate: "90deg" }],
              }}
            />
          </TouchableOpacity>
        </View>

        {!isCollapsedIngredient && (
          <View className="pt-1 flex w-full">
            <View className="self-end">
              <TouchableOpacity
                onPress={createShoppingList}
                className="mt-1 items-center justify-center h-6 ml-1 w-32 bg-C87C17C rounded-lg"
              >
                <Text className="font-bold text-white text-xs">
                  Add to Shopping list
                </Text>
              </TouchableOpacity>
            </View>
            {/* Inner content of the collapsible section */}
            {recipeIngredients.length > 0 ? (
              recipeIngredients.map((recipeIngredient) => (
                <RecipeIngredientRow
                  key={recipeIngredient._id} // Use a unique identifier from your data here
                  recipeIngredientID={recipeIngredient._id}
                  IngredientId={recipeIngredient.RecipeIngredientId}
                />
              ))
            ) : (
              <Text className="ml-2">No ingredients found.</Text>
            )}
          </View>
        )}
      </View>
      <View
        className="w-full duration-500 bg-white rounded-[5] mt-3 px-4 py-2 items-center "
        style={styles.cardContainer}
      >
        <View className="flex-row w-full justify-between items-center">
          <Text className="text-l font-bold">Instruction</Text>
          <TouchableOpacity onPress={toggleCollapsibleInstruction}>
            <ChevronRightIcon
              size={20}
              color="#000000"
              style={{
                transform: isCollapsedInstruction ? [] : [{ rotate: "90deg" }],
              }}
            />
          </TouchableOpacity>
        </View>

        {!isCollapsedInstruction && (
          <View className="pt-1 flex w-full">
            {instructions.length > 0 ? (
              instructions.map((instruction, index) => (
                <InstructionRow
                  key={instruction._id} // Use a unique identifier from your data here
                  InstructionID={instruction._id}
                  Description={instruction.Description}
                />
              ))
            ) : (
              <Text className="ml-2">No instructions found.</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default RecipeToggle;

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
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

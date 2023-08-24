import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios"; // Import axios for making API requests
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import { useNavigation } from "@react-navigation/native";

const AddIngredient = ({ route }) => {
  const navigation = useNavigation();

  const { recipeId } = route.params;
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const handleAddIngredient = () => {
    if (name.trim() === "" || quantity.trim() === "" || unit.trim() === "") {
      Alert.alert("Empty Field", "Please enter all the ingredient details.");
      return;
    }

    const newIngredient = {
      RecipeID: recipeId,
      Name: name,
      Quantity: quantity,
      Unit: unit,
    };

    axios
      .post(`http://${IP_ADDRESS}:8000/api/ingredients`, newIngredient)
      .then((response) => {
        console.log("API Response:", response);
        Alert.alert("Ingredient Added", "New ingredient added successfully");
        setName(""); // Clear name input
        setQuantity(""); // Clear quantity input
        setUnit(""); // Clear unit input
      })
      .catch((error) => {
        if (error.response) {
          console.log("Adding Ingredient Failed:", error.response.data);
        } else if (error.message) {
          console.log("Adding Ingredient Failed:", error.message);
        } else {
          console.log("Adding Ingredient Failed:", error);
        }

        Alert.alert(
          "Adding Ingredient Error",
          "An error occurred while adding the ingredient"
        );
      });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Add New Ingredient
      </Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter ingredient name"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TextInput
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        placeholder="Enter ingredient quantity"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TextInput
        value={unit}
        onChangeText={(text) => setUnit(text)}
        placeholder="Enter ingredient unit"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
      />
      <TouchableOpacity
        onPress={handleAddIngredient}
        style={{
          backgroundColor: "#007AFF",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Add Ingredient
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack(); // Go back to the previous page
        }}
        style={{
          backgroundColor: "#007AFF",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddIngredient;

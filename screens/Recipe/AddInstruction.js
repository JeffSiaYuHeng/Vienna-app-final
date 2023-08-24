import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios"; // Import axios for making API requests
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import { useNavigation } from "@react-navigation/native";

const AddInstruction = ({ route }) => {
  const navigation = useNavigation();

  const { recipeId } = route.params;
  const [description, setDescription] = useState("");
  const handleAddInstruction = () => {
    if (description.trim() === "") {
      Alert.alert("Empty Field", "Please enter the instruction description.");
      return;
    }

    const newInstruction = {
      RecipeID: recipeId,
      Description: description,
    };

    axios
      .post(`http://${IP_ADDRESS}:8000/api/instructions`, newInstruction)
      .then((response) => {
        console.log("API Response:", response);
        Alert.alert("Instruction Added", "New instruction added successfully");
        setDescription(""); // Clear description input
      })
      .catch((error) => {
        if (error.response) {
          console.log("Adding Instruction Failed:", error.response.data);
        } else if (error.message) {
          console.log("Adding Instruction Failed:", error.message);
        } else {
          console.log("Adding Instruction Failed:", error);
        }

        Alert.alert(
          "Adding Instruction Error",
          "An error occurred while adding the instruction"
        );
      });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Add New Instruction
      </Text>
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Enter instruction description"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity
        onPress={handleAddInstruction}
        style={{
          backgroundColor: "#007AFF",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Add Instruction
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

export default AddInstruction;

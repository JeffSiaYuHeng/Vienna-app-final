import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios"; // Import axios for making API requests
import IP_ADDRESS from "../config"; // Adjust the path as needed
import { XMarkIcon } from "react-native-heroicons/solid";

const AddInstructionComponents = ({ onClose, recipeId }) => {
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
      .post(`http://${IP_ADDRESS}:8000/api/instructions/create`, newInstruction)
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
    <View className="absolute top-[150] w-screen h-screen items-center ">
      <View
        className="w-[300px] rounded-xl bg-white p-4 pt-0 gap-y-4"
        style={styles.cardContainer}
      >
        <TouchableOpacity
          onPress={onClose}
          className="w-full justify-end flex-row"
        >
          <XMarkIcon size={18} color="#000000" />
        </TouchableOpacity>
        <View>
          <Text className="font-semibold text-xl">Add Instruction</Text>
          <Text className="text-sm text-gray-600">
            Insert the required information
          </Text>
        </View>
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Enter instruction description"
          multiline
          numberOfLines={4} // You can adjust the number of visible lines
          className="w-100 bg-white border-solid border-gray-600 border-[1px] h-[90] items-center justify-center rounded-[5px] pl-2"
        />
        <TouchableOpacity
          onPress={handleAddInstruction}
          className=" w-full  bg-C87C17C h-10 items-center justify-center rounded-[5px]"
        >
          <Text className="text-white font-bold text-base">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

export default AddInstructionComponents;

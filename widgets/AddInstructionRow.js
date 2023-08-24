import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { TrashIcon } from "react-native-heroicons/solid";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import axios from "axios";

export default function AddInstructionRow({
  InstructionID,
  Description,
  onDelete,
}) {
  const handleDeleteInstruction = async () => {
    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:8000/api/instructions/delete/${InstructionID}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data.message);
      onDelete();
      // Add any additional logic or UI updates after successful deletion
    } catch (error) {
      console.log("Error deleting instruction", error);
      console.log(error.message);
    }
  };

  return (
    <View
      className="flex-row items-center justify-between w-full bg-gray-100 px-2 my-2 rounded-xl py-2"
      style={styles.cardContainer}
    >
      <View className="flex-row items-cent er gap-1 w-10/12">
        <Text>{Description}</Text>
      </View>
      <TouchableOpacity>
        <TrashIcon size={20} color="#000" onPress={handleDeleteInstruction} />
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

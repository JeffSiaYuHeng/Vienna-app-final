import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { TrashIcon } from "react-native-heroicons/solid";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import axios from "axios";

export default function IngredientRow({ IngredientID, IngredientName }) {
  return (
    <View
      className="flex-row items-center justify-between w-full bg-gray-100 px-2 my-2 rounded-xl py-2"
      style={styles.cardContainer}
    >
      <View className="flex-row items-center gap-1 w-10/12">
        <Text>{IngredientName}</Text>
      </View>
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

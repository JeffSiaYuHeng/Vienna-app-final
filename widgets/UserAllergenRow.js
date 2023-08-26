import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TrashIcon } from "react-native-heroicons/solid";
import IP_ADDRESS from "../config"; // Adjust the path as needed
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
export default function UserAllergenRow({
  // Rename the component
  _id,
  AllergenID, // Change the property name
  onDelete,
}) {
  console.log(AllergenID);
  const [allergen, setAllergen] = useState([]); // Change the state variable

  const fetchAllergenById = async () => {
    // Change the function name
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/allergen/${AllergenID}` // Change the API endpoint
      );
      setAllergen(response.data.allergen); // Change the state variable
    } catch (error) {
      console.error("Error fetching Allergen by ID", error);
      throw error;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAllergenById();
    }, [])
  );

  const handleDeleteUserAllergen = async () => {
    // Change the function name
    try {
      await axios.delete(
        `http://${IP_ADDRESS}:8000/api/userAllergen/delete/${_id}` // Change the API endpoint
      );
      // After deleting, call the onDelete function provided by the parent component
      onDelete();
    } catch (error) {
      console.error("Error deleting user allergen", error);
    }
  };

  return (
    <View
      className="flex-row items-center justify-between w-full bg-gray-100 px-2 my-2 rounded-xl py-2"
      style={styles.cardContainer}
    >
      <View className="flex-row items-center gap-1 w-10/12">
        <Text>{allergen.Name}</Text>
      </View>
      <TouchableOpacity>
        <TrashIcon
          size={20}
          color="#000"
          onPress={handleDeleteUserAllergen} // Change the function name
        />
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

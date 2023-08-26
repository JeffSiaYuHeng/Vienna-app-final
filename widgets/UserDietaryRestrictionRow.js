import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TrashIcon } from "react-native-heroicons/solid";
import IP_ADDRESS from "../config"; // Adjust the path as needed
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
export default function UserDietaryRestrictionRow({
  _id,
  DietaryRestrictionID,
  onDelete,
}) {
  const [dietaryRestriction, setDietaryRestriction] = useState([]);

  const fetchDietaryRestrictionById = async () => {
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/dietaryRestrictions/${DietaryRestrictionID}`
      );
      setDietaryRestriction(response.data.dietaryRestriction);
    } catch (error) {
      console.error("Error fetching Dietary Restriction by ID", error);
      throw error;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchDietaryRestrictionById();
    }, [])
  );

  const handleDeleteUserDietaryRestriction = async () => {
    try {
      await axios.delete(
        `http://${IP_ADDRESS}:8000/api/userDietaryRestriction/delete/${_id}`
      );
      // After deleting, call the onDelete function provided by the parent component
      onDelete();
    } catch (error) {
      console.error("Error deleting user dietary restriction", error);
    }
  };

  return (
    <View
      className="flex-row items-center justify-between w-full bg-gray-100 px-2 my-2 rounded-xl py-2"
      style={styles.cardContainer}
    >
      <View className="flex-row items-center gap-1 w-10/12">
        <Text>{dietaryRestriction.Name}</Text>
      </View>
      <TouchableOpacity>
        <TrashIcon
          size={20}
          color="#000"
          onPress={handleDeleteUserDietaryRestriction}
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

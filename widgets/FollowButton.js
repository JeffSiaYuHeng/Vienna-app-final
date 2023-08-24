import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  HeartIcon,
  MinusCircleIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode"; // Assuming you have jwt-decode installed
import IP_ADDRESS from "../config"; // Adjust the path as needed
import axios from "axios"; // Assuming you have axios installed

export default function FollowButton({ creatorId }) {
  const followedId = creatorId;
  const [userFollow, setUserFollow] = useState(null); // Initialize with null or default value

  useEffect(() => {
    const fetchUserFollow = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;

        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/userFollow?userId=${userId}&followedId=${followedId}`
        );

        if (response.data) {
          setUserFollow(response.data);
        }
      } catch (error) {
        console.log("Error fetching recipe like", error);
      }
    };

    fetchUserFollow();
  }, []);

  const handleCreateUserFollow = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      const newUserFollow = { userId, followedId };

      const response = await axios.post(
        `http://${IP_ADDRESS}:8000/api/userFollow/create`,
        newUserFollow
      );

      console.log(response.data); // Log the successful response data

      setUserFollow(true);
    } catch (error) {
      console.error("User Follow Error", error); // Log the error

      Alert.alert(
        "User Follow Error",
        "An error occurred while Following the User"
      );
    }
  };

  const handleDeleteUserFollow = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      const response = await axios.delete(
        `http://${IP_ADDRESS}:8000/api/userFollow/delete/${userId}/${followedId}`
      );

      console.log(response.data); // Log the successful response data

      setUserFollow(null);

      // Update your state or perform other actions after successful deletion
    } catch (error) {
      console.error("User Unfollow Error", error); // Log the error

      Alert.alert(
        "User Unfollow Error",
        "An error occurred while unfollowing the user"
      );
    }
  };

  return (
    <View className="w-20">
      {userFollow ? (
        <TouchableOpacity
          onPress={handleDeleteUserFollow}
          className="mt-1 items-center justify-center px-3 h-6 ml-1 bg-gray-500 rounded-lg"
        >
          <Text className="font-bold text-white text-xs">Unfollow</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleCreateUserFollow}
          className="mt-1 items-center justify-center px-3 h-6 ml-1 bg-C87C17C rounded-lg"
        >
          <Text className="font-bold text-white text-xs">Follow</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

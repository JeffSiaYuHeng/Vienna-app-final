import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { TrashIcon } from "react-native-heroicons/solid";
import { StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../config"; // Adjust the path as needed

export default function NotificationRow({ senderId, type, createdAt }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/users/user/${senderId}`
        );

        const user = response.data;
        setUserProfile(user);
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.log("Error fetching user profile", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchUserProfile();
  }, [senderId]); // Include senderId in the dependencies array

  let messageText = "";

  // Conditionally render messageText only if userProfile is loaded
  if (!loading) {
    if (type === "follow") {
      messageText = `${userProfile.username} Start following you`;
    } else if (type === "like") {
      messageText = `${userProfile.username} Like your Recipe`;
    }
  }

  // Calculate the time difference in minutes
  const currentTime = new Date().getTime();
  const notificationTime = new Date(createdAt).getTime();
  const timeDifferenceInMinutes =
    (currentTime - notificationTime) / (60 * 1000);

  // Format the time elapsed based on the time difference
  let timeElapsedText = "";

  if (timeDifferenceInMinutes >= 1440) {
    // More than a day
    const days = Math.floor(timeDifferenceInMinutes / 1440);
    timeElapsedText = `${days}d`;
  } else if (timeDifferenceInMinutes >= 60) {
    // More than an hour
    const hours = Math.floor(timeDifferenceInMinutes / 60);
    timeElapsedText = `${hours}h`;
  } else {
    // Less than an hour
    timeElapsedText = `${Math.floor(timeDifferenceInMinutes)}m`;
  }

  return (
    <View
      className="w-100 h-fit rounded-xl bg-white p-2 px-4 flex-row items-center justify-between pr-4 mb-2"
      style={styles.cardContainer}
    >
      <View className=" flex-row items-center gap-x-2">
        <Text>{messageText}</Text>
        <Text className="text-gray-500 text-xs">{timeElapsedText}</Text>
        {/* the time after the notification are created */}
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

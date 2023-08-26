import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../config";
import axios from "axios";

export default function FollowButton({ creatorId }) {
  const followedId = creatorId;
  const [userFollow, setUserFollow] = useState(null);

  useEffect(() => {
    const fetchUserFollow = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        const [userProfile, setUserProfile] = useState(null);

        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/userFollow?userId=${userId}&followedId=${followedId}`
        );

        if (response.data) {
          setUserFollow(response.data);
        }
      } catch (error) {
        console.log("Error fetching user follow", error);
      }
    };

    fetchUserFollow();

    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/users/user/${userId}`
        );

        const user = response.data;
        setUserProfile(user);
        setLoading(false);

        // Check if the user's initialStatus is "Inactive"
        if (user.initialStatus === "Inactive") {
          // Navigate to the "InitializeProfile" screen
          navigation.navigate("InitialUserProfile");
        }
      } catch (error) {
        console.log("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
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

      // 创建通知
      const notificationResponse = await axios.post(
        `http://${IP_ADDRESS}:8000/api/notifications`,
        {
          recipientId: followedId, // 接收通知的用户ID，被关注的用户
          senderId: userId, // 发送通知的用户ID，关注者的用户ID
          type: "follow", // 通知类型，可以根据需要调整
          message: `${userProfile.username} have a new follower`, // 通知消息内容
        }
      );

      console.log("User Followed successfully", response.data);
      console.log("Notification created successfully", notificationResponse.data);

      setUserFollow(true);
    } catch (error) {
      console.error("User Follow Error", error);
      Alert.alert("User Follow Error", "Error occur while follow the user");
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

      console.log("User Un followed successfully", response.data);

      setUserFollow(null);
    } catch (error) {
      console.error("User Un follow Error", error);
      Alert.alert("User Un follow Error", "Error occur while Un following the user");
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

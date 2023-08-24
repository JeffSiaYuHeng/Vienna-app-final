import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { StarIcon, TrashIcon } from "react-native-heroicons/solid";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../config"; // Adjust the path as needed

const RatingIcon = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <StarIcon
          key={i}
          style={{ marginRight: 2 }}
          color="#87C17C"
          size={13}
        />
      );
    }
    return stars;
  };

  return <View className="flex-row">{renderStars()}</View>;
};

export default function ReviewRow({ ReviewId, ReviewerID, Comment, Rates }) {
  const [reviewerProfile, setReviewerProfile] = useState(null);
  const [userId, setUserId] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchReviewerProfile = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/user/${ReviewerID}`
          );
          setReviewerProfile(response.data);
          setLoading(false);
        } catch (error) {
          console.log("Error fetching user profile", error);
        }
      };

      fetchReviewerProfile();
    }, [])
  );

  const handleDelete = async () => {
    try {
      // Send a DELETE request to the server to delete the comment
      await axios.delete(
        `http://${IP_ADDRESS}:8000/api/recipeReviews/delete/${ReviewId}`
      );
      // Show a success message
      Alert.alert("Success", "Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
      Alert.alert("Error", "Error deleting the comment");
    }
  };

  if (loading) {
    return (
      <View className="items-center justify-center w-100 h-4/5">
        <ActivityIndicator size="large" color="#7caf75" />
      </View>
    );
  }

  const imageUrl = reviewerProfile.UserImage;
  const cleanedImageUrl = imageUrl ? imageUrl.replace(/\\/g, "/") : ""; // Replace backslashes with forward slashes
  const filename = cleanedImageUrl ? cleanedImageUrl.split("/").pop() : ""; // Add a conditional check
  const source = {
    uri: `http://${IP_ADDRESS}:8000/api/files/${filename}`,
  };
  const username = reviewerProfile.username;

  if (!imageUrl) {
    imageSource = require("../assets/UserIcon/User_1.png");
  } else {
    imageSource = source;
  }

  return (
    <View
      style={styles.cardContainer}
      className="w-full bg-gray-100 rounded-[5px] p-4 mb-2"
    >
      <View className="flex-row justify-between">
        <View className="flex-row">
          <Image source={imageSource} className="w-9 h-9 rounded-full" />
          <View className="ml-2 ">
            <Text>{username}</Text>
            <View className="mt-[0.5]">
              <RatingIcon rating={Rates} />
            </View>
          </View>
        </View>
        {userId === ReviewerID ? (
          <TouchableOpacity onPress={handleDelete} className="mr-1">
            <TrashIcon color="#C74646" size={22} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={styles.cardContainer}
        className="w-full bg-white p-3 mt-1 rounded-[5px]"
      >
        <Text>{Comment} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    borderRadius: 10,
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

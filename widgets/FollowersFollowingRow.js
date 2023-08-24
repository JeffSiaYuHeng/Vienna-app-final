import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import FollowButton from "../widgets/FollowButton";
import { FlatList } from "react-native";
import { Image } from "react-native";
export default function FollowersFollowingRow({ UserId }) {
  const navigation = useNavigation();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/user/${UserId}`
        );
        setUserProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <View className="w-100 h-screen items-center justify-center">
        <ActivityIndicator size="large" color="#7caf75" />
      </View>
    );
  }
  const creatorId = userProfile.userId;
  const username = userProfile.username;
  const imageUrl = userProfile.UserImage;
  const cleanedImageUrl = imageUrl ? imageUrl.replace(/\\/g, "/") : "";
  const filename = cleanedImageUrl ? cleanedImageUrl.split("/").pop() : "";
  const source = { uri: `http://${IP_ADDRESS}:8000/api/files/${filename}` };

  if (!imageUrl) {
    imageSource = require("../assets/UserIcon/User_1.png");
  } else {
    imageSource = source;
  }
  return (
    <View
      className="w-full h-12 bg-white rounded-[5] mt-3 px-4 flex-row items-center "
      style={styles.cardContainer}
    >
      <View className="w-full flex-row items-center justify-between">
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate("OthersProfile", { creatorId })}
          >
            <Image source={imageSource} className="w-9 h-9 rounded-full" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2 ml-1">
            <Text className="font-medium">{username}</Text>
            {/* <Text className="text-xxs pt-1 text-gray-600">
                      2.5k Followers
                    </Text> */}
          </View>
        </View>
        <FollowButton creatorId={creatorId} />
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

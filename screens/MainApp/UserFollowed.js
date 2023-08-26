import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import FollowButton from "../../widgets/FollowButton";
import FollowersFollowingRow from "../../widgets/FollowersFollowingRow";
import { FlatList } from "react-native";

export default function UserFollowed() {
  const {
    params: { userId },
  } = useRoute();

  const fetchedUserId = userId;

  const navigation = useNavigation();
  const [followeds, setFollowed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowed = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/userFollow/followed?userId=${fetchedUserId}`
        );

        if (response.data) {
          setFollowed(response.data);
        }

        setLoading(false);
      } catch (error) {
        console.log("Error fetching followed", error);
        setLoading(false);
      }
    };

    fetchFollowed();
  }, []);

  if (loading) {
    return (
      <View>
        <LinearGradient
          colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
          start={[0, 0]} // Starting point (optional, default is [0,0])
          end={[1, 0]} // Ending point (optional, default is [1,0])
          className="flex p-4 pt-10 justify-center flex-row w-full h-[80]  items-center"
        >
          <Text className="text-lg font-bold text-white">Following</Text>
        </LinearGradient>
        <View className="w-100 h-screen items-center justify-center">
          <ActivityIndicator size="large" color="#7caf75" />
        </View>
      </View>
    );
  }
  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-center flex-row w-full h-[80]  items-center"
      >
        <Text className="text-lg font-bold text-white">Following</Text>
      </LinearGradient>

      <ScrollView
        className="p-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
          marginBottom: 30,
        }}
      >
        {followeds.length > 0 ? (
          followeds.map((followed) => (
            <FollowersFollowingRow
              key={followed._id} // Use a unique identifier from your data here
              UserId={followed.FollowedUserID}
            />
          ))
        ) : (
          <Text className="ml-2">No followed found.</Text>
        )}
      </ScrollView>
    </View>
  );
}

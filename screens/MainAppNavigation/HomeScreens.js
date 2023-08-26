import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatureComponent from "../../components/FeatureComponent";
import TrendingComponent from "../../components/TrendingComponent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, Image } from "react-native";
import { View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { BellIcon } from "react-native-heroicons/solid";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../../config"; // Adjust the path as needed

export default function HomeScreens() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]); // State to store notifications

  useFocusEffect(
    React.useCallback(() => {
      const fetchNotifications = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
          // Replace with your API endpoint to fetch notifications
          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/api/notifications/notifications/${userId}`
          );

          if (response.data) {
            setNotifications(response.data); // Update state with fetched notifications
          }
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };
      fetchNotifications();
    }, [navigation])
  );

  // Assuming you have notifications state and it's an array of objects with an "isRead" property

  // Calculate the total number of unread notifications
  const totalUnreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const NotificationGate = () => {
    navigation.navigate("Notification");
  };

  const SearchRecipeByNameGate = () => {
    navigation.navigate("SearchRecipeByName");
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="fixed  flex p-3 justify-between flex-row w-full h-[60]  items-center"
      >
        <TouchableOpacity
          onPress={SearchRecipeByNameGate}
          className="bg-CC5ECBE  rounded-[10px] p-2 flex-row items-center justify-between"
        >
          <MagnifyingGlassIcon size={20} color="#2B5708" />
        </TouchableOpacity>
        <View>
          <Text className="text-white font-bold text-lg">Vienna | Home</Text>
        </View>
        <TouchableOpacity onPress={NotificationGate}>
          <View className=" absolute mt-[-5px] z-20 w-4 h-4 items-center justify-center rounded-full bg-red-400 ">
            <Text className="text-xs font-bold text-white">
              {totalUnreadNotifications}
            </Text>
          </View>
          <BellIcon size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView>
        {/* Header */}

        {/* Category */}
        <FeatureComponent />
        {/* Trending Section */}
        <TrendingComponent />
      </ScrollView>
    </SafeAreaView>
  );
}

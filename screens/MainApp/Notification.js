import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TrashIcon, XMarkIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import NotificationRow from "../../widgets/NotificationRow";

const Notification = () => {
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState([]); // State to store notifications

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  }, []);

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
        const fetchedNotifications = response.data;
        setNotifications(fetchedNotifications);
        // Get the IDs of notifications to mark as read
        const notificationIdsToMarkAsRead = fetchedNotifications
          .filter((notification) => !notification.isRead)
          .map((notification) => notification._id);

        if (notificationIdsToMarkAsRead.length > 0) {
          // Send a request to mark the notifications as read on the server
          await axios.post(
            `http://${IP_ADDRESS}:8000/api/notifications/markAsRead`,
            { notificationIds: notificationIdsToMarkAsRead }
          );

          // Update the fetched notifications to mark them as read
          const updatedNotifications = fetchedNotifications.map(
            (notification) => ({
              ...notification,
              isRead: true,
            })
          );

          // Update state with fetched notifications
        }
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const HomepageGate = () => {
    navigation.navigate("TabNavigator");
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-between flex-row w-full h-[80]  items-center"
      >
        <View></View>
        <Text className="text-lg font-bold text-white">{"Notification"}</Text>
        <TouchableOpacity onPress={HomepageGate}>
          <XMarkIcon size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>
      <View className="w-100 p-2 pt-4 ">
        {/* Likes */}
        {notifications.length === 0 ? ( // Check if there are no notifications
          <Text>No Notification found</Text>
        ) : (
          // If there are notifications, map through and render them
          notifications.map((notification) => (
            <NotificationRow
              key={notification._id}
              senderId={notification.senderId}
              type={notification.type}
              createdAt={notification.createdAt}
            />
          ))
        )}
      </View>
    </SafeAreaView>
  );
};

export default Notification;

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

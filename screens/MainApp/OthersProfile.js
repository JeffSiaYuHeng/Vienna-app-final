import React, { useEffect, useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Cog6ToothIcon } from "react-native-heroicons/outline";
import { PencilSquareIcon, XMarkIcon } from "react-native-heroicons/solid";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../../config"; // Adjust the path as needed

export default function OthersProfile({ route }) {
  const {
    params: { CreatorID },
  } = useRoute();

  const othersId = CreatorID;

  const navigation = useNavigation();

  const [othersProfile, setOthersProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/user/${othersId}`
        );
        setOthersProfile(response.data);
      } catch (error) {
        console.log("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, [othersId]);

  const imageUrl = othersProfile.UserImage;
  const email = othersProfile.email;
  const firstName = othersProfile.firstName;
  const lastName = othersProfile.lastName;
  const username = othersProfile.username;

  const cleanedImageUrl = imageUrl ? imageUrl.replace(/\\/g, "/") : ""; // Replace backslashes with forward slashes
  const filename = cleanedImageUrl ? cleanedImageUrl.split("/").pop() : ""; // Add a conditional check
  const source = { uri: `http://${IP_ADDRESS}:8000/api/files/${filename}` };

  if (!imageUrl) {
    imageSource = require("../../assets/UserIcon/User_1.png");
  } else {
    imageSource = source;
  }

  return (
    <SafeAreaView className="flex-1 bg-CF4FFF5 ">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-between flex-row w-full h-[80]  items-center"
      >
        <View></View>
        <Text className="text-lg font-bold text-white">{username}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <XMarkIcon size={20} color="#000" />
        </TouchableOpacity>
      </LinearGradient>

      <View className="w-100 p-2 pt-4 ">
        <View
          className="w-100 h-56 rounded-xl bg-white items-center pt-4"
          style={styles.cardContainer}
        >
          <View>
            <Image
              source={imageSource}
              className="w-20 h-20 rounded-full self-center"
            />
            <Text className="pt-2 text-center">{username}</Text>
            <Text className="pt-2 text-center">{email}</Text>
          </View>

          <View className="flex-row w-full h-20 p-3 pt-6 justify-around">
            {/* <View className="w-20 h-18 justify-center  text-center items-center">
              <Text className="text-gray-600 font-bold">Followers</Text>
              <Text>23</Text>
            </View>
            <View className="w-20 h-18 justify-center  text-center items-center">
              <Text className="text-gray-600 font-bold">Followers</Text>
              <Text>23</Text>
            </View> */}
            <TouchableOpacity
              onPress={() => navigation.navigate("UserLikedRecipe")}
              className="border-l-[1px] border-r-[1px] border-gray-200 w-20 h-18 justify-center  text-center items-center"
            >
              <Text className="text-gray-600 font-bold">Likes</Text>
              {/* <Text>{!LikeCount ? "0":LikeCount}</Text> */}
              <Text>0</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
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

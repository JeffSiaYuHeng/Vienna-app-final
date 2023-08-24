import React, { useEffect, useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Cog6ToothIcon } from "react-native-heroicons/outline";
import { PencilSquareIcon, CameraIcon } from "react-native-heroicons/solid";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function InitialUserProfile() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [userImage, setUserImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/user/${userId}`
        );
        setUserProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7caf75" />
      </View>
    );
  }

  const userId = userProfile.userId;

  const handleUpdateProfile = () => {
    // Check if any of the fields are empty
    if (firstName === "" || lastName === "") {
      Alert.alert("Empty Fields", "Please fill in all required fields.");
      return;
    }

    if (!/[a-zA-Z]/.test(firstName)) {
      Alert.alert(
        "Invalid First Name",
        "First name must include at least one letter."
      );
      return;
    }

    if (!/[a-zA-Z]/.test(lastName)) {
      Alert.alert(
        "Invalid Last Name",
        "Last name must include at least one letter."
      );
      return;
    }

    const updatedProfileData = new FormData(); // Create a new FormData object
    // Append userImage to FormData only if it's not empty
    if (userImage) {
      updatedProfileData.append("image", {
        uri: userImage,
        type: "image/jpeg",
        name: "profile.jpg", // Adjust the file name as needed
      });
    }

    updatedProfileData.append("firstName", firstName);
    updatedProfileData.append("lastName", lastName);

    axios
      .put(
        `http://${IP_ADDRESS}:8000/updateProfile/${userId}`,
        updatedProfileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("API Response:", response); // Log the API response
        Alert.alert(
          "Profile Updated",
          "Your profile has been updated successfully"
        );
        navigation.navigate("InitializeDietaryRestriction");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Update Failed:", error.response.data);
        } else if (error.message) {
          console.log("Update Failed:", error.message);
        } else {
          console.log("Update Failed:", error);
        }

        Alert.alert(
          "Update Error",
          "An error occurred while updating the profile"
        );
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Use "canceled" instead of "cancelled"
      setUserImage(result.assets[0].uri); // Access the uri from the "assets" array
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-CF4FFF5 ">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-center flex-row  w-full h-[90]  items-center"
      >
        <View className="items-center justify-center">
          <Text className="text-xs font-bold text-C2B5708">
            Initialize for New User
          </Text>
          <Text className="text-lg font-bold text-white">Set Profile</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("InitializeDietaryRestriction")}
          className=" absolute right-6 top-12"
        >
          <Text className=" text-base font-bold text-C2B5708">Skip</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View className="w-100 h-screen p-2 pt-4 ">
        <View
          className="w-100 rounded-xl bg-white items-center py-4 px-[20]"
          style={styles.cardContainer}
        >
          <TouchableOpacity
            onPress={pickImage}
            className="w-[100] h-[100] bg-gray-300 justify-center items-center rounded-full"
          >
            <View className="w-[100] h-[100] bg-gray-300 justify-center items-center rounded-full">
              {userImage ? (
                <Image
                  source={{ uri: userImage }}
                  className="w-[100] h-[100] bg-gray-300 justify-center items-center rounded-full"
                />
              ) : (
                <CameraIcon size={25} color="#FFFFFF" />
              )}
            </View>
          </TouchableOpacity>

          <View className="w-full gap-y-3">
            <View className="w-full">
              <Text className=" text-gray-500 mb-1">FirstName:</Text>
              <TextInput
                value={firstName}
                className="w-full border-[1px] h-10 border-gray-500 rounded-[5px] pl-2"
                placeholder="First Name"
                onChangeText={(text) => setFirstName(text)}
              />
            </View>
            <View className="w-full">
              <Text className=" text-gray-500 mb-1">Last Name:</Text>
              <TextInput
                value={lastName}
                className="w-full border-[1px] h-10 border-gray-500 rounded-[5px] pl-2"
                placeholder="Last Name"
                onChangeText={(text) => setLastName(text)}
              />
            </View>
            <TouchableOpacity
              onPress={handleUpdateProfile}
              className="w-full  bg-C87C17C h-10 items-center justify-center rounded-[5px]"
            >
              <Text className="text-white font-bold text-base">Update</Text>
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

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Import axios for making API requests
// import IP_ADDRESS from "../config"; // Adjust the path as needed
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState(""); // New state for confirmed password

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authToken");

  //       if (token) {
  //         navigation.replace("Tabs");
  //       } else {
  //         // token not found , show the login screen itself
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  // const isValidEmail = (email) => {
  //   // Regular expression for email validation
  //   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  //   return emailRegex.test(email);
  // };

  const handleRegister = () => {
    //User Input Detail validation
    if (isEmptyFields(username, email, password, confirmedPassword)) {
      Alert.alert("Empty Fields", "Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (password !== confirmedPassword) {
      Alert.alert(
        "Password Mismatch",
        "Password and Confirm Password do not match."
      );
      return;
    }

    if (!hasNumber(password)) {
      Alert.alert(
        "Weak Password",
        "Password must contain at least one number."
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Password Too Short",
        "Password must be at least 8 characters long."
      );
      return;
    }

    if (!hasSpecialCharacter(password)) {
      Alert.alert(
        "Weak Password",
        "Password must contain at least one special character."
      );
      return;
    }

    if (!hasLetter(username)) {
      Alert.alert(
        "Invalid Username",
        "Username must include at least one letter."
      );
      return;
    }

    const user = {
      username: username,
      email: email,
      password: password,
    };

    axios
      .post(`http://${IP_ADDRESS}:8000/register`, user)
      .then((response) => {
        console.log("API Response:", response); // Log the API response
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmedPassword(""); // Clear confirmed password
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(
          "Registration Failed:",
          error.response?.data || error.message || error
        );
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
      });
  };

  const isEmptyFields = (...fields) => {
    return fields.some((field) => field.trim() === "");
  };

  const isValidEmail = (email) => {
    // Use a regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const hasNumber = (text) => {
    return /\d/.test(text);
  };

  const hasSpecialCharacter = (text) => {
    return /\W/.test(text);
  };

  const hasLetter = (text) => {
    return /[a-zA-Z]/.test(text);
  };

  return (
    <View className="w-full h-full items-center pb-10 pt-20">
      {/* Logo and Title */}
      <View className="items-center">
        <Image
          source={require("../../assets/Icon_with_Title.png")}
          className="w-[200] h-[60]"
        />
        <View className="w-[320] mt-6 pl-1">
          <Text className=" text-3xl font-bold ">Register</Text>
          <View className="flex-row gap-2 items-end">
            <Text className=" text-gray-400 text-sm">
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
              className="w-24 h-6 border-C87C17C border-2  justify-center items-center rounded-full"
            >
              <Text className="text-C87C17C text-xs">Login Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* UserInputArea */}
      <KeyboardAvoidingView className="items-start w-[320] pt-6 gap-2">
        <View className="w-full">
          <Text className=" text-gray-500 mb-1">Username:</Text>
          <TextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            className="w-full border-[1px] h-10 border-gray-500 rounded-[5px] pl-2"
          />
        </View>
        <View className="w-full">
          <Text className=" text-gray-500 mb-1">Email:</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            className="w-full border-[1px] h-10 border-gray-500 rounded-[5px] pl-2"
          />
        </View>
        <View className="w-full">
          <Text className=" text-gray-500 mb-1">Password:</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            className="w-full border-[1px] h-10 border-gray-500 rounded-[5px] pl-2"
          />
        </View>
        <View className="w-full">
          <Text className=" text-gray-500 mb-1">Confirm password:</Text>
          <TextInput
            value={confirmedPassword}
            onChangeText={(text) => setConfirmedPassword(text)}
            secureTextEntry={true}
            className="w-full border-[1px] h-10 border-gray-500 rounded-[5px] pl-2"
          />
        </View>
      </KeyboardAvoidingView>

      {/* Register Button */}
      <TouchableOpacity
        onPress={handleRegister}
        className="ml-2 mt-8 w-[320]  bg-C87C17C h-10 items-center justify-center rounded-[5px]"
      >
        <Text className="text-white font-bold">Register</Text>
      </TouchableOpacity>
    </View>
  );
}

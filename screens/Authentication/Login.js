import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IP_ADDRESS from "../../config";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("TabNavigator");
        } else {
          // token not found , show the login screen itself
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `http://${IP_ADDRESS}:8000/api/users/login`,
        user
      );
      console.log(response);

      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      Alert.alert("Login successful", "You have been Login Successfully");
      navigation.replace("TabNavigator");
    } catch (error) {
      if (error.response) {
        console.log("Login Error", error.response.data);
        Alert.alert("Login Error", "Invalid email or password");
      } else {
        console.log("Login Error", error.message);
        Alert.alert("Login Error", "An error occurred during login");
      }
    }
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
          <Text className=" text-3xl font-bold ">Log in</Text>
          <View className="flex-row gap-2 items-center">
            <Text className=" text-gray-400 text-sm">
              didn’t have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
              className="w-24 h-6 border-C87C17C border-2  justify-center items-center rounded-full"
            >
              <Text className="text-C87C17C text-xs">Register Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* UserInputArea */}
      <View className="items-start w-[320] pt-6 gap-2">
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
      </View>

      {/* Login Button */}
      <View className="items-start w-[320] pt-6 gap-2">
        <TouchableOpacity
          onPress={handleLogin}
          className="ml-2 w-[320]  bg-C87C17C h-10 items-center justify-center rounded-[5px]"
        >
          <Text className="text-white font-bold text-base">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[320] bg-white border-solid border-C186EE9 border-2 h-10 items-center justify-center rounded-[5px]">
          <View className="flex-row items-center gap-2">
            <Image
              source={require("../../assets/GoogleIcon.png")}
              className="w-5 h-5"
            />
            <Text className="text-C186EE9 font-bold text-base">
              Login with Google
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="ml-2 w-[320]  bg-C3B579D h-10 items-center justify-center rounded-[5px]">
          <View className="flex-row items-center gap-2">
            <Image
              source={require("../../assets/FBIcon.png")}
              className="w-5 h-5"
            />
            <Text className="text-white font-bold">Login with Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

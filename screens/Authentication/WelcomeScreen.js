import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="w-full h-full items-center pb-10 pt-28">
      <View className="items-center">
        <Image
          source={require("../../assets/Icon_with_Title.png")}
          className="w-[200] h-[60]"
        />
        <Text className="pt-4 text-gray-500 ">Let's get cooking together!</Text>
      </View>
      <Image
        source={require("../../assets/WelcomeImg.png")}
        className="w-[320] h-[320] mt-20"
      />

      <View className="pt-10 gap-4 h-30">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <LinearGradient
            colors={["#7CAF75", "#6DB29A"]} // Adjust the gradient colors as needed
            start={[0, 0]} // Starting point (optional, default is [0,0])
            end={[1, 0]} // Ending point (optional, default is [1,0])
            className="w-72 bg-red-200 h-10 items-center justify-center rounded-[5px]"
          >
            <Text className="text-white font-bold">Log in</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
          className="w-72 bg-white border-solid border-C87C17C border-2 h-10 items-center justify-center rounded-[5px]"
        >
          <Text className="text-C87C17C font-bold">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

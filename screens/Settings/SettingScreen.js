import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingScreen = () => {
  const handleLogout = async () => {
    try {
      // Clear the authentication token from storage
      await AsyncStorage.removeItem("authToken");

      // Redirect the user to the login screen (or any other screen)
      navigation.replace("WelcomeScreen"); // Replace with your desired screen
    } catch (error) {
      console.log("Error logging out", error);
    } 
  }

  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-CF4FFF5 ">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-between flex-row w-full h-[80]  items-center"
      >
        <View>{/* Hey im a block */}</View>
        <Text className="text-lg font-bold text-white">Setting</Text>
        <TouchableOpacity onPress={navigation.goBack}>
          <XMarkIcon size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      <View className="w-100 p-2 pt-4 ">
        <View
          className="w-100 rounded-xl bg-white items-center pt-4 pb-4 gap-y-2"
          style={styles.cardContainer}
        >
          <TouchableOpacity className="w-[320] bg-white border-solid border-gray-400 border-2 h-10 pl-4 justify-center rounded-[5px]">
            <Text className="text-gray-400 font-bold">Setting Items</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[320] bg-white border-solid border-gray-400 border-2 h-10 pl-4 justify-center rounded-[5px]">
            <Text className="text-gray-400 font-bold">Setting Items</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} className="w-[320] border-solid border-red-500 bg-red-500 border-2 h-10 pl-4 justify-center rounded-[5px]">
            <Text className="text-white font-bold">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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

export default SettingScreen;

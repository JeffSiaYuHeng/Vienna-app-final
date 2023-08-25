import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React from "react";
import { TrashIcon, XMarkIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const Notification = () => {
  const navigation = useNavigation();

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
        <View
          className="w-100 h-fit rounded-xl bg-white p-2 flex-row items-center justify-between pr-4 mb-2"
          style={styles.cardContainer}
        >
          {/* Follow */}
          <View className=" flex-row items-center gap-x-2">
            <View className="items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
              <Text>Icon</Text>
            </View>
            <Text>Jeff Starts follow you!</Text>
            <Text className="text-gray-500 text-xs">2h</Text>
          </View>
          <TrashIcon size={22} color="#000" />
        </View>
        {/* Follow */}
        {/* Likes */}
        <View
          className="w-100 h-fit rounded-xl bg-white p-2 flex-row items-center justify-between pr-4 mb-2"
          style={styles.cardContainer}
        >
          <View className=" flex-row items-center gap-x-2">
            <View className="items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
              <Text>Icon</Text>
            </View>
            <Text>Jeff Likes your Recipe!</Text>
            <Text className="text-gray-500 text-xs">2h</Text>
          </View>
          <TrashIcon size={22} color="#000" />
        </View>
        {/* Likes */}
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

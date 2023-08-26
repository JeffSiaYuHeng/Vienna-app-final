import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatureComponent from "../../components/FeatureComponent";
import TrendingComponent from "../../components/TrendingComponent";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Image } from "react-native";
import { View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { BellIcon } from "react-native-heroicons/solid";

export default function HomeScreens() {
  const navigation = useNavigation();

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
        <TouchableOpacity onPress={SearchRecipeByNameGate} className="bg-CC5ECBE  rounded-[10px] p-2 flex-row items-center justify-between">
          <MagnifyingGlassIcon size={20} color="#2B5708" />
        </TouchableOpacity>
        <View>
          <Text className="text-white font-bold text-lg">Vienna | Home</Text>
        </View>
        <TouchableOpacity onPress={NotificationGate}>
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

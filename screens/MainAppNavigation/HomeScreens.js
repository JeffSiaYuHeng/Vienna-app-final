import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryComponent from "../../components/CategoryComponent";
import TrendingComponent from "../../components/TrendingComponent";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TextInput } from "react-native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="fixed  flex p-3 justify-between flex-row w-full h-[60]  items-center"
      >
        <View className="bg-white w-60 h-9 rounded-[10px] px-4 flex-row items-center justify-between">
          <TextInput placeholder="Search for Recipe..." />
          <MagnifyingGlassIcon size={25} color="#B4B4B4" />
        </View>
        <TouchableOpacity onPress={NotificationGate}>
          <BellIcon size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      {}
      <ScrollView>
        {/* Header */}

        {/* Category */}
        <CategoryComponent />
        {/* Trending Section */}
        <TrendingComponent />
      </ScrollView>
    </SafeAreaView>
  );
}

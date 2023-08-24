import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreens from "../screens/MainAppNavigation/HomeScreens";
import SavedScreens from "../screens/MainAppNavigation/SavedScreens";
import RecipeScreens from "../screens/MainAppNavigation/RecipeScreens";
import ShoppingListScreens from "../screens/MainAppNavigation/ShoppingListScreens";
import ProfileScreens from "../screens/MainAppNavigation/ProfileScreens";
import React, { useEffect } from "react";
import {
  HomeIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  QueueListIcon,
} from "react-native-heroicons/solid";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          elevation: 0,
          backgroundColor: "#3B5038",
          height: 65,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: "#C5ECBE",
        tabBarInactiveTintColor: "#ffffff",
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View className="items-center justify-center">
              <HomeIcon color={color} size={size} />
              <Text style={{ color: color }} className="text-xxs">
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View className="items-center justify-center">
              <BookmarkIcon color={color} size={size} />
              <Text style={{ color: color }} className="text-xxs">
                Saved
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Recipe"
        component={RecipeScreens}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <View className="items-center justify-center bg-CC5ECBE w-14 h-14 rounded-full ">
              <DocumentTextIcon
                style={{
                  color: focused ? "#3B5038" : "#ffffff",
                }}
                size={size}
              />
              <Text
                style={{
                  color: focused ? "#3B5038" : "#ffffff",
                }}
                className="text-C3B5038 text-xxs"
              >
                Receipt
              </Text>
            </View>
          ),
          //style specify tab navigation bar
          tabBarStyle: {
            backgroundColor: "#3B5038",
            height: 65,
            paddingBottom: 5,
            position: "absolute",
            elevation: 0,
          },
        }}
      />
      <Tab.Screen
        name="Shopping List"
        component={ShoppingListScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View className="items-center justify-center">
              <QueueListIcon color={color} size={size} />
              <Text style={{ color: color }} className="text-xxs">
                Shopping List
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View className="items-center justify-center">
              <UserIcon color={color} size={size} />
              <Text style={{ color: color }} className="text-xxs">
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

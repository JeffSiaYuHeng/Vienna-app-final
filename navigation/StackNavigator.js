import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "../screens/Test";
import WelcomeScreen from "../screens/Authentication/WelcomeScreen";
import Login from "../screens/Authentication/Login";
import Register from "../screens/Authentication/Register";
import TabNavigator from "./TabNavigator";
import EditProfile from "../screens/UserProfileSetup/EditProfile";
import SettingScreen from "../screens/Settings/SettingScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      {/* <AddRecipe /> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Authorization */}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        {/* AuthorizationEND */}
        {/* User Profile Setup */}
        <Stack.Screen name="EditProfile" component={EditProfile} />
        {/* User Profile Setup END */}
        {/* MainAppNavigation */}
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        {/* MainAppNavigation END */}
        {/* Setting */}
        <Stack.Screen name="SettingScreen" component={SettingScreen} />

        {/* Setting END */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

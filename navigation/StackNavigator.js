import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "../screens/Test";
import WelcomeScreen from "../screens/Authentication/WelcomeScreen";
import Login from "../screens/Authentication/Login";
import Register from "../screens/Authentication/Register";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      {/* <AddRecipe /> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Test" component={Test} /> */}
        {/* WelcomeScreen & Initialize */}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

        {/* WelcomeScreen & Initialize */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Authorization
import WelcomeScreen from "../screens/Authentication/WelcomeScreen";
import Login from "../screens/Authentication/Login";
import Register from "../screens/Authentication/Register";

//MainApp
import Notification from "../screens/MainApp/Notification";
import OthersProfile from "../screens/MainApp/OthersProfile";
import UserFollowed from "../screens/MainApp/UserFollowed";
import UserFollowers from "../screens/MainApp/UserFollowers";
import UserLikedRecipe from "../screens/MainApp/UserLikedRecipe";
import SearchByIngredient from "../screens/MainApp/SearchByIngredient";
import SearchRecipeByName from "../screens/MainApp/SearchRecipeByName";

// /MainAppNavigation
import TabNavigator from "./TabNavigator";
// Recipe
import AddRecipe from "../screens/Recipe/AddRecipe";
import EditRecipe from "../screens/Recipe/EditRecipe";
import RecipeTabs from "../screens/Recipe/RecipeTabs";
import InstructionIngredient from "../screens/Recipe/InstructionIngredient";
import MyRecipeTabs from "../screens/Recipe/MyRecipeTabs";
//Settings
import SettingScreen from "../screens/Settings/SettingScreen";
import Test from "../screens/Test";
//UserProfileAndSocial
import EditUserDietaryRestriction from "../screens/UserProfileAndSocial/EditUserDietaryRestriction";
import EditUserAllergen from "../screens/UserProfileAndSocial/EditUserAllergen";
//  User Profile Setup
import EditProfile from "../screens/UserProfileSetup/EditProfile";
import InitializeAllergen from "../screens/UserProfileSetup/InitializeAllergen";
import InitializeDietaryRestriction from "../screens/UserProfileSetup/InitializeDietaryRestriction";
import InitialUserProfile from "../screens/UserProfileSetup/InitialUserProfile";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Test" component={Test} />

        {/* Authorization */}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        {/* AuthorizationEND */}

        {/* User Profile Setup */}
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen
          name="InitializeAllergen"
          component={InitializeAllergen}
        />
        <Stack.Screen
          name="InitializeDietaryRestriction"
          component={InitializeDietaryRestriction}
        />
        <Stack.Screen
          name="InitialUserProfile"
          component={InitialUserProfile}
        />
        {/* User Profile Setup END */}
        {/* MainApp */}
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="OthersProfile" component={OthersProfile} />
        <Stack.Screen name="UserFollowed" component={UserFollowed} />
        <Stack.Screen name="UserFollowers" component={UserFollowers} />
        <Stack.Screen name="UserLikedRecipe" component={UserLikedRecipe} />
        <Stack.Screen
          name="SearchByIngredient"
          component={SearchByIngredient}
        />
        <Stack.Screen
          name="SearchRecipeByName"
          component={SearchRecipeByName}
        />

        {/* MainApp END */}

        {/* MainAppNavigation */}
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        {/* MainAppNavigation END */}
        {/* Recipe */}
        <Stack.Screen name="AddRecipe" component={AddRecipe} />
        <Stack.Screen name="EditRecipe" component={EditRecipe} />
        <Stack.Screen name="RecipeTabs" component={RecipeTabs} />
        <Stack.Screen
          name="InstructionIngredient"
          component={InstructionIngredient}
        />
        <Stack.Screen name="MyRecipeTabs" component={MyRecipeTabs} />
        {/* Recipe END*/}

        {/* Setting */}
        <Stack.Screen name="SettingScreen" component={SettingScreen} />

        {/* Setting END */}

        {/* UserProfileAndSocial */}
        <Stack.Screen
          name="EditUserDietaryRestriction"
          component={EditUserDietaryRestriction}
        />
        <Stack.Screen name="EditUserAllergen" component={EditUserAllergen} />

        {/* UserProfileAndSocial */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

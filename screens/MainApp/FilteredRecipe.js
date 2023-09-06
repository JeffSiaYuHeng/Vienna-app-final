import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import RecipeCard from "../../widgets/RecipeCard";
const FilteredRecipe = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const HomepageGate = () => {
    navigation.navigate("TabNavigator");
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchFilteredRecipes = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/api/filteredRecipeRoutes/?userId=${userId}`
          );
          setFilteredData(response.data.suitableRecipes);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching filtered recipes", error);
          setLoading(false);
        }
      };

      fetchFilteredRecipes();
    }, [])
  );

  if (!filteredData && loading) {
    return (
      <View>
        <LinearGradient
          colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
          start={[0, 0]} // Starting point (optional, default is [0,0])
          end={[1, 0]} // Ending point (optional, default is [1,0])
          className="flex p-4 pt-10 justify-between flex-row w-full h-[80]  items-center"
        >
          <View></View>
          <Text className="text-lg font-bold text-white">FilteredRecipe</Text>
          <TouchableOpacity onPress={HomepageGate}>
            <XMarkIcon size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>
        <View
          style={styles.container}
          className="items-center justify-center w-100 h-4/5"
        >
          <ActivityIndicator size="large" color="#7caf75" />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-between flex-row w-full h-[80]  items-center"
      >
        <View></View>
        <Text className="text-lg font-bold text-white">FilteredRecipe</Text>
        <TouchableOpacity onPress={HomepageGate}>
          <XMarkIcon size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>
      <View className="w-100 p-2 pt-4 pb-20 ">
        <ScrollView
          className="p-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            marginBottom: 30,
          }}
        >
          {filteredData.length > 0 ? (
            filteredData.map((recipe, index) => (
              <RecipeCard
                key={recipe._id}
                RecipeID={recipe._id}
                imgUrl={recipe.image}
                Title={recipe.title || "Unknown Title"}
                date={recipe.createdAt}
                Description={recipe.description || "No description available"}
                rates={5}
                Calorie={recipe.calorie}
                CreatorID={recipe.creatorUser}
                Recipe_View={150}
                Cooking_Time={recipe.cookingTime || "Unknown Time"}
                Difficulty_Level={recipe.difficultyLevel || "Unknown Level"}
                Like={15}
              />
            ))
          ) : (
            <View className="items-center justify-center w-100 h-4/5">
              <ActivityIndicator size="large" color="#7caf75" />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FilteredRecipe;

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

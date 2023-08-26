import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import RecipeCard from "../../widgets/RecipeCard";

const SearchRecipeByName = () => {
  const navigation = useNavigation();

  const HomepageGate = () => {
    navigation.navigate("TabNavigator");
  };

  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/recipes/home`
        );
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const newData = recipes.filter((item) =>
      item.title.toUpperCase().includes(searchText.toUpperCase())
    );
    setFilteredData(newData);
  }, [searchText, recipes]);

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-between flex-row w-full h-[80]  items-center"
      >
        <View></View>
        <Text className="text-lg font-bold text-white">
          Search Recipe By Name
        </Text>
        <TouchableOpacity onPress={HomepageGate}>
          <XMarkIcon size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>
      <View className="w-100 p-2 pt-4 ">
        <View className="w-100 p-2">
          <View className="bg-gray-200 w-100 h-9 rounded-[10px] px-4 flex-row items-center justify-between">
            <TextInput
              onChangeText={setSearchText}
              value={searchText}
              placeholder="Search Recipe"
              className="w-100"
            />
          </View>
        </View>

        <ScrollView
          className="p-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 70,
            marginBottom: 30,
          }}
        >
          {recipes.length > 0 ? (
            filteredData.map((recipe, index) => (
              <RecipeCard
                key={recipe._id} // This should be category._id
                RecipeID={recipe._id} // This should be category._i
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
            <View className="w-100 items-center">
              <Text>No Recipe found.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchRecipeByName;

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

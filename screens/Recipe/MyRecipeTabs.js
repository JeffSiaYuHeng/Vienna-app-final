import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  PlayIcon,
  TrashIcon,
  PencilSquareIcon,
  FireIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import { ChevronRightIcon } from "react-native-heroicons/outline";

export function RatingIcon({ rating }) {
    const renderStars = () => {
      const stars = [];
      for (let i = 0; i < rating; i++) {
        stars.push(
          <StarIcon
            key={i}
            style={{ marginRight: 2 }}
            color="#87C17C"
            size={15}
          />
        );
      }
      return stars;
    };
  
    return <View className="flex-row pl-1">{renderStars()}</View>;
  }

const Test = () => {
  const navigation = useNavigation();
  const {
    params: {
      RecipeID,
      imgUrlSource,
      Title,
      Description,
      formattedDate,
      rates,
      Calorie,
      Recipe_View,
      user_img,
      username,
      ingredient_1,
      ingredient_2,
      ingredient_3,
      formattedCookingTime,
      Difficulty_Level,
      Like,
    },
  } = useRoute();
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/ingredients/${RecipeID}`
        );
        setIngredients(response.data.Ingredients);
      } catch (error) {
        console.error("Error fetching Ingredients", error);
      }
    };

    fetchIngredients();

    const fetchInstructions = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/instructions/${RecipeID}`
        );
        setInstructions(response.data.instructions);
      } catch (error) {
        console.error("Error fetching instructions", error);
      }
    };

    fetchInstructions();
  }, []);

  const handleDeleteRecipe = async () => {
    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:8000/api/recipes/delete/${RecipeID}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data.message);
      Alert.alert("Deleted", "Recipe Deleted Successful");
      navigation.navigate("Tabs");
      // Add any additional logic or UI updates after successful deletion
    } catch (error) {
      console.log("Error deleting recipe", error);
      console.log(error.message);
    }
  };

  const [isCollapsedIngredient, setIsCollapsedIngredient] = useState(true);

  const toggleCollapsibleIngredient = () => {
    setIsCollapsedIngredient(!isCollapsedIngredient);
  };

  const [isCollapsedInstruction, setIsCollapsedInstruction] = useState(true);

  const toggleCollapsibleInstruction = () => {
    setIsCollapsedInstruction(!isCollapsedInstruction);
  };

  return (
    <SafeAreaView className="flex-1 bg-CF4FFF5 ">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-center flex-row w-full h-[80]  items-center"
      >
        <Text className="text-lg font-bold text-white">{Title}</Text>
      </LinearGradient>
      <ScrollView className="w-100 p-4">
        <View style={styles.cardContainer} className="p-4">
          <View className="w-100 h-28 rounded-xl flex-row pr-1">
            <Image source={imgUrlSource} className="w-28 h-28 rounded-xl" />
            <View className="absolute mt-1 flex-row w-28 justify-around">
              <View className="flex items-center justify-center w-14 h-5 bg-CE38D68 rounded-xl">
                <Text className="text-white text-xs font-bold ">
                  {Difficulty_Level}
                </Text>
              </View>
            </View>

            <View className=" pt-1 px-1">
              <View className="flex-row items-center">
                <View className="mr-1">
                  <Text className="font-bold text-lg text-black">{Title}</Text>
                </View>
                <View className="flex items-center justify-center px-1 h-5 ml-1 bg-C9BC17C rounded">
                  <Text className="text-white font-bold text-xs">
                    {formattedCookingTime}
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-gray-600 text-xs ml-1">
                  {formattedDate}
                </Text>
                <RatingIcon rating={5} />

                <View className="flex-row items-center justify-center px-2 h-5 w-20 ml-1 mt-1 bg-CEEDDA0 rounded">
                  <Text className="text-C645623 text-xxs font-bold pt-1">
                    est.
                  </Text>
                  <FireIcon size={15} color="#6D4731" />
                  <Text className="text-C645623 font-bold text-xs">
                    {Calorie} Cal
                  </Text>
                </View>
              </View>

              <View className="flex-row mt-1">
                <View className="flex-row">
                  {ingredients.length > 0 ? (
                    ingredients.slice(0, 3).map((ingredient, index) => (
                      <View
                        key={index}
                        className="flex items-center justify-center px-1 h-5 ml-1 bg-CEEDDA0 rounded"
                      >
                        <Text className="text-C645623 text-xs">
                          {ingredient.IngredientName}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text className="ml-2"></Text>
                  )}
                </View>
              </View>
            </View>
          </View>
          {/* Others */}
          <View>
            <TouchableOpacity
              onPress={toggleCollapsibleIngredient}
              className="w-full duration-500 bg-white rounded-[5px] mt-3 px-4 py-2 items-center border-2 border-gray-400 "
            >
              <View className="flex-row w-full justify-between items-center">
                <Text className="text-l font-bold">Ingredient</Text>
                <View>
                  <ChevronRightIcon
                    size={20}
                    color="#000000"
                    style={{
                      transform: isCollapsedIngredient
                        ? []
                        : [{ rotate: "90deg" }],
                    }}
                  />
                </View>
              </View>

              {!isCollapsedIngredient && (
                <View className="pt-1 flex w-full">
                  {ingredients.length > 0 ? (
                    ingredients.map((ingredient, index) => (
                      <View
                        key={index}
                        className="flex-row items-center justify-between w-full bg-gray-100 px-2 my-2 rounded-l py-1"
                      >
                        <Text>{ingredient.IngredientName}</Text>
                      </View>
                    ))
                  ) : (
                    <Text className="ml-2">No ingredients found.</Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleCollapsibleInstruction}
              className="w-full duration-500 bg-white rounded-[5px] mt-3 px-4 py-2 items-center border-2 border-gray-400 "
            >
              <View className="flex-row w-full justify-between items-center">
                <Text className="text-l font-bold">Instruction</Text>
                <View>
                  <ChevronRightIcon
                    size={20}
                    color="#000000"
                    style={{
                      transform: isCollapsedInstruction
                        ? []
                        : [{ rotate: "90deg" }],
                    }}
                  />
                </View>
              </View>

              {!isCollapsedInstruction && (
                <View className="pt-1 flex w-full">
                  {instructions.length > 0 ? (
                    instructions.map((instruction, index) => (
                      <View
                        key={index}
                        className="flex-row items-center justify-between w-full bg-gray-100 px-2 my-2 rounded-xl py-1"
                      >
                        <Text key={index}>{instruction.Description}</Text>
                      </View>
                    ))
                  ) : (
                    <Text className="ml-2">No instructions found.</Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-4 left-4 ">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="w-18 bg-CEEAEA0 h-8 justify-around px-3 rounded-[5px] items-center flex-row"
        >
          <PlayIcon
            size={18}
            color="#642323"
            style={{ transform: [{ scaleX: -1 }] }}
          />
          <Text className="font-bold text-base text-C642323">Back</Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-4 right-4 flex-row gap-2">
        <TouchableOpacity
          onPress={handleDeleteRecipe}
          className="w-18 bg-CEEAEA0 h-8 justify-around px-3 rounded-[5px] items-center flex-row"
        >
          <TrashIcon
            size={18}
            color="#642323"
            style={{ transform: [{ scaleX: -1 }] }}
          />
          <Text className="font-bold text-base text-C642323">Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
        
        onPress={()=>navigation.navigate("EditRecipe",{RecipeID})}
        
        className="w-18 bg-C73CEE2 h-8 justify-around px-2 rounded-[5px] items-center flex-row">
          <PencilSquareIcon size={18} color="#11434E" />
          <Text className="font-bold text-base text-C11434E">Edit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Test;

//style
const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
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

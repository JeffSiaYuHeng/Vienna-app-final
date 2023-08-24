import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { PlayIcon, PlusIcon, TrashIcon } from "react-native-heroicons/solid";
import AddInstructionRow from "../../widgets/AddInstructionRow";
import axios from "axios";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import AddInstructionComponents from "../../components/AddInstructionComponents"; // Import the component
import AddIngredientComponents from "../../components/AddIngredientComponents";
import AddIngredientRow from "../../widgets/AddIngredientRow";

const InstructionIngredient = ({ route }) => {
  const { recipeId } = route.params;
  const navigation = useNavigation();

  const [ingredients, setIngredients] = useState([]);
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const toggleAddIngredient = () => {
    setShowAddIngredient(!showAddIngredient);
  };

  const closeAddIngredient = async () => {
    try {
      // Refresh the page
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/ingredients/${recipeId}`
      );
      setIngredients(response.data.Ingredients);
    } catch (error) {
      console.error("Error fetching Ingredients", error);
    }
    setShowAddIngredient(false);
  };

  const handleDeleteIngredient = async () => {
    try {
      // Refresh the page
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/ingredients/${recipeId}`
      );
      setIngredients(response.data.Ingredients);
    } catch (error) {
      console.error("Error fetching Ingredients", error);
    }
  };

  const [instructions, setInstructions] = useState([]);
  const [showAddInstruction, setShowAddInstruction] = useState(false);
  const toggleAddInstruction = () => {
    setShowAddInstruction(!showAddInstruction);
  };

  const closeAddInstruction = async () => {
    try {
      // Refresh the page
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/instructions/${recipeId}`
      );
      setInstructions(response.data.instructions);
    } catch (error) {
      console.error("Error fetching instructions", error);
    }
    setShowAddInstruction(false);
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/ingredients/${recipeId}`
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
          `http://${IP_ADDRESS}:8000/api/instructions/${recipeId}`
        );
        setInstructions(response.data.instructions);
      } catch (error) {
        console.error("Error fetching instructions", error);
      }
    };

    fetchInstructions();
  }, []);

  const handleDeleteInstruction = async () => {
    try {
      // Refresh the page
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/instructions/${recipeId}`
      );
      setInstructions(response.data.instructions);
    } catch (error) {
      console.error("Error fetching instructions", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-CF4FFF5 ">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-center  w-full h-[90]  items-center"
      >
        <Text className="text-lg font-bold text-white">Create a Recipe</Text>
        <Text className="text-xs font-bold text-C2B5708">
          Instruction & Ingredient
        </Text>
      </LinearGradient>
      <ScrollView className="w-100 p-2 pt-4 ">
        <View
          className="w-100 rounded-xl bg-white p-4 pt-2 gap-y-2"
          style={styles.cardContainer}
        >
          <Text className="text-lg font-bold">Ingredient</Text>
          <TouchableOpacity
            onPress={toggleAddIngredient}
            className="mt-1 items-center flex-row justify-between px-3 h-6 ml-1 w-28 bg-CC5ECBE rounded-lg"
          >
            <PlusIcon size={16} color="#2B5708" />
            <Text className="font-bold text-C2B5708 text-xs">
              Add Ingredient
            </Text>
          </TouchableOpacity>
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <AddIngredientRow
                key={ingredient._id} // Use a unique identifier from your data here
                IngredientID={ingredient._id}
                IngredientName={ingredient.IngredientName}
                onDelete={handleDeleteIngredient}
              />
            ))
          ) : (
            <Text className="ml-2">No ingredients found.</Text>
          )}
        </View>

        <View
          className="w-100 rounded-xl bg-white p-4 pt-2 gap-y-2 mt-4"
          style={styles.cardContainer}
        >
          <Text className="text-lg font-bold">Instruction</Text>
          <TouchableOpacity
            onPress={toggleAddInstruction}
            className="mt-1 items-center flex-row justify-between px-3 h-6 ml-1 w-28 bg-CC5ECBE rounded-lg"
          >
            <PlusIcon size={16} color="#2B5708" />
            <Text className="font-bold text-C2B5708 text-xs">
              Add Instruction
            </Text>
          </TouchableOpacity>

          {instructions.length > 0 ? (
            instructions.map((instruction, index) => (
              <AddInstructionRow
                key={instruction._id} // Use a unique identifier from your data here
                InstructionID={instruction._id}
                Description={instruction.Description}
                onDelete={handleDeleteInstruction}
              />
            ))
          ) : (
            <Text className="ml-2">No instructions found.</Text>
          )}
        </View>
      </ScrollView>

      {/* Conditionally render AddInstructionComponents based on showAddInstruction */}
      {showAddInstruction && (
        <AddInstructionComponents
          recipeId={recipeId}
          onClose={closeAddInstruction}
        />
      )}

      {showAddIngredient && (
        <AddIngredientComponents
          recipeId={recipeId}
          onClose={closeAddIngredient}
        />
      )}
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
      <View className="absolute bottom-4 right-4 ">
        <TouchableOpacity
          className="w-18 bg-C73CEE2   h-8 justify-around px-3 rounded-[5px] items-center flex-row"
          onPress={() => {
            Alert.alert("Hey", "Recipe Created Successful");
            navigation.navigate("Tabs");
          }}
        >
          <Text className="font-bold text-base text-C11434E">Next</Text>
          <PlayIcon size={18} color="#11434E" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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

export default InstructionIngredient;


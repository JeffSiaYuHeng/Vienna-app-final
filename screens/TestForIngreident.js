import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import IP_ADDRESS from "../config"; // Adjust the path as needed
import SelectionToggle from "../widgets/SelectionToggle";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/solid";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Fetch ingredients from the API
  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/ingredients/`
      );
      setIngredients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Use useFocusEffect to fetch data when the component gains focus
  useFocusEffect(
    React.useCallback(() => {
      fetchIngredients();
    }, [])
  );

  // Filter ingredients based on user input
  useEffect(() => {
    const newData = ingredients.filter((item) =>
      item.Name.toUpperCase().includes(searchText.toUpperCase())
    );
    setFilteredData(newData);
  }, [searchText, ingredients]);

  // Handle search input change
  const handleSearch = (text) => {
    setSearchText(text);
  };

  // Toggle ingredient selection
  const handleToggle = (IngredientId) => {
    if (selectedIngredients.includes(IngredientId)) {
      setSelectedIngredients((prev) =>
        prev.filter((item) => item !== IngredientId)
      );
    } else {
      setSelectedIngredients((prev) => [...prev, IngredientId]);
    }
  };

  // Clear all selected ingredients
  const clearAllSelections = () => {
    setSelectedIngredients([]);
    // fetchIngredients();
    // You may need to fetch additional data and update their selection state here
  };

  useEffect(() => {
    console.log(selectedIngredients);
  }, [selectedIngredients]); // Log the state whenever it changes

  return (
    <View className="absolute top-[150] w-screen h-screen items-center ">
      <View
        className="w-[300px] rounded-xl bg-white p-4 pt-0 gap-y-4"
        style={styles.cardContainer}
      >
        <TouchableOpacity className="w-full justify-end flex-row">
          <XMarkIcon size={18} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={clearAllSelections} // Call the clearAllSelections function
          className="w-[70px] self-end bg-red-400 h-8 justify-around px-3 rounded-[10px] items-center flex-row "
        >
          <Text className="font-bold text-sm text-white">Clear All</Text>
        </TouchableOpacity>
        <View className="bg-gray-200 w-full h-9 rounded-[10px] px-2 flex-row items-center justify-between">
          <TextInput
            onChangeText={handleSearch}
            value={searchText}
            placeholder="Search Ingredient"
          />
        </View>

        <ScrollView className="h-[300px]">
          {filteredData.map((item) => (
            <View key={item.IngredientId}>
              <SelectionToggle
                value={item.Name}
                isSelected={selectedIngredients.includes(item.IngredientId)}
                onToggle={() => handleToggle(item.IngredientId)}
              />
            </View>
          ))}
        </ScrollView>
        <View className="w-full bg-gary-100 rounded-[5px] mt-3 px-4 py-3 border-[1px] border-gray-400 flex-row justify-between">
          <View>Te</View>
        </View>
      </View>
    </View>
  );
};

export default App;

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
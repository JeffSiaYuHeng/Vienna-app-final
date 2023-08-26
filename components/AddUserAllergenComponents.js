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
import { useFocusEffect, useNavigation } from "@react-navigation/native"; // Import useFocusEffect
import IP_ADDRESS from "../config"; // Adjust the path as needed
import SelectionToggle from "../widgets/SelectionToggle";
import { XMarkIcon } from "react-native-heroicons/solid";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
const AddUserAllergenComponents = ({ onClose }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [selectedAllergens, setSelectedAllergens] = useState([]);

  useEffect(() => {
    const fetchAllergens = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/allergen`
        );
        setAllergens(response.data.allergens);
      } catch (error) {
        console.error("Error fetching Allergens", error);
      }
    };

    // Set loading state to true initially
    fetchAllergens();
  }, []);

  console.log(allergens);

  // Filter allergens based on user input
  useEffect(() => {
    const newData = allergens.filter((item) =>
      item.Name.toUpperCase().includes(searchText.toUpperCase())
    );
    setFilteredData(newData);
  }, [searchText, allergens]);

  // Handle search input change
  const handleSearch = (text) => {
    setSearchText(text);
  };

  const fetchAndUpdateAllergens = async () => {
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/allergen`
      );
      const fetchedAllergens = response.data.allergens;

      // Update the state with fetched data
      setAllergens(fetchedAllergens);

      // Reset the selection state
      setSelectedAllergens([]);
    } catch (error) {
      console.error("Error fetching Allergens", error);
      // Handle error if needed
    }
  };

  // Toggle allergen selection
  const handleToggle = (AllergenId) => {
    if (selectedAllergens.includes(AllergenId)) {
      setSelectedAllergens((prev) =>
        prev.filter((item) => item !== AllergenId)
      );
    } else {
      setSelectedAllergens((prev) => [...prev, AllergenId]);
    }
  };

  const clearAllSelections = () => {
    setSelectedAllergens([]); // Clear the array
    fetchAndUpdateAllergens();
    // You may need to fetch the allergens again and update their selection state
  };

  useEffect(() => {
    console.log(selectedAllergens);
  }, [selectedAllergens]); // Log the state whenever it changes

  const handleCreateUserAllergen = async () => {
    if (selectedAllergens.length === 0) {
      // Display an alert or take any other necessary action to inform the user.
      Alert.alert(
        "No Allergens Selected",
        "Please select at least one allergen."
      );
      return; // Exit the function without making the API call.
    }
    try {
      // Get the user's authentication token from AsyncStorage
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      // Prepare an array of allergens to add
      const allergensToAdd = selectedAllergens.map((AllergenId) => ({
        AllergenId: AllergenId,
        userId: userId, // Add the userId field
      }));

      console.log("Allergens to Add:", allergensToAdd);

      // Send a POST request to create user allergens
      const response = await axios.post(
        `http://${IP_ADDRESS}:8000/api/userAllergen/create`,
        allergensToAdd
      );

      console.log("User Allergen Creation Response:", response.data);
      Alert.alert("Successful", "Your Allergens are Added");
      // navigation.navigate("NextScreen"); // Replace "NextScreen" with your screen name
    } catch (error) {
      console.error("User Allergen Creation Error:", error);

      // Handle the error, display an alert, or perform any other necessary actions
      Alert.alert(
        "User Allergen Creation Error",
        "An error occurred while creating the User Allergen"
      );
    }
  };

  return (
    <View className="absolute top-[100] w-screen h-screen items-center ">
      <View
        className="w-[300px] rounded-xl bg-white p-4 pt-0 gap-y-4"
        style={styles.cardContainer}
      >
        <View className="w-full justify-between flex-row">
          <TouchableOpacity
            onPress={clearAllSelections} // Call the clearAllSelections function
            className="w-[70px] self-end bg-red-400 h-8 justify-around px-3 rounded-[10px] items-center flex-row "
          >
            <Text className="font-bold text-sm text-white">Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity className="" onPress={onClose}>
            <XMarkIcon size={18} color="#000000" />
          </TouchableOpacity>
        </View>
        <View className="bg-gray-200 w-full h-9 rounded-[10px] px-2 flex-row items-center justify-between">
          <TextInput
            onChangeText={handleSearch}
            value={searchText}
            placeholder="Search Allergens"
          />
        </View>

        <ScrollView className="h-[300px]">
          {filteredData.map((item) => (
            <View key={item.AllergenId}>
              <SelectionToggle
                value={item.Name}
                isSelected={selectedAllergens.includes(item.AllergenId)}
                onToggle={() => handleToggle(item.AllergenId)}
              />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={handleCreateUserAllergen}
          className=" w-full  bg-C87C17C h-10 items-center justify-center rounded-[5px]"
        >
          <Text className="text-white font-bold text-base">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddUserAllergenComponents;

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

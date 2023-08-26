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
const AddUserDietaryRestrictionComponents = ({ onClose }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

  useEffect(() => {
    const fetchDietaryRestriction = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/dietaryRestrictions`
        );
        setDietaryRestrictions(response.data.dietaryRestrictions);
      } catch (error) {
        console.error("Error fetching Dietary Restriction", error);
      }
    };

    // Set loading state to true initially
    fetchDietaryRestriction();
  }, []);

  console.log(dietaryRestrictions);

  // Filter ingredients based on user input
  useEffect(() => {
    const newData = dietaryRestrictions.filter((item) =>
      item.Name.toUpperCase().includes(searchText.toUpperCase())
    );
    setFilteredData(newData);
  }, [searchText, dietaryRestrictions]);

  // Handle search input change
  const handleSearch = (text) => {
    setSearchText(text);
  };

  const fetchAndUpdateDietaryRestrictions = async () => {
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/dietaryRestriction`
      );
      const fetchedDietaryRestrictions = response.data.dietaryRestrictions;

      // Update the state with fetched data
      setDietaryRestrictions(fetchedDietaryRestrictions);

      // Reset the selection state
      setSelectedRestrictions([]);
    } catch (error) {
      console.error("Error fetching Dietary Restriction", error);
      // Handle error if needed
    }
  };

  // Toggle ingredient selection
  const handleToggle = (DietaryRestrictionId) => {
    if (selectedRestrictions.includes(DietaryRestrictionId)) {
      setSelectedRestrictions((prev) =>
        prev.filter((item) => item !== DietaryRestrictionId)
      );
    } else {
      setSelectedRestrictions((prev) => [...prev, DietaryRestrictionId]);
    }
  };

  const clearAllSelections = () => {
    setSelectedRestrictions([]); // Clear the array
    fetchAndUpdateDietaryRestrictions();
    // You may need to fetch the dietary restrictions again and update their selection state
  };

  useEffect(() => {
    console.log(selectedRestrictions);
  }, [selectedRestrictions]); // Log the state whenever it changes

  const handleCreateUserDietaryRestriction = async () => {
    if (selectedRestrictions.length === 0) {
      // Display an alert or take any other necessary action to inform the user.
      Alert.alert(
        "No Dietary Restrictions Selected",
        "Please select at least one dietary restriction."
      );
      return; // Exit the function without making the API call.
    }
    try {
      // Get the user's authentication token from AsyncStorage
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      // Prepare an array of dietary restrictions to add
      const dietaryRestrictionsToAdd = selectedRestrictions.map(
        (DietaryRestrictionId) => ({
          RestrictionID: DietaryRestrictionId,
          userId: userId, // Add the userId field
        })
      );

      console.log("Dietary Restrictions to Add:", dietaryRestrictionsToAdd);

      // Send a POST request to create user dietary restrictions
      const response = await axios.post(
        `http://${IP_ADDRESS}:8000/api/userDietaryRestriction/create`,
        dietaryRestrictionsToAdd
      );

      console.log("User Dietary Restriction Creation Response:", response.data);
      Alert.alert("Successful", "Your Dietary Restriction are Added");
      // navigation.navigate("NextScreen"); // Replace "NextScreen" with your screen name
    } catch (error) {
      console.error("User Dietary Restriction Creation Error:", error);

      // Handle the error, display an alert, or perform any other necessary actions
      Alert.alert(
        "User Dietary Restriction Creation Error",
        "An error occurred while creating the User Dietary Restriction"
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
            placeholder="Search DietaryRestriction"
          />
        </View>

        <ScrollView className="h-[300px]">
          {filteredData.map((item) => (
            <View key={item.IngredientId}>
              <SelectionToggle
                value={item.Name}
                isSelected={selectedRestrictions.includes(
                  item.DietaryRestrictionId
                )}
                onToggle={() => handleToggle(item.DietaryRestrictionId)}
              />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={handleCreateUserDietaryRestriction}
          className=" w-full  bg-C87C17C h-10 items-center justify-center rounded-[5px]"
        >
          <Text className="text-white font-bold text-base">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddUserDietaryRestrictionComponents;

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

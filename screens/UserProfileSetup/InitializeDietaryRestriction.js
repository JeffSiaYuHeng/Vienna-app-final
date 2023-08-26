import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import SelectionToggle from "../../widgets/SelectionToggle";
import axios from "axios";
import IP_ADDRESS from "../../config"; // Adjust the path as needed.
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InitializeDietaryRestriction() {
  const navigation = useNavigation();

  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

  useEffect(() => {
    const fetchDietaryRestriction = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/dietaryRestrictions`
        );
        setDietaryRestrictions(response.data.dietaryRestrictions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Dietary Restriction", error);
        setLoading(false); // Handle error by setting loading state to false
      }
    };

    // Set loading state to true initially
    setLoading(true);
    fetchDietaryRestriction();
  }, []);

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

  const handleToggle = (DietaryRestrictionId) => {
    if (selectedRestrictions.includes(DietaryRestrictionId)) {
      setSelectedRestrictions((prev) =>
        prev.filter((item) => item !== DietaryRestrictionId)
      );
    } else {
      setSelectedRestrictions((prev) => [...prev, DietaryRestrictionId]);
    }
  };

  useEffect(() => {
    console.log(selectedRestrictions);
  }, [selectedRestrictions]); // Log the state whenever it changes

  const clearAllSelections = () => {
    setSelectedRestrictions([]); // Clear the array
    fetchAndUpdateDietaryRestrictions();
    // You may need to fetch the dietary restrictions again and update their selection state
  };

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
      navigation.navigate("InitializeAllergen");
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
    <SafeAreaView className="flex-1 bg-CF4FFF5 ">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-center flex-row  w-full h-[90]  items-center"
      >
        <View className="items-center justify-center">
          <Text className="text-xs font-bold text-C2B5708">
            Initialize for New User
          </Text>
          <Text className="text-lg font-bold text-white">
            Dietary Restrictions
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("TabNavigator")}
          className=" absolute right-6 top-12"
        >
          <Text className=" text-base font-bold text-C2B5708">Skip</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View className="w-100 h-screen px-5 pt-2 ">
        <TouchableOpacity
          onPress={clearAllSelections} // Call the clearAllSelections function
          className="w-[70px] self-end bg-red-400 h-8 justify-around px-3 rounded-[10px] items-center flex-row mb-2"
        >
          <Text className="font-bold text-sm text-white">Clear All</Text>
        </TouchableOpacity>
        {/* <View className="bg-gray-200 w-full h-9 rounded-[10px] px-4 flex-row items-center justify-between">
          <TextInput placeholder="Search dietary restrictions" />
          <MagnifyingGlassIcon size={25} color="#B4B4B4" />
        </View> */}
        <View>
          {/* Rpw */}
          {dietaryRestrictions.map((restriction) => (
            <SelectionToggle
              key={restriction.DietaryRestrictionId} // Assuming 'id' is the unique identifier for dietary restrictions
              value={restriction.Name}
              isSelected={selectedRestrictions.includes(
                restriction.DietaryRestrictionId
              )}
              onToggle={() => handleToggle(restriction.DietaryRestrictionId)} // Pass the ID to handleToggle
            />
          ))}
        </View>
      </View>
      <View className="absolute bottom-6 right-6 ">
        <TouchableOpacity
          onPress={handleCreateUserDietaryRestriction}
          className="w-24 bg-C9BC17C h-8 justify-around px-3 rounded-[5px] items-center flex-row"
        >
          <Text className="font-bold text-base text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

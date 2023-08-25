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

export default function InitializeAllergen() {
  const navigation = useNavigation();

  const [allergens, setAllergens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAllergens, setSelectedAllergens] = useState([]);

  const activateUser = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      const response = await axios.put(
        `http://${IP_ADDRESS}:8000/user/${userId}/activate`
      );
      console.log("User activated successfully:", response.data);
      navigation.navigate("TabNavigator");
      // You can add additional logic here if needed
    } catch (error) {
      console.error("Error activating user:", error);
    }
  };

  useEffect(() => {
    const fetchAllergen = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/allergen`
        );
        setAllergens(response.data.allergens);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching allergens", error);
        setLoading(false); // Handle error by setting loading state to false
      }
    };

    // Set loading state to true initially
    setLoading(true);
    fetchAllergen();
  }, []);

  const handleToggle = (AllergenId) => {
    if (selectedAllergens.includes(AllergenId)) {
      setSelectedAllergens((prev) =>
        prev.filter((item) => item !== AllergenId)
      );
    } else {
      setSelectedAllergens((prev) => [...prev, AllergenId]);
    }
  };

  const fetchAndUpdateAllergen = async () => {
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/allergen`
      );
      const fetchedDietaryRestrictions = response.data.allergens;

      // Update the state with fetched data
      setAllergens(allergens);

      // Reset the selection state
      setAllergens([]);
    } catch (error) {
      console.error("Error fetching Allergen", error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    console.log(selectedAllergens);
  }, [selectedAllergens]); // Log the state whenever it changes

  const clearAllSelections = () => {
    setSelectedAllergens([]); // Clear the array
    fetchAndUpdateAllergen();
    // You may need to fetch the Allergen again and update their selection state
  };

  const handleCreateUserAllergen = async () => {
    if (selectedAllergens.length === 0) {
      // Display an alert or take any other necessary action to inform the user.
      Alert.alert(
        "No Allergens Selected",
        "Please select at least one Allergen."
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
      Alert.alert("Successful", "Your Dietary Restriction are Added");
      activateUser();
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
          <Text className="text-lg font-bold text-white">Allergen</Text>
        </View>

        <TouchableOpacity
          onPress={activateUser}
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
          <TextInput placeholder="Search Allergen" />
          <MagnifyingGlassIcon size={25} color="#B4B4B4" />
        </View> */}
        <View>
          {/* Rpw */}
          {allergens.map((allergen) => (
            <SelectionToggle
              key={allergen.AllergenId} // Assuming 'id' is the unique identifier for dietary allergens
              value={allergen.Name}
              isSelected={selectedAllergens.includes(allergen.AllergenId)}
              onToggle={() => handleToggle(allergen.AllergenId)} // Pass the ID to handleToggle
            />
          ))}
        </View>
      </View>
      <View className="absolute bottom-6 right-6 ">
        <TouchableOpacity
          onPress={handleCreateUserAllergen}
          className="w-24 bg-C9BC17C h-8 justify-around px-3 rounded-[5px] items-center flex-row"
        >
          <Text className="font-bold text-base text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

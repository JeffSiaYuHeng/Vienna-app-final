import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { PlusIcon, XMarkIcon } from "react-native-heroicons/solid";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import UserAllergenRow from "../../widgets/UserAllergenRow"; // Change the import to UserAllergenRow
import AddUserAllergenComponents from "../../components/AddUserAllergenComponents"; // Change the import to AddUserAllergenComponents

export default function EditUserAllergen() {
  // Rename the component
  const navigation = useNavigation();
  const [userAllergens, setUserAllergens] = useState([]); // Change the state variable

  const fetchUserAllergens = async () => {
    // Change the function name
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/userAllergen/byUserId/${userId}` // Change the API endpoint
      );
      setUserAllergens(response.data.userAllergens); // Change the state variable
    } catch (error) {
      console.error("Error fetching user allergens", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserAllergens();
    }, [])
  );

  const [showUserAllergen, setShowUserAllergen] = useState(false); // Change the state variable
  const toggleUserAllergen = () => {
    setShowUserAllergen(!showUserAllergen); // Change the state variable
  };

  const HomepageGate = () => {
    navigation.navigate("TabNavigator");
  };

  const closeAddUserAllergen = async () => {
    // Change the function name
    fetchUserAllergens(); // Change the function name

    setShowUserAllergen(false); // Change the state variable
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-between flex-row w-full h-[80]  items-center"
      >
        <View></View>
        <Text className="text-lg font-bold text-white">User's Allergen</Text>
        <TouchableOpacity onPress={HomepageGate}>
          <XMarkIcon size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>
      <View className="w-100 items-center justify-center p-2">
        <TouchableOpacity
          onPress={toggleUserAllergen}
          className=" items-center flex-row justify-center p-2  w-32 bg-CC5ECBE rounded-lg"
        >
          <Text className="font-bold text-C2B5708 ">Add Allergen</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="w-100 p-2 pt-4 ">
        <View
          className="w-full bg-white  rounded-xl p-4"
          style={styles.cardContainer}
        >
          {userAllergens.length > 0 ? (
            userAllergens.map((userAllergen) => (
              <UserAllergenRow
                key={userAllergen._id}
                _id={userAllergen._id}
                AllergenID={userAllergen.AllergenId} // Change the property name
                onDelete={fetchUserAllergens} // Change the function name
              />
            ))
          ) : (
            <Text className="ml-2"> No Allergens found.</Text>
          )}
        </View>
      </ScrollView>
      {showUserAllergen && (
        <AddUserAllergenComponents
          onClose={closeAddUserAllergen} // Change the function name
        />
      )}
    </SafeAreaView>
  );
}

//style
const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
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

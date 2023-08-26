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
import UserDietaryRestrictionRow from "../../widgets/UserDietaryRestrictionRow";
import AddUserDietaryRestrictionComponents from "../../components/AddUserDietaryRestrictionComponents";

export default function EditUserDietaryRestriction() {
  const navigation = useNavigation();
  const [userDietaryRestrictions, setUserDietaryRestrictions] = useState([]);
  const fetchUserDietaryRestrictions = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/userDietaryRestriction/byUserId/${userId}`
      );
      setUserDietaryRestrictions(response.data.userDietaryRestrictions);
    } catch (error) {
      console.error("Error fetching user dietary restrictions", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserDietaryRestrictions();
    }, [])
  );

  const [showUserDietaryRestriction, setShowUserDietaryRestriction] =
    useState(false);
  const toggleUserDietaryRestriction = () => {
    setShowUserDietaryRestriction(!showUserDietaryRestriction);
  };

  const HomepageGate = () => {
    navigation.navigate("TabNavigator");
  };

  const closeAddUserDietaryRestriction = async () => {
    fetchUserDietaryRestrictions();

    setShowUserDietaryRestriction(false);
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
        <Text className="text-lg font-bold text-white">
          User's Dietary Restriction
        </Text>
        <TouchableOpacity onPress={HomepageGate}>
          <XMarkIcon size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>
      <View className="w-100 items-center justify-center p-2">
        <TouchableOpacity
          onPress={toggleUserDietaryRestriction}
          className=" items-center flex-row justify-between p-2  w-36 bg-CC5ECBE rounded-lg"
        >
          <Text className="font-bold text-C2B5708 ">
            Add Dietary Restriction
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="w-100 p-2 pt-4 ">
        <View
          className="w-full bg-white  rounded-xl p-4"
          style={styles.cardContainer}
        >
          {/* Row */}

          {userDietaryRestrictions.length > 0 ? (
            userDietaryRestrictions.map((userDietaryRestriction) => (
              <UserDietaryRestrictionRow
                key={userDietaryRestriction._id} // Use a unique identifier from your data here
                _id={userDietaryRestriction._id}
                DietaryRestrictionID={userDietaryRestriction.RestrictionID}
                onDelete={fetchUserDietaryRestrictions}
              />
            ))
          ) : (
            <Text className="ml-2"> No Dietary Restrictions found.</Text>
          )}
          {/* ROw */}
        </View>
      </ScrollView>
      {showUserDietaryRestriction && (
        <AddUserDietaryRestrictionComponents
          onClose={closeAddUserDietaryRestriction}
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

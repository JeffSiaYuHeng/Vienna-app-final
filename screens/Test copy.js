import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { TrashIcon } from "react-native-heroicons/outline";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../config"; // Adjust the path as needed
import ShoppingListRow from "../widgets/ShoppingListRow";

export default function UserDietaryRestrictionsScreen() {
  const navigation = useNavigation();
  const [userDietaryRestrictions, setUserDietaryRestrictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
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

      fetchUserDietaryRestrictions();
    }, [])
  );

  const handleDeleteDietaryRestriction = async (RestrictionID) => {
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    try {
      await axios.delete(
        `http://${IP_ADDRESS}:8000/api/userDietaryRestriction/delete/${RestrictionID}`
      );
      // After deleting, fetch the updated list
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/userDietaryRestriction/byUserId/${userId}`
      );
      setUserDietaryRestrictions(response.data.userDietaryRestrictions);
    } catch (error) {
      console.error("Error deleting user dietary restriction", error);
    }
  };

  return (
    <View>
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        style={styles.header}
      >
        <Text style={styles.headerText}>User Dietary Restrictions</Text>
      </LinearGradient>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardContainer}>
          {userDietaryRestrictions.length > 0 ? (
            userDietaryRestrictions.map((restriction) => (
              <View key={restriction.RestrictionID} style={styles.row}>
                <Text style={styles.itemName}>{restriction.RestrictionID}</Text>
                <TouchableOpacity
                  onPress={() =>
                    handleDeleteDietaryRestriction(restriction.RestrictionID)
                  }
                  style={styles.deleteButton}
                >
                  <TrashIcon size={24} color="#FF0000" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noItemsText}>
              No Dietary Restrictions found.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  scrollView: {
    padding: 16,
  },
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 4,
  },
  noItemsText: {
    marginLeft: 16,
    fontSize: 16,
    color: "gray",
  },
});

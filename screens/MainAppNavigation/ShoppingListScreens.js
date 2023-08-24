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
import { TrashIcon } from "react-native-heroicons/outline";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import ShoppingListRow from "../../widgets/ShoppingListRow";

export default function ShoppingListScreen() {
  const navigation = useNavigation();
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchShoppingList = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        try {
          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/api/shoppingList/find/${userId}`
          );
          setShoppingLists(response.data.shoppingLists);
        } catch (error) {
          console.error("Error fetching shoppingList", error);
        }
      };

      fetchShoppingList();
    }, [])
  );


  const handleDeleteIngredient = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/shoppingList/find/${userId}`
      );
      setShoppingLists(response.data.shoppingLists);
    } catch (error) {
      console.error("Error fetching shoppingList", error);
    }
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-center flex-row w-full h-[80]  items-center"
      >
        <Text className="text-lg font-bold text-white">Shopping List</Text>
      </LinearGradient>
      <ScrollView className="w-100 p-2 pt-4 ">
        <View
          className="w-full bg-white  rounded-xl p-4"
          style={styles.cardContainer}
        >
          {/* Row */}

          {shoppingLists.length > 0 ? (
            shoppingLists.map((Item) => (
              <ShoppingListRow
                key={Item._id} // Use a unique identifier from your data here
                ItemId={Item._id}
                itemName={Item.itemName}
                onDelete={handleDeleteIngredient}
              />
            ))
          ) : (
            <Text className="ml-2">No Items found.</Text>
          )}
          {/* ROw */}
        </View>
      </ScrollView>
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

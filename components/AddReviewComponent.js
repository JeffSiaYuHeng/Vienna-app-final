import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios"; // Import axios for making API requests
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import { XMarkIcon } from "react-native-heroicons/solid";
import NumericInput from "react-native-numeric-input";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";

const AddReviewComponent = ({ RecipeID, onClose0 }) => {
  const [selectedRate, setSelectedRate] = useState(1); // Initial rating value
  const [comment, setComment] = useState(""); // Review comment
  const [userId, setUserId] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserProfile = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
          setUserId(userId); // Set the userId in state
        } catch (error) {
          console.log("Error fetching user profile", error);
        }
      };

      fetchUserProfile();
    }, [])
  );

  const handleAddReview = () => {
    if (comment.trim() === "") {
      Alert.alert("Empty Field", "Please enter a review name.");
      return;
    }

    // Assuming you have a recipe ID and user ID available
    const newReview = {
      RecipeID: RecipeID,
      UserID: userId, // Replace userId with the actual user ID
      Rates: selectedRate, // Replace selectedRate with the selected rating value
      Comment: comment, // Use 'name' as the comment text
    };

    axios
      .post(`http://${IP_ADDRESS}:8000/api/reviews`, newReview)
      .then((response) => {
        console.log("API Response:", response);
        Alert.alert("Review Added", "New review added successfully");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Adding Review Failed:", error.response.data);
        } else if (error.message) {
          console.log("Adding Review Failed:", error.message);
        } else {
          console.log("Adding Review Failed:", error);
        }

        Alert.alert(
          "Adding Review Error",
          "An error occurred while adding the review"
        );
      });
  };

  return (
    <View className="absolute top-[100] w-screen h-screen items-center ">
      <View
        className="w-[300px] rounded-xl bg-white p-4 pt-0 gap-y-4"
        style={styles.cardContainer}
      >
        <TouchableOpacity
          onPress={onClose}
          className="w-full justify-end flex-row"
        >
          <XMarkIcon size={18} color="#000000" />
        </TouchableOpacity>
        <View>
          <Text className="font-semibold text-xl">Review</Text>
        </View>
        <View>
          <Text className=" text-gray-500 mb-1">Rates:</Text>
          <NumericInput
            value={selectedRate}
            onChange={setSelectedRate}
            minValue={1} // Minimum value
            maxValue={5} // Maximum value
            totalWidth={100}
            totalHeight={40}
            iconSize={25}
            step={1} // Step increment/decrement
          />
        </View>
        <View>
          <Text className=" text-gray-500 mb-1">Comment:</Text>
          <TextInput
            value={comment} // Change 'description' to 'name'
            onChangeText={(text) => setComment(text)} // Change 'description' to 'name'
            multiline
            numberOfLines={4} // You can adjust the number of visible lines
            className="w-100 bg-white border-solid border-gray-600 border-[1px] h-[90] items-center justify-center rounded-[5px] pl-2"
          />
        </View>
        <TouchableOpacity
          onPress={handleAddReview}
          className=" w-full  bg-C87C17C h-10 items-center justify-center rounded-[5px]"
        >
          <Text className="text-white font-bold text-base">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
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

export default AddReviewComponent;

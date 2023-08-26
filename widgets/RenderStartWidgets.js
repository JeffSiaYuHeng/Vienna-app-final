import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { StarIcon, HeartIcon, FireIcon } from "react-native-heroicons/solid";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../config"; // Adjust the path as needed
//rating system



export function RenderStartWidgets({ recipeId }) {



  const [reviews, setReviews] = useState([]);

  
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:8000/api/recipeReviews/${recipeId}`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error fetching recipe reviews", error);
    }
  };



  useFocusEffect(
    React.useCallback(() => {    

    fetchReviews();
  }, [recipeId])
  );


  function calculateAverageRate(reviews) {
    // Check if the 'reviews' array is empty to avoid division by zero
    if (reviews.length === 0) {
      return 0;
    }
  
    // Calculate the sum of all rates
    const sumOfRates = reviews.reduce((total, review) => {
      return total + review.Rates;
    }, 0);
  
    // Calculate the average rate
    const averageRate = sumOfRates / reviews.length;
  
    // Convert the average rate to an integer using parseInt
    const averageRateInteger = parseInt(averageRate);
  
    return averageRateInteger;
  }

  const averageRate = calculateAverageRate(reviews);





  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < averageRate; i++) {
      stars.push(
        <StarIcon
          key={i}
          style={{ marginRight: 2 }}
          color="#87C17C"
          size={15}
        />
      );
    }
    return stars;
  };

  return !reviews.length == 0 ? (
    <View className="flex-row pl-1">{renderStars()}</View>
  ) : (
    <Text className="text-xs text-gray-500">"no-rating-yet"</Text>
  );
  };  
import { View, Text,StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ReviewRow from '../widgets/ReviewRow';
import axios from 'axios';
import IP_ADDRESS from '../config';
import { useFocusEffect } from '@react-navigation/native';


const ReviewToggle = ({RecipeId,refreshTrigger }) => {

  const [reviews, setReviews] = useState([]);
  const [recipeId,setRecipeId] = useState([]);
 

  useFocusEffect(
    React.useCallback(() => {    
      const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://${IP_ADDRESS}:8000/api/recipeReviews/${RecipeId}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching recipe reviews", error);
      }
    };

    fetchReviews();
  }, [RecipeId])
  );

  

 

  const handleRefresh = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:8000/api/recipeReviews/${RecipeId}`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error fetching recipe reviews", error);
    }
  };





  return (
    <View className="mt-4">
      {reviews.map((review, index) => (
        <ReviewRow key={index}   Comment={review.Comment} Rates={review.Rates} ReviewerID={review.UserID} ReviewId={review._id} 
        />
      ))}
    </View>
  );
};

export default ReviewToggle


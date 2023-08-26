import { View, Text,TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ReviewRow from '../widgets/ReviewRow';
import axios from 'axios';
import IP_ADDRESS from '../config';
import { useFocusEffect } from '@react-navigation/native';
import {
  PlusIcon} from "react-native-heroicons/solid";
  import AddReviewComponent from "../components/AddReviewComponent";


const ReviewToggle = ({RecipeId }) => {

  const [reviews, setReviews] = useState([]);
  const [recipeId,setRecipeId] = useState([]);

  
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:8000/api/recipeReviews/${RecipeId}`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error fetching recipe reviews", error);
    }
  };



  useFocusEffect(
    React.useCallback(() => {    

    fetchReviews();
  }, [RecipeId])
  );



 

  const handleRefresh = () =>{
    fetchReviews();
  }

  const closeAddComment = async () => {
    setShowCreateComment(false);
    fetchReviews();

  };

  const [showCreateComment, setShowCreateComment] = useState(false);
  const toggleAddComment = () => {
    setShowCreateComment(!showCreateComment);
  };




  return (
    <View className="mt-2 w-100 h-100">
            {showCreateComment && (
        <AddReviewComponent RecipeID={RecipeId} onClose={closeAddComment} />
      )}
                      <View className="mb-4">
            <TouchableOpacity
              onPress={toggleAddComment}
              className="w-28 bg-C2B5708 h-8 justify-around px-3 rounded-[5px] items-center flex-row "
            >
              <PlusIcon size={20} color="#fff" />
              <Text className="font-bold text-base text-white">Comment</Text>
            </TouchableOpacity>
          </View>
      {reviews.map((review, index) => (
        <ReviewRow key={index} onClose={handleRefresh}   Comment={review.Comment} Rates={review.Rates} ReviewerID={review.UserID} ReviewId={review._id} 
        />
      ))}


    </View>
  );
};

export default ReviewToggle


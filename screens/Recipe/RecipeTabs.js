import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  HeartIcon,
  MinusCircleIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BookmarkSlashIcon,
  BookmarkIcon,
  StarIcon,
  FireIcon,
  PlayIcon,
  PlusIcon,
} from "react-native-heroicons/solid";
import RecipeToggle from "../../components/RecipeToggle";
import ReviewToggle from "../../components/ReviewToggle";
import axios from "axios"; // Assuming you have axios installed
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode"; // Assuming you have jwt-decode installed
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import UserProfileRow from "../../widgets/UserProfileRow";
import AddReviewComponent from "../../components/AddReviewComponent";

const RatingIcon = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <StarIcon
          key={i}
          style={{ marginRight: 2 }}
          color="#87C17C"
          size={20}
        />
      );
    }
    return stars;
  };

  return <View className="flex-row">{renderStars()}</View>;
};

export default function RecipeTabs() {
  const navigation = useNavigation();
  const {
    params: {
      RecipeID,
      imgUrlSource,
      Title,
      Description,
      formattedDate,
      rates,
      ingredients,
      Calorie,
      username,
      Recipe_View,
      sourceUser,
      CreatorID,
      formattedCookingTime,
      Difficulty_Level,
      Like,
    },
  } = useRoute();
  const [showRecipeToggle, setShowRecipeToggle] = useState(true);
  const [showReviewToggle, setShowReviewToggle] = useState(false);
  const [showDetailBtn, setShowDetailBtn] = useState(false);
  const [showReviewBtn, setShowReviewBtn] = useState(true);
  const [recipeLike, setRecipeLike] = useState(null); // Initialize with null or default value
  const [userId, setUserId] = useState(null); // Initialize with null or default value
  const [loading, setLoading] = useState(true);
  const [savedRecipe, setSavedRecipe] = useState(null); // Initialize with null or default value

  const handleShowReviewToggle = () => {
    setShowRecipeToggle(false);
    setShowReviewToggle(true);
    setShowDetailBtn(false);
    setShowReviewBtn(true);
  };

  useEffect(() => {
    const fetchRecipeLike = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/recipeLikes?RecipeID=${RecipeID}&userId=${userId}`
        );

        if (response.data) {
          // Check if data exists and the message is not "No records found"
          setRecipeLike(response.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching recipe like", error);
      }
    };

    fetchRecipeLike();
  }, [RecipeID]);

  const handleCreateRecipeLike = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      const newRecipeLike = { RecipeID: RecipeID, userId };

      const response = await axios.post(
        `http://${IP_ADDRESS}:8000/api/recipeLikes/create`,
        newRecipeLike
      );

      console.log(response.data); // Log the successful response data

      setRecipeLike(true);
    } catch (error) {
      console.error("RecipeLike Creation Error", error); // Log the error

      Alert.alert(
        "RecipeLike Creation Error",
        "An error occurred while creating the RecipeLike"
      );
    }
  };

  // Delete RecipeLike handler
  const handleDeleteRecipeLike = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      const response = await axios.delete(
        `http://${IP_ADDRESS}:8000/api/recipeLikes/delete/${userId}/${RecipeID}`
      );

      console.log(response.data); // Log the successful response data

      setRecipeLike(null);

      // Update your state or perform other actions after successful deletion
    } catch (error) {
      console.error("RecipeLike Deletion Error", error); // Log the error

      Alert.alert(
        "RecipeLike Deletion Error",
        "An error occurred while deleting the RecipeLike"
      );
    }
  };

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/savedRecipes?RecipeID=${RecipeID}&userId=${userId}`
        );

        if (response.data && response.data.message !== "No records found") {
          setSavedRecipe(response.data);
        }
      } catch (error) {
        console.log("Error fetching saved recipe", error);
      }
    };

    fetchSavedRecipe();
  }, [RecipeID]);

  const handleCreateSavedRecipe = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      const newSavedRecipe = { RecipeID: RecipeID, userId };

      const response = await axios.post(
        `http://${IP_ADDRESS}:8000/api/savedRecipes/create`,
        newSavedRecipe
      );

      console.log(response.data); // Log the successful response data

      setSavedRecipe(true);
    } catch (error) {
      console.error("SavedRecipe Creation Error", error); // Log the error

      Alert.alert(
        "SavedRecipe Creation Error",
        "An error occurred while creating the SavedRecipe"
      );
    }
  };

  const handleDeleteSavedRecipe = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      const response = await axios.delete(
        `http://${IP_ADDRESS}:8000/api/savedRecipes/delete/${userId}/${RecipeID}`
      );

      console.log(response.data); // Log the successful response data

      setSavedRecipe(null);

      // Update your state or perform other actions after successful deletion
    } catch (error) {
      console.error("SavedRecipe Deletion Error", error); // Log the error

      Alert.alert(
        "SavedRecipe Deletion Error",
        "An error occurred while deleting the SavedRecipe"
      );
    }
  };

  const closeAddComment = async () => {
    setShowCreateComment(false);
  };

  const [showCreateComment, setShowCreateComment] = useState(false);
  const toggleAddComment = () => {
    setShowCreateComment(!showCreateComment);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#7caf75" />
      </View>
    );
  }
  return (
    <SafeAreaView className="bg-CF4FFF5 h-full flex-1">
      <ScrollView>
        <View className="relative opacity-60 bg-gray-400">
          <Image source={imgUrlSource} className="w-full h-56 p-4" />
        </View>
        <View className="absolute mt-12 px-4 flex-row justify-between w-full ">
          {savedRecipe ? (
            <TouchableOpacity
              onPress={handleDeleteSavedRecipe}
              className="w-10 h-10 bg-blue-300 items-center justify-center rounded-xl "
            >
              <BookmarkSlashIcon size={26} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleCreateSavedRecipe}
              className="w-10 h-10 bg-blue-300 items-center justify-center rounded-xl "
            >
              <BookmarkIcon size={26} color="#fff" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={navigation.goBack}
            className="w-10 h-10 bg-white items-center justify-center rounded-xl "
          >
            <XMarkIcon size={26} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* MainContainer */}
        <View className="w-[330] mx-auto mt-4 pb-12">
          {/* Detail of the Recipe */}
          <View className="">
            <View className="flex-row items-center justify-between">
              <RatingIcon rating={rates} />
              <View className="flex-row gap-2">
                <View className="flex items-center justify-center px-1 h-5 ml-4 bg-C9BC17C rounded">
                  <Text className="text-white font-bold text-xs">
                    {formattedCookingTime}
                  </Text>
                </View>
                <View className="flex items-center justify-center w-14 h-5 bg-CE38D68 rounded">
                  <Text className="text-white text-xs font-bold ">
                    {Difficulty_Level}
                  </Text>
                </View>
              </View>
              <View>
                {recipeLike ? (
                  <TouchableOpacity
                    onPress={handleDeleteRecipeLike}
                    className="w-10 h-10 bg-red-400 items-center justify-center rounded-xl  "
                  >
                    <MinusCircleIcon size={26} color="#fff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handleCreateRecipeLike}
                    className="w-10 h-10 bg-CEFA8C2 items-center justify-center rounded-xl  "
                  >
                    <HeartIcon size={26} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* RecipeTitle and Description */}
            <View className="mt-1">
              <View>
                <Text className="text-2xl font-bold">{Title}</Text>
              </View>
              <View>
                <Text className="">{Description}</Text>
              </View>
            </View>

            {/* Main ingredient */}
            <View className="flex-row w-full items-center justify-between">
              <View className="flex-row">
                <View className="flex items-center justify-center px-1 h-5 ml-1 bg-CEEDDA0 rounded">
                  <Text className="text-C645623 text-xs">{"tess"}</Text>
                </View>
                <View className="flex items-center justify-center px-1 h-5 ml-1 bg-CDEE8B5 rounded">
                  <Text className="text-C645623 text-xs">{"tess"}</Text>
                </View>
                <View className="flex items-center justify-center px-1 h-5 ml-1 bg-CEEDDA0 rounded">
                  <Text className="text-C645623 text-xs">{"tess"}</Text>
                </View>
              </View>
              <View className="flex-row gap-x-3">
                <View className="flex-row items-center justify-center px-4 h-10 ml-1 bg-CEEDDA0 rounded">
                  <Text className="text-C645623 text-xxs font-bold pt-2">
                    est.
                  </Text>
                  <FireIcon size={20} color="#6D4731" />
                  <Text className="text-C645623 font-bold text-xl">
                    {Calorie} Cal
                  </Text>
                </View>
              </View>
            </View>
            {/* UserDetail */}
            {userId !== CreatorID ? (
              <UserProfileRow
                CreatorID={CreatorID}
                imageSourceUser={sourceUser}
                username={username}
              />
            ) : (
              <></> // This is an empty fragment, effectively rendering nothing
            )}
          </View>

          {showRecipeToggle && <RecipeToggle RecipeID={RecipeID} />}
          {showReviewToggle && <ReviewToggle RecipeId={RecipeID} />}
        </View>
      </ScrollView>

      {showCreateComment && (
        <AddReviewComponent RecipeID={RecipeID} onClose={closeAddComment} />
      )}

      {showReviewBtn && (
        <View className="absolute bottom-4 right-4 ">
          <TouchableOpacity
            onPress={() => {
              setShowRecipeToggle(false);
              setShowReviewToggle(true);
              setShowDetailBtn(true);
              setShowReviewBtn(false);
            }}
            className="w-24 bg-C9BC17C h-8 justify-around px-3 rounded-[5px] items-center flex-row"
          >
            <Text className="font-bold text-base text-white">Review</Text>
            <PlayIcon size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      {showDetailBtn && (
        <View>
          <View className="absolute bottom-4 left-4">
            <TouchableOpacity
              onPress={toggleAddComment}
              className="w-28 bg-C2B5708 h-8 justify-around px-3 rounded-[5px] items-center flex-row "
            >
              <PlusIcon size={20} color="#fff" />
              <Text className="font-bold text-base text-white">Comment</Text>
            </TouchableOpacity>
          </View>

          <View className="absolute bottom-4 right-4">
            <TouchableOpacity
              onPress={() => {
                setShowRecipeToggle(true);
                setShowReviewToggle(false);
                setShowDetailBtn(false);
                setShowReviewBtn(true);
              }}
              className="w-24 bg-C9BC17C h-8 justify-around px-3 rounded-[5px] items-center flex-row"
            >
              <PlayIcon
                size={20}
                color="#fff"
                style={{
                  transform: showReviewToggle ? [{ rotate: "180deg" }] : [],
                }}
              />
              <Text className="font-bold text-base text-white">Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

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

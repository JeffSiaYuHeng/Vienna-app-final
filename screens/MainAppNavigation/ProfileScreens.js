import React, { useEffect, useState, useContext } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Cog6ToothIcon } from "react-native-heroicons/outline";
import { PencilSquareIcon } from "react-native-heroicons/solid";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import IP_ADDRESS from "../../config"; // Adjust the path as needed
import RecipeCard from "../../widgets/RecipeCard";

export default function AccountScreens() {
  const navigation = useNavigation();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [userId, setUserId] = useState("");

  //This Part of Code is used to fetch the userDetail and Check if it Initialize
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserProfile = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/api/users/user/${userId}`
          );

          const user = response.data;
          setUserProfile(user);
          setLoading(false);

          // Check if the user's initialStatus is "Inactive"
          if (user.initialStatus === "Inactive") {
            // Navigate to the "InitializeProfile" screen
            navigation.navigate("InitialUserProfile");
          }
        } catch (error) {
          console.log("Error fetching user profile", error);
        }
      };

      fetchUserProfile();
    }, [navigation])
  );

  useEffect(() => {
    // Fetch recipes from the database
    const refreshPage = navigation.addListener("focus", () => {
      const fetchRecipes = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
          if (!userId) {
            console.error("User ID is null or undefined");
            return;
          }
          const response = await axios.get(
            `http://${IP_ADDRESS}:8000/api/recipes/user/${userId}`
          );
          setRecipes(response.data.recipes);
        } catch (error) {
          console.error("Error fetching recipes", error);
        }
      };
      fetchRecipes();
    });
    return refreshPage;
  }, []);

  // Create variable that only can access by Set
  const [recipeLikes, setRecipeLikes] = useState([]);
  const [followeds, setFollowed] = useState([]);
  const [followers, setFollower] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;

          // Fetch Recipe Likes
          const recipeLikesResponse = await axios.get(
            `http://${IP_ADDRESS}:8000/api/recipeLikes/byUser?userId=${userId}`
          );
          setRecipeLikes(recipeLikesResponse.data);

          // Fetch Followed
          const followedResponse = await axios.get(
            `http://${IP_ADDRESS}:8000/api/userFollow/followed?userId=${userId}`
          );
          if (followedResponse.data) {
            setFollowed(followedResponse.data);
          }

          // Fetch Followers
          const followerResponse = await axios.get(
            `http://${IP_ADDRESS}:8000/api/userFollow/follower?userId=${userId}`
          );
          if (followerResponse.data) {
            setFollower(followerResponse.data);
          }
        } catch (error) {
          console.log("Error fetching data", error);
        }
      };

      fetchData();
    }, [])
  );

  const LikeCount = recipeLikes.length;
  const FollowingCount = followeds.length;
  const FollowersCount = followers.length;

  if (!userProfile && loading) {
    return (
      <View>
        <LinearGradient
          colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
          start={[0, 0]} // Starting point (optional, default is [0,0])
          end={[1, 0]} // Ending point (optional, default is [1,0])
          className="flex p-4 pt-10 justify-between flex-row w-full h-[80]  items-center"
        >
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <PencilSquareIcon size={25} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-white">Profile</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SettingScreen");
            }}
          >
            <Cog6ToothIcon size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>
        <View
          style={styles.container}
          className="items-center justify-center w-100 h-4/5"
        >
          <ActivityIndicator size="large" color="#7caf75" />
        </View>
      </View>
    );
  }
  //  to convert the Image Url to the format that can View by image
  const imageUrl = userProfile.UserImage;
  const cleanedImageUrl = imageUrl ? imageUrl.replace(/\\/g, "/") : ""; // Replace backslashes with forward slashes
  const filename = cleanedImageUrl ? cleanedImageUrl.split("/").pop() : ""; // Add a conditional check
  const source = {
    uri: `http://${IP_ADDRESS}:8000/api/files/${filename}`,
  };
  //If there is no userImage in the file, use a default Image
  if (!imageUrl) {
    imageSource = require("../../assets/UserIcon/User_1.png");
  } else {
    imageSource = source;
  }

  return (
    <SafeAreaView className="flex-1 bg-CF4FFF5 ">
      <LinearGradient
        colors={["#7caf75", "#6db29a"]} // Adjust the gradient colors as needed
        start={[0, 0]} // Starting point (optional, default is [0,0])
        end={[1, 0]} // Ending point (optional, default is [1,0])
        className="flex p-4 pt-10 justify-between flex-row w-full h-[80]  items-center"
      >
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <PencilSquareIcon size={25} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">Profile</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SettingScreen");
          }}
        >
          <Cog6ToothIcon size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      <View className="w-100 p-2 pt-4 ">
        <View
          className="w-100 h-56 rounded-xl bg-white items-center pt-4"
          style={styles.cardContainer}
        >
          <View>
            <Image
              source={imageSource}
              className="w-20 h-20 rounded-full self-center"
            />
            <Text className="pt-2 text-center">{userProfile.username}</Text>
            <Text className="pt-2 text-center">{userProfile.email}</Text>
          </View>

          <View className="flex-row w-full h-20 p-3 pt-6 justify-around">
            <TouchableOpacity
              onPress={() => navigation.navigate("UserFollowers", { userId })}
              className=" border-gray-200 w-20 h-18 justify-center  text-center items-center"
            >
              <Text className="text-gray-600 font-bold">Followers</Text>
              <Text>{!FollowersCount ? "0" : FollowersCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserFollowed", { userId })}
              className="border-l-[1px] border-r-[1px] border-gray-200 w-20 h-18 justify-center  text-center items-center"
            >
              <Text className="text-gray-600 font-bold">Following</Text>
              <Text>{!FollowingCount ? "0" : FollowingCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserLikedRecipe", { userId })}
              className="w-20 h-18 justify-center  text-center items-center"
            >
              <Text className="text-gray-600 font-bold">Likes</Text>
              <Text>{!LikeCount ? "0" : LikeCount}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="w-100 items-center justify-center">
        <Text className="font-bold text-C2B5708 text-lg py-2">
          Your's Recipes
        </Text>
      </View>
      <ScrollView
        className="px-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 70,
          marginBottom: 30,
        }}
      >
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe._id} // This should be category._id
              RecipeID={recipe._id} // This should be category._i
              imgUrl={recipe.image}
              Title={recipe.title || "Unknown Title"}
              date={recipe.createdAt}
              Description={recipe.description || "No description available"}
              rates={5}
              Calorie={recipe.calorie}
              CreatorID={recipe.creatorUser}
              Recipe_View={150}
              Cooking_Time={recipe.cookingTime || "Unknown Time"}
              Difficulty_Level={recipe.difficultyLevel || "Unknown Level"}
              Like={15}
            />
          ))
        ) : (
          <View className="w-100 items-center">
            <Text>No Recipe found.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

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

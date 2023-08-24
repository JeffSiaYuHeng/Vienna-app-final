import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import FollowButton from "./FollowButton";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function UserProfileRow({
  CreatorID,
  imageSourceUser,
  username,
}) {
  const navigation = useNavigation();

  return (
    <View
      className="w-full h-12 bg-white rounded-[5] mt-3 px-4 flex-row items-center "
      style={styles.cardContainer}
    >
      <View className="w-full flex-row items-center justify-between">
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate("OthersProfile", { CreatorID })}
          >
            <Image source={imageSourceUser} className="w-9 h-9 rounded-full" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2 ml-1">
            <Text className="font-medium">{username}</Text>
            {/* <Text className="text-xxs pt-1 text-gray-600">
                      2.5k Followers
                    </Text> */}
          </View>
        </View>
        <FollowButton creatorId={CreatorID} />
      </View>
    </View>
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

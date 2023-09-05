import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function FeatureComponent() {


  const navigation = useNavigation();

  const NavigateToSearchByIngredient = () =>{
    navigation.navigate("SearchByIngredient");
  }


  const NavigateFilteredRecipe = () =>{
    navigation.navigate("FilteredRecipe");
  }




  return (
    <View>
      <ScrollView className="bg-gray-100">
        {/*Head */}
        <View className="flex-row px-5 mt-2 justify-between">
        <View>
      <Text className="text-xl font-extrabold mb-2 text-C2B5708 ">Feature</Text>
    </View>
          {/*Button*/}
          <View>
            {/* <TouchableOpacity className=" w-14 h-6 flex mb-2 items-center justify-center bg-CC5ECBE rounded-full">
              <Text className="text-xs text-C2B5708">View All</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        {/*Content */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 6, paddingHorizontal: 15 }}
        >



          <TouchableOpacity onPress={NavigateToSearchByIngredient} className="bg-CC5ECBE p-3 rounded-xl mr-2">
            <Text className="font-bold text-C2B5708 text-base">Search By Ingredient</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={NavigateFilteredRecipe} className="bg-CC5ECBE p-3 rounded-xl mr-2">
            <Text className="font-bold text-C2B5708 text-base">Filtered Recipe</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

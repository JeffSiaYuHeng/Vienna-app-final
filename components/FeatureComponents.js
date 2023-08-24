import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import TitleComponent from "./TitleComponent";
import CategoryCard from "../widgets/CategoryCard";

export default function FeatureCOmponents() {
  return (
    <View>
      <ScrollView className="bg-gray-100">
        {/*Head */}
        <View className="flex-row px-5 mt-2 justify-between">
          <TitleComponent
            title="Category"
            descript="category that you want"
            featureCategory="category"
          />
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
          <CategoryCard
            imgUrl={require("../assets/category/soup-category.png")}
            title="Soup"
          />
          <CategoryCard
            imgUrl={require("../assets/category/japanese-category.png")}
            title="Japanese"
          />
          <CategoryCard
            imgUrl={require("../assets/category/chinese-category.png")}
            title="Chinese"
          />
          <CategoryCard
            imgUrl={require("../assets/category/vegan-category.png")}
            title="Vegan"
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

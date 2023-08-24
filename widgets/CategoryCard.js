  import { View, TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'

export default function CategoryCard({ imgUrl, title }) {
  return (
    <TouchableOpacity className="relative mr-5">
      <Image source={imgUrl} className="w-28 h-28 rounded-xl" />
      <Text className="absolute text-white font-medium text-center ml-2 mt-20 text-lg">
        {title}
      </Text>
    </TouchableOpacity>
  );
}

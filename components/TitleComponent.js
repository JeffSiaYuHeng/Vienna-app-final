import { View, Text } from 'react-native'
import React from 'react'

export default function TitleComponent({ title }) {
  return (
    <View>
      <Text className="text-xl font-extrabold mb-2 text-C2B5708 ">{title}</Text>
    </View>
  ); 
}
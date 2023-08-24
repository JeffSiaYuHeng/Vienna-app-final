import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MagnifyingGlassIcon, PlusIcon } from "react-native-heroicons/outline";
import { XMarkIcon } from "react-native-heroicons/solid";

const SelectionToggle = ({ value, isSelected, onToggle }) => {


  return (
    <View>
      {isSelected  ? (
        <TouchableOpacity  onPress={() => onToggle(value)}  className="w-full bg-green-100 rounded-[5px] mt-3 px-4 py-3 border-[1px] border-gray-400 flex-row justify-between">
          <Text className="font-bold">{value}</Text>
          <XMarkIcon size={20} color="#000" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
        onPress={() => onToggle(value)}
          className="w-full bg-white rounded-[5px] mt-3 px-4 py-3 border-[1px] border-gray-400 flex-row justify-between"
        >
          <Text className="font-bold">{value}</Text>
          <PlusIcon size={20} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default SelectionToggle;

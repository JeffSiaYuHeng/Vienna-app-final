import React, { useEffect, useState } from "react";
import { View, TextInput, ScrollView, Text, TouchableOpacity, Button } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import IP_ADDRESS from "../config"; // Adjust the path as needed

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        `http://${IP_ADDRESS}:8000/api/ingredients/`
      );
      setIngredients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Use useFocusEffect to fetch data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchIngredients();
    }, [])
  );

  useEffect(() => {
    // Filter ingredients based on user input
    const newData = ingredients.filter((item) =>
      item.Name.toUpperCase().includes(searchText.toUpperCase())
    );
    setFilteredData(newData);
  }, [searchText, ingredients]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View style={{ flex: 1, paddingTop: 12 }}>
      <View
        style={{
          backgroundColor: "gray",
          width: "100%",
          height: 40,
          borderRadius: 10,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{ flex: 1 }}
          placeholder="Type here to search..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <ScrollView>
        {filteredData.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              // Handle the onPress action for the ingredient here
              console.log(`Clicked on ${item.Name}`);
            }}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "lightgray",
              paddingVertical: 8,
              paddingHorizontal: 16,
            }}
          >
            <Text>{item.Name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button
        title="Show All Ingredients"
        onPress={() => setFilteredData(ingredients)} // Reset to show all ingredients
      />
    </View>
  );
};

export default App;

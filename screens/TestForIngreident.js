import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Text } from "react-native";
import axios from "axios";
import IP_ADDRESS from "../config"; // Adjust the path as needed





const data = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
  { id: 4, name: "Durian" },
  { id: 5, name: "Elderberry" },
];

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const Ingredient = async () => {
      try {
        const response = await axios.get(
          `http://${IP_ADDRESS}:8000/api/ingredients/`
        );
        setIngredients(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    Ingredient();
  }, []);



  const handleSearch = (text) => {
    setSearchText(text);
    const newData = data.filter((item) => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
  };

  // const [ingredients, setIngredients] = useState([]);

  return (
    <View className="items-center justify-center w-screen pt-12">
      <View className="bg-gray-200 w-full h-9 rounded-[10px] px-4 flex-row items-center justify-between">
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to search..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <View>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default App;

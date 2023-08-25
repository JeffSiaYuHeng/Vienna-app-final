import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios'; // Import Axios or your preferred HTTP client library
import IP_ADDRESS from '../config'; // Adjust the path as needed

const Test = () => {
    const [ingredients, setIngredients] = useState([]);
  
    useEffect(() => {
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
  
      fetchIngredients();
    }, []);
  console.log(ingredients)
  
  return (
    <View>
      <Text>Test</Text>
      {/* Render the fetched ingredients */}
      <Text>Ingredients:</Text>
      <View>
        {ingredients.map((ingredient) => (
          <Text key={ingredient._id}>{ingredient.Name}</Text>
        ))}
      </View>
    </View>
  );
};

export default Test;

// components/MissingDataList.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { useIngredientContext } from '../context/IngredientContext';
import { Card } from '../src/components/ui/card';
import { Text } from '../src/components/ui/text';
import { VStack } from '../src/components/ui/vstack';

const isMissingData = (ingredient: any): boolean => {
  return (
    !ingredient.name ||
    !ingredient.category ||
    !ingredient.location ||
    !ingredient.confection ||
    (!ingredient.selectedDate && ingredient.estimate == null)
  );
};

export default function MissingDataList() {
  const { ingredients } = useIngredientContext();
  

  const incompleteIngredients = ingredients.filter(isMissingData);

  return (
    <ScrollView>
      <VStack className="p-4">
        <Text className="text-lg font-bold mb-2">Ingredients with Missing Data</Text>

        {incompleteIngredients.length === 0 ? (
          <Text>All ingredients have complete data 🎉</Text>
        ) : (
          incompleteIngredients.map((item, index) => (
            <Card key={index} className="mb-4 p-4 shadow-md rounded-lg bg-white">
              <Text className="font-bold">{item.name || 'Unnamed Ingredient'}</Text>
              <Text>Category: {item.category || 'Missing'}</Text>
              <Text>Location: {item.location || 'Missing'}</Text>
              <Text>Confection: {item.confection || 'Missing'}</Text>
              <Text>
                Expiry: {item.selectedDate
                  ? item.selectedDate.toDateString()
                  : item.estimate
                    ? `${item.estimate} days from now`
                    : 'Missing'}
              </Text>
            </Card>
          ))
        )}
      </VStack>
    </ScrollView>
  );
}

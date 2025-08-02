// components/IngredientsByLocation.tsx
import React from 'react';
import {ScrollView} from 'react-native';
import {useIngredientContext} from '../context/IngredientContext';
import {Card} from '../src/components/ui/card';
import {Text} from '../src/components/ui/text';
import {VStack} from '../src/components/ui/vstack';

// Helper: Group ingredients by their location
const groupByLocation = (ingredients: any[]) => {
  return ingredients.reduce((groups: Record<string, any[]>, item) => {
    const location = item.location || 'Unknown';
    if (!groups[location]) {
      groups[location] = [];
    }
    groups[location].push(item);
    return groups;
  }, {});
};

export default function IngredientsByLocation() {
  const {ingredients} = useIngredientContext();

  const grouped = groupByLocation(ingredients);

  return (
    <ScrollView>
      <VStack className="p-4 space-y-6">
        {Object.entries(grouped).map(([location, items], index) => (
          <VStack key={index}>
            <Text className="text-xl font-bold mb-2">{location}</Text>
            {items.map((item, i) => (
              <Card key={i} className="mb-2 p-4 bg-white rounded-lg shadow">
                <Text className="font-bold">{item.name}</Text>
                <Text>Category: {item.category}</Text>
                <Text>Confection: {item.confection}</Text>
                <Text>
                  Expiry:{' '}
                  {item.selectedDate
                    ? item.selectedDate.toDateString()
                    : item.estimate
                      ? `${item.estimate} days from now`
                      : 'Missing'}
                </Text>
              </Card>
            ))}
          </VStack>
        ))}
      </VStack>
    </ScrollView>
  );
}

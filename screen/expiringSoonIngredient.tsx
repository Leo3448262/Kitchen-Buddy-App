// components/ExpiringSoonGrouped.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { useIngredientContext } from '../context/IngredientContext';
import { Card } from '../src/components/ui/card';
import { Text } from '../src/components/ui/text';
import { VStack } from '../src/components/ui/vstack';

// Helper to calculate days left until expiry
const getDaysLeft = (ingredient: any): number | null => {
  if (ingredient.selectedDate) {
    const today = new Date();
    const diff = new Date(ingredient.selectedDate).getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24)); // convert ms to days
  }
  if (ingredient.estimate != null) {
    return ingredient.estimate; // already days
  }
  return null; // missing expiry info
};

// Group by expiry time
const groupByExpiry = (ingredients: any[]) => {
  const groups: Record<string, any[]> = {};

  ingredients.forEach((item) => {
    const days = getDaysLeft(item);
    let label = "";

    if (days === null) {
      label = "Unknown";
    } else if (days <= 0) {
      label = "Expired";
    } else if (days === 1) {
      label = "In 1 day";
    } else if (days <= 3) {
      label = "In 1–3 days";
    } else if (days <= 7) {
      label = "In 4–7 days";
    } else {
      label = `In ${days} days`;
    }

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(item);
  });

  return groups;
};

export default function ExpiringSoonGrouped() {
  const {ingredients} = useIngredientContext();

  const soonExpiring = ingredients.filter((item) => {
    const days = getDaysLeft(item);
    return days === null || days <= 10;
  });

  const grouped = groupByExpiry(soonExpiring);

  return (
    <ScrollView>
      <VStack className="p-4 space-y-6">
        <Text className="text-lg font-bold">Ingredients Expiring Soon</Text>

        {Object.entries(grouped).map(([label, items], index) => (
          <VStack key={index}>
            <Text className="text-xl font-semibold mb-2">{label}</Text>
            {items.map((item, i) => (
              <Card key={i} className="mb-2 p-4 bg-white rounded-lg shadow">
                <Text className="font-bold">{item.name}</Text>
                <Text>Category: {item.category}</Text>
                <Text>Location: {item.location}</Text>
                <Text>Confection: {item.confection}</Text>
                <Text>
                  Expiry: {item.selectedDate
                    ? new Date(item.selectedDate).toDateString()
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

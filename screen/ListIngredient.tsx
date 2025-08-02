import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {useIngredientContext} from '../context/IngredientContext';
import {Button} from '../src/components/ui/button';
import {Card} from '../src/components/ui/card'; // adjust based on your setup
import {Text} from '../src/components/ui/text';
import {VStack} from '../src/components/ui/vstack';

export default function IngredientListScreen() {
  const {ingredients, setSelectedIngredient} = useIngredientContext();

  const navigation = useNavigation();
  const isRipenessExpired = (
    ripeness: string | undefined,
    updatedAt: string | Date | null | undefined,
  ): boolean => {
    if (ripeness === 'ripe' && updatedAt) {
      const updatedDate = new Date(updatedAt);
      const now = new Date();
      const diffInMs = now.getTime() - updatedDate.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return diffInDays > 7;
    }
    return false;
  };

  return (
    <ScrollView>
      <VStack className="p-4">
        {ingredients.map((item, index) => (
          <Card className="mb-4 p-4 shadow-md rounded-lg bg-white">
            <Button
              key={index}
              className="ml-auto"
              onPress={() => {
                setSelectedIngredient(item);
                navigation.navigate('EditIngredient'); // make sure this route is defined
              }}
            ></Button>
            <Text className="font-bold">{item.name}</Text>
            {item.brand ? <Text>Brand: {item.brand}</Text> : ''}
            <Text>Category: {item.category}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Confection: {item.confection}</Text>
            {item.ripeness ? (
              <Text
                className={
                  isRipenessExpired(item.ripeness, item.ripenessUpdatedAt)
                    ? 'text-red-600'
                    : 'text-green-600'
                }
              >
                Ripeness: {item.ripeness}
                {isRipenessExpired(item.ripeness, item.ripenessUpdatedAt) &&
                  ' (Expired)'}
              </Text>
            ) : null}

            <Text>
              Expiry:{' '}
              {item.selectedDate
                ? new Date(item.selectedDate).toDateString()
                : `${item.estimate} days from now`}
            </Text>
          </Card>
        ))}
      </VStack>
    </ScrollView>
  );
}

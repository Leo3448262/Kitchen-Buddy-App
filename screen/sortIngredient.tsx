import {ScrollView} from 'react-native';
import {useIngredientContext} from '../context/IngredientContext';
import {Card} from '../src/components/ui/card'; // adjust based on your setup
import {Text} from '../src/components/ui/text';
import {VStack} from '../src/components/ui/vstack';

export default function SortIngredient() {
  const {ingredients} = useIngredientContext();
  const sortedIngredients = [...ingredients].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  console.log(ingredients.map(i => i.createdAt));

  return (
    <ScrollView>
      <VStack className="p-4">
        {sortedIngredients.map(item => (
          <Card className="mb-4 p-4 shadow-md rounded-lg bg-white">
            <Text className="font-bold">{item.name}</Text>
            {item.brand ? <Text>Brand: {item.brand}</Text> : ''}
            <Text>Category: {item.category}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Confection: {item.confection}</Text>
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

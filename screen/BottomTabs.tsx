import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AddIngredient from './AddIngredient';
import BarcodeScannerScreen from './BarcodeScannerScreen';
import EditIngredient from './editIngredient';
import { default as ExpiringSoon } from './expiringSoonIngredient';
import ListIngredient from './ListIngredient';
import MissingDataList from './missingData';
import SortIngredient from './sortIngredient';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AddIngredient"
        component={AddIngredient}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="List Ingredient"
        component={ListIngredient}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fridge-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Sort Ingredient"
        component={SortIngredient}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="filter-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Expiring Soon"
        component={ExpiringSoon}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock-time-two-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Missing Data"
        component={MissingDataList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock-time-two-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="BarcodeScannerScreen"
        component={BarcodeScannerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock-time-two-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator(){
  return (
      <Stack.Navigator>
  

      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="EditIngredient" component={EditIngredient} />
      
    </Stack.Navigator>
  );
}



// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ingredient} from '../context/IngredientContext';

const STORAGE_KEY = 'ingredients_data';

export const saveIngredients = async (
  ingredients: Ingredient[],
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(ingredients);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving ingredients:', e);
  }
};

export const loadIngredients = async (): Promise<Ingredient[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading ingredients:', e);
    return [];
  }
};

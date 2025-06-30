import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { loadIngredients, saveIngredients } from '../utils/storage';
export const OPEN_SHELF_LIFE_DAYS: Record<string, number> = {
  dairy: 3,
  liquid: 5,
  canned: 2,
  default: 3,
};

/* 2.  Helper that shortens expiry when an item is marked opened */
function adjustExpiryForOpening(ing: Ingredient): Ingredient {
  if (!ing.isOpened || !ing.openedAt) return ing;

  const days =
    OPEN_SHELF_LIFE_DAYS[ing.category] ?? OPEN_SHELF_LIFE_DAYS.default;

  const newExpiry = new Date(ing.openedAt);
  newExpiry.setDate(newExpiry.getDate() + days);

  if (!ing.selectedDate || newExpiry < new Date(ing.selectedDate)) {
    return { ...ing, selectedDate: newExpiry, estimate: '' };
  }
  return ing;
}
type Ingredient = {
  id: string;
  name: string;
  category: string;
  location: string;
  confection: string;
  estimate: string | null;
  selectedDate: Date | null;
  createdAt: string;
  ripeness?: string;
  ripenessUpdatedAt?: Date | null;
  isFrozen?: boolean;
  isOpened?: boolean;
  openedAt?: Date | null;
  

};

type IngredientContextType = {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Omit<Ingredient, 'id'>) => void;
  updateIngredient: (updated: Ingredient) => void;
  selectedIngredient: Ingredient | null;
  setSelectedIngredient: (ingredient: Ingredient | null) => void;
};


const IngredientContext = createContext<IngredientContextType | undefined>(undefined);

const IngredientProvider = ({ children }: { children: ReactNode }) => {
 const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);

  /* Load once at mount */
  useEffect(() => {
    (async () => {
      const stored = await loadIngredients();
      setIngredients(stored);
    })();
  }, []);

  /* Persist on every change */
  useEffect(() => {
    saveIngredients(ingredients);
  }, [ingredients]);

  /* ---------- CRUD with “opened” logic baked in ---------- */
  const addIngredient = (ingredient: Omit<Ingredient, 'id' | 'createdAt'>) => {
    const generateId = () =>
      Date.now().toString(36) + Math.random().toString(36).substring(2);

    const base = {
      ...ingredient,
      id: generateId(),
      createdAt: new Date().toISOString(),
    } as Ingredient;

    const adjusted = adjustExpiryForOpening(base);
    setIngredients((prev) => [...prev, adjusted]);
  };

  const updateIngredient = (updated: Ingredient) => {
    const adjusted = adjustExpiryForOpening(updated);
    setIngredients((prev) =>
      prev.map((item) => (item.id === adjusted.id ? adjusted : item))
    );
  };

  /*--------------------------------------------------------*/
  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        addIngredient,
        updateIngredient,
        selectedIngredient,
        setSelectedIngredient,
      }}
    >
      {children}
    </IngredientContext.Provider>
  );
};

export const useIngredientContext = () => {
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error('useIngredientContext must be used within IngredientProvider');
  }
  return context;
};
export { Ingredient, IngredientProvider };


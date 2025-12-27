import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category, CategoryType } from '../types/category';

const STORAGE_KEY = 'categories';

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Food', type: 'expense' },
  { id: '2', name: 'Transport', type: 'expense' },
  { id: '3', name: 'Shopping', type: 'expense' },
  { id: '4', name: 'Bills', type: 'expense' },
  { id: '5', name: 'Salary', type: 'income' },
  { id: '6', name: 'Bonus', type: 'income' },
];

export const getCategories = async (type: CategoryType) => {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  const categories: Category[] = stored
    ? JSON.parse(stored)
    : DEFAULT_CATEGORIES;

  if (!stored) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }

  return categories.filter(c => c.type === type);
};

export const addCategory = async (name: string, type: CategoryType) => {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  const categories: Category[] = stored ? JSON.parse(stored) : [];

  categories.push({
    id: Date.now().toString(),
    name,
    type,
  });

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

export const deleteCategory = async (id: string) => {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  if (!stored) return;

  const categories: Category[] = JSON.parse(stored);
  const updated = categories.filter(c => c.id !== id);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

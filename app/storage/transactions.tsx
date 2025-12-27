import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "../types/transaction";

const STORAGE_KEY = 'transactions';


export const getTransactions=async(): Promise<Transaction[] | any>=>{
    try {
        const data=await AsyncStorage.getItem(STORAGE_KEY);
        return data? JSON.parse(data):[];
    } catch (error) {
        console.log("Failed to load transactions",error);
        return [];
    }
}

const saveTransactions=async (transactions:Transaction[])=>{
      try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Failed to save transactions', error);
  }
}

export const addTransaction = async (transaction: Transaction) => {
  const transactions = await getTransactions();
  transactions.push(transaction);
  await saveTransactions(transactions);
};

export const deleteTransaction = async (id: string) => {
  const transactions = await getTransactions();
  const updated = transactions.filter((tx: { id: string; }) => tx.id !== id);
  await saveTransactions(updated);
};
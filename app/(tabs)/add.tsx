import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { addTransaction, updateTransaction } from "../storage/transactions";
import { TransactionType } from "../types/transaction";
import { getCategories } from "../storage/categories";
import { Category } from "../types/category";
import { useLocalSearchParams } from "expo-router";
import { getTransactions } from "../storage/transactions";

export default function AddTransactionScreen() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const { editId } = useLocalSearchParams();

  useEffect(() => {
    if (!editId) return;

    getTransactions().then((data) => {
      const tx = data.find((t: { id: string | string[] }) => t.id === editId);
      if (!tx) return;

      setAmount(tx.amount.toString());
      setType(tx.type);
      setCategory(tx.category);
    });
  }, [editId]);

  useEffect(() => {
    getCategories(type).then(setCategories);
  }, [type]);

  const handleSave = async () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert("Invalid amount", "Please enter a valid number");
      return;
    }

    if (editId) {
      await updateTransaction({
        id: editId as string,
        amount: Number(amount),
        type,
        category,
        date: new Date().toISOString(),
      });
    } else {
      await addTransaction({
        id: Date.now().toString(),
        amount: Number(amount),
        type,
        category,
        date: new Date().toISOString(),
      });
    }

    setAmount("");
    setCategory("Food");
    setType("expense");

    if (editId) {
      Alert.alert("Saved", "Transaction updated successfully");
    } else {
      Alert.alert("Saved", "Transaction added successfully");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>

      {/* Amount */}
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      {/* Type Selector */}
      <View style={styles.row}>
        <Pressable
          style={[
            styles.typeButton,
            type === "expense" && styles.activeExpense,
          ]}
          onPress={() => setType("expense")}
        >
          <Text style={styles.typeText}>Expense</Text>
        </Pressable>

        <Pressable
          style={[styles.typeButton, type === "income" && styles.activeIncome]}
          onPress={() => setType("income")}
        >
          <Text style={styles.typeText}>Income</Text>
        </Pressable>
      </View>

      {/* Category Picker */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            style={[
              styles.categoryButton,
              category === cat.name && styles.activeCategory,
            ]}
            onPress={() => setCategory(cat.name)}
          >
            <Text>{cat.name}</Text>
          </Pressable>
        ))}
      </View>

      {/* Save */}
      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>{editId ? "Update" : "Save"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    backgroundColor: "#f2f2f2",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    borderRadius: 6,
  },
  activeExpense: {
    backgroundColor: "#ffe5e5",
  },
  activeIncome: {
    backgroundColor: "#e5ffe5",
  },
  typeText: {
    fontWeight: "600",
  },
  label: {
    marginBottom: 5,
    fontWeight: "600",
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  activeCategory: {
    backgroundColor: "#ddd",
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

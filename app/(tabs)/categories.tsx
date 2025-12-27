import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { Category, CategoryType } from "../types/category";
import {
  getCategories,
  addCategory,
  deleteCategory,
} from "../storage/categories";

export default function CategoryScreen() {
  const [type, setType] = useState<CategoryType>("expense");
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");

  const loadCategories = async () => {
    const data = await getCategories(type);
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, [type]);

  const handleAdd = async () => {
    if (!name.trim()) return;

    await addCategory(name.trim(), type);
    setName("");
    loadCategories();
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete category",
      "This will not delete existing transactions.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteCategory(id);
            loadCategories();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Categories</Text>

      {/* Type Toggle */}
      <View style={styles.toggleRow}>
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

      {/* Add Category */}
      <View style={styles.addRow}>
        <TextInput
          placeholder="New category name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Pressable style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addText}>Add</Text>
        </Pressable>
      </View>

      {/* Category List */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No categories</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Pressable onPress={() => handleDelete(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  toggleBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#ddd",
    marginRight: 10,
  },
  active: {
    backgroundColor: "#bbb",
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
  addRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  addBtn: {
    backgroundColor: "#000",
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center",
  },
  addText: {
    color: "#fff",
    fontWeight: "700",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  typeText: {
    fontWeight: "600",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  delete: {
    color: "red",
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "#666",
  },
});

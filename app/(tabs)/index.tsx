import { View, Text, StyleSheet, FlatList } from "react-native";
import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { getTransactions } from "../storage/transactions";
import { Transaction } from "../types/transaction";
import { Alert, Pressable } from "react-native";
import { deleteTransaction } from "../storage/transactions";
import SummaryCard from "../components/SummaryCard";
import TransactionItem from "../components/TransactionItem";

export default function HomeScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data.reverse()); // latest first
  };

  const currentMonthTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    const now = new Date();
    return (
      txDate.getMonth() === now.getMonth() &&
      txDate.getFullYear() === now.getFullYear()
    );
  });

  const totalIncome = currentMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = currentMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteTransaction(id);
            loadTransactions();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome Partha 👋</Text>
        <Text style={styles.subtext}>{new Date().toDateString()}</Text>
      </View>

      {/* Monthly Summary */}
      <Text style={styles.sectionTitle}>This month</Text>
      <View style={styles.summary}>
        <SummaryCard label="Income" value={totalIncome} color="green" />
        <SummaryCard label="Expense" value={totalExpense} color="red" />
        <SummaryCard label="Balance" value={balance} />
      </View>

      {/* Transactions */}
      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Recent transactions</Text>
        <Text style={styles.count}>{transactions.length} total</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={transactions.length === 0 && { flex: 1 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No transactions yet</Text>
            <Text style={styles.emptyText}>
              Add your first income or expense to get started.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TransactionItem
            item={item}
            onLongPress={() => handleDelete(item.id)}
            onPress={() =>
              router.push({
                pathname: "/add",
                params: { editId: item.id },
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#f2f2f2",
  },

  header: {
    marginBottom: 20,
  },
  welcome: {
    fontSize: 26,
    fontWeight: "800",
  },
  subtext: {
    marginTop: 4,
    color: "#666",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 10,
  },

  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  count: {
    fontSize: 12,
    color: "#777",
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    lineHeight: 20,
  },
});

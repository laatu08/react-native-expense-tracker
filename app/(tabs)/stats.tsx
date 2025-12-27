import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { LineChart, PieChart, BarChart } from "react-native-chart-kit";

import { getTransactions } from "../storage/transactions";
import { Transaction } from "../types/transaction";
import {
  filterByRange,
  categoryTotals,
  incomeCategoryTotals,
  incomeExpenseTotals,
  spendingTrend,
  Range,
} from "../utils/analytics";

const screenWidth = Dimensions.get("window").width;

export default function StatsScreen() {
  const [range, setRange] = useState<Range>("month");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoryType, setCategoryType] = useState<"expense" | "income">(
    "expense"
  );

  useFocusEffect(() => {
    getTransactions().then(setTransactions);
  });

  const filtered = filterByRange(transactions, range);
  const categories = categoryTotals(filtered);
  const { income, expense } = incomeExpenseTotals(filtered);

  const incomeCategories = incomeCategoryTotals(filtered);
  const trend = spendingTrend(filtered);
  const categoryData =
    categoryType === "expense" ? categories : incomeCategories;

  const getColorForCategory = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return COLORS[Math.abs(hash) % COLORS.length];
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Statistics</Text>

      {/* Range Selector */}
      <View style={styles.rangeRow}>
        {(["week", "month", "year"] as Range[]).map((r) => (
          <Pressable
            key={r}
            onPress={() => setRange(r)}
            style={[styles.rangeBtn, range === r && styles.active]}
          >
            <Text>{r.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>

      {/* Income vs Expense */}
      <Text style={styles.section}>Income vs Expense</Text>
      <BarChart
        width={screenWidth - 30}
        height={220}
        data={{
          labels: ["Income", "Expense"],
          datasets: [{ data: [income, expense] }],
        }}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
      />

      {/* Category Toggle */}
      <View style={styles.categoryToggle}>
        <Pressable
          style={[
            styles.categoryBtn,
            categoryType === "expense" && styles.categoryActiveExpense,
          ]}
          onPress={() => setCategoryType("expense")}
        >
          <Text>Expense</Text>
        </Pressable>

        <Pressable
          style={[
            styles.categoryBtn,
            categoryType === "income" && styles.categoryActiveIncome,
          ]}
          onPress={() => setCategoryType("income")}
        >
          <Text>Income</Text>
        </Pressable>
      </View>

      {/* Category Breakdown */}
      {categoryData.length > 0 && (
        <>
          <Text style={styles.section}>
            {categoryType === "expense"
              ? "Expense by Category"
              : "Income by Category"}
          </Text>

          <PieChart
            width={screenWidth - 30}
            height={220}
            data={categoryData.map((c, i) => ({
              name: c.name,
              population: c.value,
              color: getColorForCategory(c.name),
              legendFontColor: "#333",
              legendFontSize: 12,
            }))}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="10"
          />
        </>
      )}

      {/* Spending Trend */}
      {/* {trend.values.length > 0 && (
        <>
          <Text style={styles.section}>Spending Trend</Text>
          <LineChart
            width={screenWidth - 30}
            height={240}
            data={{
              labels: trend.labels,
              datasets: [{ data: trend.values }],
            }}
            chartConfig={{
              ...chartConfig,
              color: () => "#e53935",
            }}
            bezier
          />
        </>
      )} */}
    </ScrollView>
  );
}

const COLORS = ["#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#9c27b0"];

const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: () => "#000",
  labelColor: () => "#555",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 35,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
  },
  rangeRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  rangeBtn: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  active: {
    backgroundColor: "#bbb",
  },
  section: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 10,
  },
  categoryToggle: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop:20
  },
  categoryBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#ddd",
    marginRight: 8,
  },
  categoryActiveExpense: {
    backgroundColor: "#ffcdd2",
  },
  categoryActiveIncome: {
    backgroundColor: "#c8e6c9",
  },
});

import { View, Text, StyleSheet, Pressable } from "react-native";
import { Transaction } from "../types/transaction";

type Props = {
  item: Transaction;
  onLongPress: () => void;
  onPress: () => void;
};


export default function TransactionItem({ item, onLongPress, onPress }: Props) {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.item}>
        <View>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
        </View>
        <Text
          style={[
            styles.amount,
            item.type === "income" ? styles.income : styles.expense,
          ]}
        >
          {item.type === "income" ? "+" : "-"}₹{item.amount}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  category: {
    fontWeight: "600",
    fontSize: 15,
  },
  date: {
    color: "#888",
    fontSize: 12,
  },

  amount: {
    fontWeight: "bold",
  },
  income: {
    color: "green",
  },
  expense: {
    color: "red",
  },
});

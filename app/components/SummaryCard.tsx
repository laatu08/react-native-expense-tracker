import { View, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: number;
  color?: string;
};

export default function SummaryCard({ label, value, color }: Props) {
  return (
    <View style={styles.card}>
      <Text>{label}</Text>
      <Text style={[styles.value, color && { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    marginHorizontal: 6,
    borderRadius: 12,
    alignItems: 'center',

    // subtle elevation
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  value: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 18,
  },
});


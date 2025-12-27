export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;              // unique id
  amount: number;          // money value
  type: TransactionType;   // income or expense
  category: string;        // Food, Travel, etc.
  date: string;            // ISO string
};

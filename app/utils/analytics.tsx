import { Transaction } from '../types/transaction';

export type Range = 'week' | 'month' | 'year';

export const filterByRange = (
  transactions: Transaction[],
  range: Range
) => {
  const now = new Date();

  return transactions.filter(tx => {
    const d = new Date(tx.date);

    if (range === 'week') {
      const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }

    if (range === 'month') {
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    }

    if (range === 'year') {
      return d.getFullYear() === now.getFullYear();
    }

    return false;
  });
};

export const categoryTotals = (transactions: Transaction[]) => {
  const map: Record<string, number> = {};

  transactions.forEach(tx => {
    if (tx.type === 'expense') {
      map[tx.category] = (map[tx.category] || 0) + tx.amount;
    }
  });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
};

export const incomeExpenseTotals = (transactions: Transaction[]) => {
  let income = 0;
  let expense = 0;

  transactions.forEach(tx => {
    if (tx.type === 'income') income += tx.amount;
    else expense += tx.amount;
  });

  return { income, expense };
};


// Income by category
export const incomeCategoryTotals = (transactions: Transaction[]) => {
  const map: Record<string, number> = {};

  transactions.forEach(tx => {
    if (tx.type === 'income') {
      map[tx.category] = (map[tx.category] || 0) + tx.amount;
    }
  });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
};


export const spendingTrend = (transactions: Transaction[]) => {
  const map: Record<string, number> = {};

  transactions.forEach(tx => {
    if (tx.type === 'expense') {
      const day = new Date(tx.date).toLocaleDateString();
      map[day] = (map[day] || 0) + tx.amount;
    }
  });

  const labels = Object.keys(map);
  const values = Object.values(map);

  return { labels, values };
};

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id?: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
}

export const CATEGORIES = [
  'Housing',
  'Food',
  'Transport',
  'Utilities',
  'Entertainment',
  'Health',
  'Income',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];

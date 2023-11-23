export enum TransactionType {
  Unknown = 0,
  Income = 1,
  Expense = 2,
}

export const TransactionTypeDisplayNames = [
  { key: TransactionType.Unknown, value: "Unknown" },
  { key: TransactionType.Income, value: "Income" },
  { key: TransactionType.Expense, value: "Expense" },
];

export interface ITransactionForm {
  categoryId: number,
  amount: number,
  notes?: string,
  transactionDate: Date
}
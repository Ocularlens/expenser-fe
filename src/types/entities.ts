import { TransactionType } from "../enum/transactionType";

export interface Transaction {
  transactionId?: number;
  amount: number;
  notes: string;
  transactionDate: Date;
  category : Category
}

export interface Category {
  categoryId?: number;
  name: string;
  type: TransactionType;
}

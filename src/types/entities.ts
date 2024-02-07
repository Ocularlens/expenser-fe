import { TransactionType } from "../enum/transactionType";

export interface Transaction {
  id?: number;
  amount: number;
  notes: string;
  transactionDate: Date;
  category : Category
}

export interface Category {
  id?: number;
  name: string;
  type: TransactionType;
}

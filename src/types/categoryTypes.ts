import { TransactionType } from "../enum/transactionType";

export interface ICategoryForm {
  categoryName: string;
  type: TransactionType;
}

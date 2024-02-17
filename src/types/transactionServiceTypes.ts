import { Transaction } from "./entities";
import { ITransactionForm } from "./transactionTypes";

export interface GroupByDateResp {
  [date: string]: Transaction[];
}

export interface NewTransaction extends ITransactionForm {}

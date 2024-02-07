import { Transaction } from "./entities";

export interface GroupByDateResp {
  [date: string]: Transaction[],
}
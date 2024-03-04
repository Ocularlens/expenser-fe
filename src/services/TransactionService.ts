import { Transaction } from "../types/entities";
import {
  GroupByDateResp,
  NewTransaction,
} from "../types/transactionServiceTypes";
import Client from "../utils/Client";

const SERVICE_URL = import.meta.env.VITE_BACKEND_URL + "transaction";

export async function groupByDate(month: number): Promise<GroupByDateResp> {
  const result = await Client.get(`${SERVICE_URL}/groupByDate`, {
    params: {
      month,
    },
  });
  return result.data;
}

export async function addTransaction(data: NewTransaction): Promise<boolean> {
  await Client.post(SERVICE_URL, data);
  return true;
}

export async function updateTransaction(
  data: NewTransaction,
  transactionId: number
): Promise<boolean> {
  await Client.put(`${SERVICE_URL}/${transactionId}`, data);
  return true;
}

export async function deleteTransaction(
  transactionId: number
): Promise<boolean> {
  await Client.delete(`${SERVICE_URL}/${transactionId}`);
  return true;
}

export async function retrieveTransaction(
  transactionId: number
): Promise<Transaction> {
  const result = await Client.get(`${SERVICE_URL}/${transactionId}`);
  return result.data;
}

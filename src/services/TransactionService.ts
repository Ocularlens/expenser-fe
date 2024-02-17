import axios, { AxiosError } from "axios";
import { Transaction } from "../types/entities";
import {
  GroupByDateResp,
  NewTransaction,
} from "../types/transactionServiceTypes";

const SERVICE_URL = import.meta.env.VITE_BACKEND_URL + "transaction";

export async function groupByDate(
  month: number,
  token: string
): Promise<GroupByDateResp> {
  try {
    const result = await axios.get(`${SERVICE_URL}/groupByDate`, {
      params: {
        month,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }

    throw error;
  }
}

export async function addTransaction(
  data: NewTransaction,
  token: string
): Promise<boolean> {
  try {
    await axios.post(SERVICE_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }

    throw error;
  }
}

export async function updateTransaction(
  data: NewTransaction,
  token: string,
  transactionId: number
): Promise<boolean> {
  try {
    await axios.put(`${SERVICE_URL}/${transactionId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }

    throw error;
  }
}

export async function deleteTransaction(
  token: string,
  transactionId: number
): Promise<boolean> {
  try {
    await axios.delete(`${SERVICE_URL}/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }

    throw error;
  }
}

export async function retrieveTransaction(
  token: string,
  transactionId: number
): Promise<Transaction> {
  try {
    const result = await axios.get(`${SERVICE_URL}/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }

    throw error;
  }
}

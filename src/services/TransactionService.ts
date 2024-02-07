import axios, { AxiosError } from "axios";
import { GroupByDateResp } from "../types/transactionServiceTypes";

const SERVICE_URL = import.meta.env.VITE_BACKEND_URL + "transaction";


export async function groupByDate(
  month: number,
  token: string
): Promise<GroupByDateResp> {
  return axios
    .get(`${SERVICE_URL}/groupByDate`, {
      params: {
        month,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }

      throw error;
    });
}

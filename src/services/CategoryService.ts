import axios, { AxiosError } from "axios";
import { Category } from "../types/entities";

const SERVICE_URL = import.meta.env.VITE_BACKEND_URL + "category";

export async function retrieveCategories(token: string): Promise<Category[]> {
  return axios
    .get(`${SERVICE_URL}`, {
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

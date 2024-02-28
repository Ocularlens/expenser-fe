import axios, { AxiosError } from "axios";
import { NewCategory } from "../types/categoryServiceTypes";
import { Category } from "../types/entities";

const SERVICE_URL = import.meta.env.VITE_BACKEND_URL + "category";

export async function retrieveCategories(
  token: string,
  createdByUser: boolean = false
): Promise<Category[]> {
  return axios
    .get(`${SERVICE_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        createdByUser,
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

export async function addCategory(
  data: NewCategory,
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

export async function updateCategory(
  data: NewCategory,
  categoryId: number,
  token: string
): Promise<boolean> {
  try {
    await axios.put(`${SERVICE_URL}/${categoryId}`, data, {
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

export async function retrieveCategory(
  categoryId: number,
  token: string
): Promise<Category> {
  try {
    const result = await axios.put(`${SERVICE_URL}/${categoryId}`, {
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

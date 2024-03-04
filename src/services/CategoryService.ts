import { NewCategory } from "../types/categoryServiceTypes";
import { Category } from "../types/entities";
import Client from "../utils/Client";

const SERVICE_URL = import.meta.env.VITE_BACKEND_URL + "category";

export async function retrieveCategories(
  createdByUser: boolean = false
): Promise<Category[]> {
  const result = await Client.get(`${SERVICE_URL}`, {
    params: {
      createdByUser,
    },
  });

  return result.data;
}

export async function addCategory(data: NewCategory): Promise<boolean> {
  await Client.post(SERVICE_URL, data);
  return true;
}

export async function updateCategory(
  data: NewCategory,
  categoryId: number
): Promise<boolean> {
  await Client.put(`${SERVICE_URL}/${categoryId}`, data);
  return true;
}

export async function retrieveCategory(categoryId: number): Promise<Category> {
  const result = await Client.get(`${SERVICE_URL}/${categoryId}`);
  return result.data;
}

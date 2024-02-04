import axios, { AxiosError } from "axios";
import { Login, Register } from "../types/authServiceTypes";

const SERVICE_URL = import.meta.env.VITE_BACKEND_URL + "auth";

export async function registerUser(data: Register): Promise<true | string> {
  return await axios
    .post(`${SERVICE_URL}/register`, data)
    .then(() => {
      return true;
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }

      throw error;
    });
}

export async function loginUser(data: Login): Promise<string> {
  return await axios
    .post(`${SERVICE_URL}/login`, data)
    .then((result) => {
      return result.data.token;
    })
    .catch((error) => {
      throw error;
    });
}

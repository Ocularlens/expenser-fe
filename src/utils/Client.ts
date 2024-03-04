import axios, { AxiosError } from "axios";
import AuthError from "../errors/AuthError";
import ServerError from "../errors/ServerError";

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401)
      return Promise.reject(new AuthError(error.message));
    
    return Promise.reject(new ServerError(error.message));
  }
);

export default axios;

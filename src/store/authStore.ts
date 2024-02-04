import { create } from "zustand";

interface AuthState {
  token: string;
  isLoggedIn: boolean;
  setIsLoggedIn(by: boolean): void;
  setToken(by: string): void;
}

const useAuthStore = create<AuthState>()((set) => ({
  token: "",
  isLoggedIn: false,
  setIsLoggedIn: (value) => set(() => ({ isLoggedIn: value })),
  setToken: (value) => set(() => ({ token: value })),
}));


export default useAuthStore;
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  token: string;
  isLoggedIn: boolean;
  setIsLoggedIn(by: boolean): void;
  setToken(by: string): void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: "",
      isLoggedIn: false,
      setIsLoggedIn: (value) => set(() => ({ isLoggedIn: value })),
      setToken: (value) => set(() => ({ token: value })),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        token: state.token,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useAuthStore;

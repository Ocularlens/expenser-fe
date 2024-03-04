import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Client from "../utils/Client";

interface AuthState {
  token: string;
  setToken(by: string): void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: "",
      setToken: (value) => {
        if (value !== "")
          Client.defaults.headers.common = { Authorization: `Bearer ${value}` };
        else delete Client.defaults.headers.common["Authorization"];
        set(() => ({ token: value }));
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        token: state.token,
      }),
      onRehydrateStorage: () => {
        // optional
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            if (state?.token !== "")
              Client.defaults.headers.common = {
                Authorization: `Bearer ${state?.token}`,
              };
            else delete Client.defaults.headers.common["Authorization"];
          }
        };
      },
    }
  )
);

export default useAuthStore;

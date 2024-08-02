import { create } from "zustand";
import { persist } from "zustand/middleware";
import { customSessionStorage } from "./Storages/session.storage";
interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    { name: "auth-storage",
      storage: customSessionStorage
     }
  )
);

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  user: string;
  email: string;
  lastName: string;
  name: string;
}
interface UserState {
  user: string | null;
  email: string | null;
  lastName: string | null;
  name: string | null;
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      email: null,
      lastName: null,
      name: null,
      setUserData: (obj) =>
        set({
          user: obj.user,
          email: obj.email,
          lastName: obj.lastName,
          name: obj.name,
        }),
      clearUserData: () =>
        set({
          user: null,
          email: null,
          lastName: null,
          name: null,
        }),
    }),
    { name: "user-storage" }
  )
);

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  id: number;
  name: string;
  avatar: string;
  roles: string[];
}

interface UserState {
  token?: string;
  userInfo?: UserInfo;
  isLoggedIn: boolean;
}

interface UserActions {
  setToken: (token: string) => void;
  setUserInfo: (info: UserInfo) => void;
  login: (token: string, userInfo: UserInfo) => void;
  logout: () => void;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setToken: (token) => set({ token, isLoggedIn: !!token }),
      setUserInfo: (userInfo) => set({ userInfo }),
      login: (token, userInfo) => set({ token, userInfo, isLoggedIn: true }),
      logout: () =>
        set({ token: undefined, userInfo: undefined, isLoggedIn: false }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        token: state.token,
        userInfo: state.userInfo,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);

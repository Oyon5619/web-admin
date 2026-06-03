import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeConfig } from "antd";

interface ThemeState {
  themeConfig: ThemeConfig;
}

interface ThemeActions {
  setPrimaryColor: (color: string) => void;
  resetTheme: () => void;
}

const DEFAULT_THEME: ThemeConfig = {
  token: {
    colorPrimary: "#1677ff",
  },
};

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set) => ({
      themeConfig: DEFAULT_THEME,

      setPrimaryColor: (color) =>
        set({
          themeConfig: {
            token: {
              colorPrimary: color,
            },
          },
        }),

      resetTheme: () => set({ themeConfig: DEFAULT_THEME }),
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({
        themeConfig: state.themeConfig,
      }),
    }
  )
);
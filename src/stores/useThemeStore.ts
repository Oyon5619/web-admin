import { create } from "zustand";
import { persist } from "zustand/middleware";
import { theme } from "antd";
import type { ThemeConfig } from "antd";

interface ThemeState {
  themeConfig: ThemeConfig;
  isDarkMode: boolean;
}

interface ThemeActions {
  setPrimaryColor: (color: string) => void;
  toggleDarkMode: () => void;
  resetTheme: () => void;
}

const DEFAULT_THEME: ThemeConfig = {
  token: {
    colorPrimary: "#1677ff",
  },
  algorithm: undefined,
};

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set) => ({
      themeConfig: DEFAULT_THEME,
      isDarkMode: false,

      setPrimaryColor: (color) =>
        set((state) => ({
          themeConfig: {
            token: {
              colorPrimary: color,
            },
            algorithm: state.isDarkMode
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          },
        })),

      toggleDarkMode: () =>
        set((state) => {
          const newIsDarkMode = !state.isDarkMode;
          return {
            isDarkMode: newIsDarkMode,
            themeConfig: {
              token: {
                colorPrimary: state.themeConfig.token?.colorPrimary,
              },
              algorithm: newIsDarkMode
                ? theme.darkAlgorithm
                : theme.defaultAlgorithm,
            },
          };
        }),

      resetTheme: () =>
        set({
          themeConfig: DEFAULT_THEME,
          isDarkMode: false,
        }),
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({
        themeConfig: state.themeConfig,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
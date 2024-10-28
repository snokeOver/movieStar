import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ThemeStore {
  theme: string;
  setTheme: (newTheme: string) => void;
}

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      theme: "light", // default theme
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

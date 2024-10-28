"use client";

import { useThemeStore } from "@/app/store/store";
import Header from "./Header";
import ThemeProvider from "./ThemeProvider";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { theme } = useThemeStore();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={theme}
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      {children}
    </ThemeProvider>
  );
};

export default MainLayout;

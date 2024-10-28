"use client";

import { useThemeStore, useWatchList } from "@/app/store/store";
import Header from "./Header";
import ThemeProvider from "./ThemeProvider";
import Footer from "./Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { theme } = useThemeStore();
  const { toastMsg, setToastMsg } = useWatchList();

  //   All toast will fire here
  useEffect(() => {
    if (toastMsg) {
      const firstSpaceIndex = toastMsg.indexOf(" ");
      const type = toastMsg.substring(0, firstSpaceIndex);
      const message = toastMsg.substring(firstSpaceIndex + 1).trim();
      if (type === "suc") {
        toast.success(message, {
          position: "bottom-center",
        });
      } else if (type === "err") {
        toast.error(message, {
          position: "bottom-center",
        });
      } else {
        toast(message, {
          position: "bottom-center",
        });
      }
    }
    setToastMsg("");
  }, [toastMsg]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={theme}
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      {children}
      <ToastContainer theme={theme} autoClose={2600} />
      <Footer />
    </ThemeProvider>
  );
};

export default MainLayout;

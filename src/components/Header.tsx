"use client";

import { Button } from "./ui/button";
import { Moon, Search, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchBox from "./SearchBox";

import Logo from "./Logo";
import { useThemeStore } from "@/app/store/store";
import { useTheme } from "next-themes";

const Header = () => {
  const [showFullSearch, setShowFullSearch] = useState(false);
  const { theme, setTheme } = useThemeStore();

  const { theme: providerTheme, setTheme: setProviderTheme } = useTheme();

  // To prevent infinite loop
  const isInitialSync = useRef(true);

  // Sync Zustand's theme with provider's theme on initial load
  useEffect(() => {
    if (isInitialSync.current) {
      if (providerTheme && providerTheme !== theme) {
        setTheme(providerTheme);
      }
      isInitialSync.current = false; // Set to false after initial sync
    }
  }, [providerTheme, theme, setTheme]);

  // Update provider theme when Zustand theme changes
  useEffect(() => {
    if (theme !== providerTheme) {
      setProviderTheme(theme);
    }
  }, [theme, providerTheme, setProviderTheme]);

  return (
    <div className="w-full flex items-center justify-between px-4 py-2 bg-[#12121280] sticky z-50 top-0 backdrop-blur-2xl transition-colors">
      {/* First part: Logo Part */}
      <Logo showFullSearch={showFullSearch} />

      {/* Middle Part for Search bar*/}

      <div>
        <SearchBox
          showFullSearch={showFullSearch}
          setShowFullSearch={setShowFullSearch}
        />
      </div>

      {/*Right part For search button and Theme Toggle button */}
      <div className="flex gap-5 items-center">
        {/* search button */}
        <Button
          size={"icon"}
          variant={"ghost"}
          className={` text-secondary-text ${
            showFullSearch ? "hidden" : "md:hidden"
          }`}
          onClick={() => setShowFullSearch(true)}
        >
          <Search />
        </Button>

        {/* Toggle button */}
        {theme === "light" ? (
          <Moon className="text-gray-300" onClick={() => setTheme("dark")} />
        ) : (
          <Sun className="text-yellow-400" onClick={() => setTheme("light")} />
        )}
      </div>
    </div>
  );
};

export default Header;

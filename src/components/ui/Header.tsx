"use client";

import Link from "next/link";

import { Button } from "./button";
import { Moon, Search, Sun } from "lucide-react";
import { useState } from "react";
import SearchBox from "../SearchBox";
import { useTheme } from "next-themes";

const Header = ({}) => {
  const [showFullSearch, setShowFullSearch] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full flex items-center justify-between px-4 py-2 bg-[#12121280] sticky z-50 top-0 backdrop-blur-2xl transition-colors">
      {/* First part: Logo Part */}
      <Link href={"/"}>
        <p
          className={`text-gray-400 font-semibold cursor-pointer border px-3 py-1 rounded-3xl border-secondary-border ${
            showFullSearch ? "hidden" : "flex"
          }`}
        >
          Movie<span className="text-sky-600">Star</span>
        </p>
      </Link>

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

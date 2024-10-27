"use client";

import Link from "next/link";

import { Button } from "./button";
import { Search } from "lucide-react";
import { useState } from "react";
import SearchBox from "../SearchBox";

const Header = ({}) => {
  const [showFullSearch, setShowFullSearch] = useState(false);

  return (
    <div className="w-full flex items-center justify-between p-4 bg-primary">
      {/* Logo Part */}
      <Link href={"/"}>
        <p
          className={`text-gray-500 font-semibold cursor-pointer border px-3 py-1 rounded-3xl border-gray-800 ${
            showFullSearch ? "hidden" : "flex"
          }`}
        >
          Movie<span className="text-sky-600">Star</span>
        </p>
      </Link>

      {/* for Search bar*/}
      <div>
        <SearchBox
          showFullSearch={showFullSearch}
          setShowFullSearch={setShowFullSearch}
        />
      </div>

      {/*Right part For search button and Theme Toggle button */}
      <div>
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
      </div>
    </div>
  );
};

export default Header;

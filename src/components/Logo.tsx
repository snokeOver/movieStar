import { LogoProps } from "@/type_interface/interfaces";
import { ArrowBigRightDash } from "lucide-react";
import Link from "next/link";

const Logo = ({ showFullSearch, footer = false }: LogoProps) => {
  return (
    <Link
      href={"/"}
      className={`${
        footer
          ? "border-none text-xl"
          : "text-base border-secondary-border border rounded-3xl"
      }  ${showFullSearch ? "hidden" : "flex"} cursor-pointer`}
    >
      <p
        className={`text-gray-700 dark:text-gray-400 font-semibold px-3 py-1 flex items-center justify-center `}
      >
        <span>
          <ArrowBigRightDash className="text-sky-600 mr-1" />
        </span>
        Movie<span className="text-sky-600">Star</span>
      </p>
    </Link>
  );
};

export default Logo;

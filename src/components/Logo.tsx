import { SearchBoxProps } from "@/type_interface/interfaces";
import Link from "next/link";

const Logo = ({ showFullSearch }: SearchBoxProps) => {
  return (
    <Link href={"/"}>
      <p
        className={`text-gray-400 font-semibold cursor-pointer border px-3 py-1 rounded-3xl border-secondary-border ${
          showFullSearch ? "hidden" : "flex"
        }`}
      >
        Movie<span className="text-sky-600">Star</span>
      </p>
    </Link>
  );
};

export default Logo;

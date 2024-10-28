import { Movie } from "@/type_interface/types";
import LoadingSpinner from "./LoadingSpinner";
import MovieCard from "./MovieCard";
import { SectionContainerProps } from "@/type_interface/interfaces";

const SectionContainer = ({
  title,
  isLoadingPopular,
  movies,
}: SectionContainerProps) => {
  return (
    <div className="container mx-auto">
      {/* Popular movies */}

      <div className="flex text-center justify-center w-full text-2xl lg:text-4xl font-bold my-10">
        <h1 className="border-dashed border-y-2 py-2 border-sky-500 px-5">
          {title}
        </h1>
      </div>
      {isLoadingPopular && <LoadingSpinner />}
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] p-7 lg:p-3">
        {movies.map((movie, index) => (
          <MovieCard key={index.toString()} movie={movie} />
        ))}
      </div>

      {isLoadingPopular && <LoadingSpinner />}
    </div>
  );
};

export default SectionContainer;

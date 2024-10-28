import { getMovieDetails } from "@/lib/getMovies";
import { getImagePath } from "@/lib/helpers";
import { MovieDetailsProps } from "@/type_interface/interfaces";

import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Movie Star || Movie Details page",
};

const MovieDetails = async ({ params: { id } }: MovieDetailsProps) => {
  const currMovie = await getMovieDetails(id);

  const {
    backdrop_path,
    title,
    original_title,
    overview,
    vote_average,
    vote_count,
    release_date,
    tagline,
    status,
    genres,
  }: any = currMovie;

  return (
    <div className="py-10 flex flex-col lg:flex-row items-center gap-5 px-10 min-h-[500px]">
      <div className="w-full lg:w-1/2  rounded-md overflow-hidden group  flex-1">
        <Image
          src={getImagePath(backdrop_path)}
          alt={title}
          width={1920}
          height={1080}
          className="w-full h-full object-cover shadow-md shadow-gray-900 drop-shadow-xl group-hover:scale-110 duration-500"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-2 flex-1 h-auto ">
        <h2 className="text-2xl font-semibold underline decoration-[1px]">
          {original_title}
        </h2>
        <p className="text-sm leading-6 tracking-wide mt-2 flex-grow">
          {overview}
        </p>
        <p className="text-gray-200 text-sm mt-4">
          IMDB: <span className="text-white font-medium">{vote_average}</span>
        </p>
        <p className="text-gray-200 text-sm">
          Votes: <span className="text-white font-medium">{vote_count}</span>
        </p>
        <p className="text-gray-200 text-sm">
          Release Data:{" "}
          <span className="text-white font-medium">{release_date}</span>
        </p>
        <p className="text-gray-200 text-sm">
          Genres:{" "}
          {genres.map((item: any) => (
            <span key={item?.id} className="text-white font-medium mr-1">
              {item?.name},
            </span>
          ))}
        </p>
        <p className="text-gray-200 text-sm">
          Tag Line: <span className="text-white font-medium">{tagline}</span>
        </p>
        <p className="text-gray-200 text-sm">
          Status:{" "}
          <span
            className={`font-medium ${
              status === "Released" ? "text-green-500" : "text-red-500"
            }`}
          >
            {status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;

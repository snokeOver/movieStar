import SectionContainer from "@/components/SectionContainer";
import WishListActionButtons from "@/components/WishListActionButtons";
import {
  getCastOfMovies,
  getMovieDetails,
  getRecommendedMovies,
} from "@/lib/getMovies";
import { getImagePath } from "@/lib/helpers";
import { MovieDetailsProps } from "@/type_interface/interfaces";
import { CastMember, Genre } from "@/type_interface/types";

import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Movie Star || Movie Details page",
};

const MovieDetails = async ({ params: { id } }: MovieDetailsProps) => {
  const currMovie = await getMovieDetails(id);

  const { cast } = await getCastOfMovies(id);
  const recommendedMovies = await getRecommendedMovies(id);

  if (!currMovie) {
    console.error("Movie details not found");
    return;
  }

  const {
    backdrop_path,
    title,
    original_title,
    overview,
    release_date,
    genres,
  } = currMovie;

  const wishedMovie = { backdrop_path, title, id, release_date, genres };

  return (
    <div className="py-10 px-10 min-h-[500px]">
      <section className=" flex flex-col lg:flex-row items-center gap-5 mb-20 lg:mb-32">
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

          <p className="text-gray-600 text-sm">
            Genres:{" "}
            {genres.map((item: Genre) => (
              <span
                key={item?.id}
                className="text-secondary-text font-medium mr-1"
              >
                {item?.name},
              </span>
            ))}
          </p>

          <p className="text-gray-600 text-sm">
            Release Data:{" "}
            <span className="text-secondary-text font-medium">
              {release_date}
            </span>
          </p>

          <p className="text-gray-600 text-sm">
            Cast:
            {cast.map((cast: CastMember) => (
              <span
                key={cast?.id}
                className="text-secondary-text font-medium mr-1"
              >
                {cast?.original_name},
              </span>
            ))}
          </p>

          <WishListActionButtons movie={wishedMovie} />
        </div>
      </section>

      {/* Recommended movie section  */}

      <SectionContainer
        title="Our Recommended Movies"
        movies={recommendedMovies}
      />
    </div>
  );
};

// Exporting revalidate settings directly from the page component
export const revalidate = 60; // Revalidate every 60 seconds

export default MovieDetails;

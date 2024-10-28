"use client";

import Banner from "@/components/Banner";
import MovieCard from "@/components/MovieCard";
import { getPopularMovies, getTopRatedMovies } from "@/lib/getMovies";
import { Movie } from "@/type_interface/types";
import { useEffect, useState } from "react";

const Home = async () => {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch the top rated movies for banner

  const fetchTopRatedMovies = async () => {
    const movies = await getTopRatedMovies();
    setTopRatedMovies(movies);
  };

  const fetchMovies = async (pageNumber: number) => {
    setLoading(true);
    const movies = await getPopularMovies(pageNumber);
    setPopularMovies((prev) => [...prev, ...movies]);
    setLoading(false);

    // Check if there are more movies to load
    if (movies.length < 20) {
      // Assuming 20 is the limit per request
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  useEffect(() => {
    fetchMovies(page);
  }, []);

  return (
    <main>
      {/* Banner section */}
      <Banner bannerMovies={topRatedMovies} />

      {/* Movie seciton */}
      <section className="container mx-auto">
        {/* Popular movies */}

        <div className="flex text-center justify-center w-full text-2xl lg:text-4xl font-bold my-10">
          <h1 className="border-dashed border-y-2 py-2 border-sky-500 px-5">
            Our Popular Movies
          </h1>
        </div>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] p-7 lg:p-3">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;

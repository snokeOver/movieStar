"use client";
import Banner from "@/components/Banner";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { getPopularMovies, getTopRatedMovies } from "@/lib/getMovies";
import { Movie } from "@/type_interface/types";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  console.log(popularMovies.length);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // fetch the top rated movies only
  const fetchTopRatedMovies = async () => {
    const movies = await getTopRatedMovies();
    const movies1 = await getPopularMovies(1);
    setTopRatedMovies(movies);
    setPopularMovies(movies1);
  };

  // Fetch the popular movies load more button
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
    if (page > 1) fetchMovies(page);
  }, [page]);

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  // Load more movies when user scrolls to the bottom
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    )
      return;

    // If there's more to load, increment the page
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
          {popularMovies.map((movie, index) => (
            <MovieCard key={index.toString()} movie={movie} />
          ))}
        </div>

        {loading && (
          <div className="flex gap-3 w-full items-center justify-center">
            <Circle className="animate-spin text-yellow-400 text-4xl" />
            <span>Loading ...</span>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;

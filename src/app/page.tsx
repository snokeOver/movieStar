"use client";
import Banner from "@/components/Banner";
import LoadingSpinner from "@/components/LoadingSpinner";
import Logo from "@/components/Logo";
import MovieCard from "@/components/MovieCard";

import { getPopularMovies, getTopRatedMovies } from "@/lib/getMovies";
import { Movie } from "@/type_interface/types";

import { useEffect, useState } from "react";
import { useMovieStore } from "./store/store";

const Home = () => {
  const {
    topRatedMovies,
    popularMovies,
    isLoadingTopRated,
    isLoadingPopular,
    hasMore,
    fetchTopRatedMovies,
    fetchPopularMovies,
  } = useMovieStore();
  // console.log(popularMovies.length);

  const [page, setPage] = useState(1);
  // console.log(page);
  // Fetch movies on initial load
  useEffect(() => {
    fetchTopRatedMovies();
    fetchPopularMovies(page);
  }, []);

  // Load more movies when the page number changes
  useEffect(() => {
    if (page > 1) fetchPopularMovies(page);
  }, [page]);

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
      !isLoadingPopular &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingPopular, hasMore]);
  if (isLoadingPopular && isLoadingTopRated) {
    return (
      <main className="flex flex-col gap-10 min-h-screen w-full items-center justify-center text-center">
        <h2 className="text-4xl lg:text-7xl text-sky-500">Greetings</h2>
        <Logo />
      </main>
    );
  }

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
        {isLoadingPopular && <LoadingSpinner />}
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] p-7 lg:p-3">
          {popularMovies.map((movie, index) => (
            <MovieCard key={index.toString()} movie={movie} />
          ))}
        </div>

        {isLoadingPopular && <LoadingSpinner />}
      </section>
    </main>
  );
};

export default Home;

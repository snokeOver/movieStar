"use client";

import Banner from "@/components/Banner";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";
import { useMovieStore } from "./store/store";
import SectionContainer from "@/components/SectionContainer";

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

      <div id="popular-movies-section">
        <SectionContainer
          title="Popular Movies"
          isLoadingPopular={isLoadingPopular}
          movies={popularMovies}
        />
      </div>
    </main>
  );
};

export default Home;

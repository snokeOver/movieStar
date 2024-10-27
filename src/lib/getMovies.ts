import { SearchResults } from "@/type_interface/types";

const fetcher = async (url: URL, cacheTime?: number) => {
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24,
    },
  };
  const response = await fetch(url.toString(), options);

  const data = (await response.json()) as SearchResults;
  return data;
};

export const getNowPlaying = async () => {
  const url = new URL(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
  );

  const data = await fetcher(url);
  return data.results;
};

export const getUpcomingMovies = async () => {
  const url = new URL("https://api.themoviedb.org/3/movie/upcoming");
  const data = await fetcher(url);
  return data.results;
};

export const getTopRatedMovies = async () => {
  const url = new URL("https://api.themoviedb.org/3/movie/top_rated");
  const data = await fetcher(url);
  return data.results;
};

export const getPopularMovies = async () => {
  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  const data = await fetcher(url);
  return data.results;
};

export const getSearchedMovies = async (term: string) => {
  const url = new URL("https://api.themoviedb.org/3/search/movie");
  url.searchParams.set("query", term);

  const data = await fetcher(url);
  return data.results;
};

export const getMovieVideos = async (id?: string) => {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}/videos`);

  const data = await fetcher(url);
  return data.results;
};
export const getMovieDetails = async (id?: string) => {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);

  const data = await fetcher(url);
  return data;
};
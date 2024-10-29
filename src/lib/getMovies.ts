import { SearchResults } from "@/type_interface/types";

const fetcher = async (url: URL, cacheTime?: number) => {
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");
  const api_key = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${api_key}`,
    },
    next: {
      cache: "force-cache",
      revalidate: cacheTime || 3600,
    },
  };
  const response = await fetch(url.toString(), options);

  const data = (await response.json()) as SearchResults;

  return data;
};

// To get top rated movies for banner cashed for 24 hour
export const getTopRatedMovies = async () => {
  const url = new URL("https://api.themoviedb.org/3/movie/top_rated");

  try {
    const data = await fetcher(url, 86400);
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// To get popular movies for popular section, cashed for 1 hour
export const getPopularMovies = async (pageId: number) => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageId}`
  );

  try {
    const data = await fetcher(url);
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// To get searched movies for popular section, no cashing
export const getSearchedMovies = async (query: string) => {
  const url = new URL(
    `https://api.themoviedb.org/3/search/movie?query=${query}`
  );

  // No cashing for search result
  try {
    const data = await fetcher(url, 0);
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// To get movie details for Details page, cashed for 1 hour
export const getMovieDetails = async (id?: string) => {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);

  try {
    const data = await fetcher(url);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// To get casts of movie for Details page, cashed for 1 hour
export const getCastOfMovies = async (id?: string) => {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}/credits`);

  try {
    const data = await fetcher(url);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// To get recommended movies for Details page, cashed for 1 minutes
export const getRecommendedMovies = async (id?: string) => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${id}/recommendations`
  );

  try {
    const data = await fetcher(url, 60);
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

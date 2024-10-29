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
      revalidate: cacheTime || 60 * 60 * 24,
    },
  };
  const response = await fetch(url.toString(), options);

  const data = (await response.json()) as SearchResults;

  return data;
};

export const getTopRatedMovies = async () => {
  const url = new URL("https://api.themoviedb.org/3/movie/top_rated");
  const data = await fetcher(url);
  return data.results;
};

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

export const getMovieDetails = async (id?: string) => {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);

  const data = await fetcher(url);
  return data;
};

export const getCastOfMovies = async (id?: string) => {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}/credits`);

  const data = await fetcher(url);
  return data;
};

export const getRecommendedMovies = async (id?: string) => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${id}/recommendations`
  );

  const data = await fetcher(url);
  return data.results;
};

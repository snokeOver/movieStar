import { CurrMovieDetails, SearchResults, Movie } from "@/type_interface/types";

const fetcher = async <T>(url: URL, cacheTime?: number): Promise<T> => {
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
  const data = (await response.json()) as T; // Use generic type here
  return data;
};

// To get top rated movies for banner cached for 24 hours
export const getTopRatedMovies = async (): Promise<Movie[]> => {
  const url = new URL("https://api.themoviedb.org/3/movie/top_rated");

  try {
    const data = await fetcher<{ results: Movie[] }>(url, 86400);
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// To get popular movies for popular section, cached for 1 hour
export const getPopularMovies = async (pageId: number): Promise<Movie[]> => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageId}`
  );

  try {
    const data = await fetcher<{ results: Movie[] }>(url);
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// To get searched movies for popular section, no caching
export const getSearchedMovies = async (query: string): Promise<Movie[]> => {
  const url = new URL(
    `https://api.themoviedb.org/3/search/movie?query=${query}`
  );

  // No caching for search result
  try {
    const data = await fetcher<{ results: Movie[] }>(url, 0);
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// To get movie details for Details page, cached for 1 hour
export const getMovieDetails = async (
  id?: string
): Promise<CurrMovieDetails | null> => {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);

  try {
    const data = await fetcher<CurrMovieDetails>(url);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// To get casts of movie for Details page, cached for 1 hour
export const getCastOfMovies = async (id?: string): Promise<SearchResults> => {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}/credits`);

  try {
    const data = await fetcher<SearchResults>(url);
    return data;
  } catch (error) {
    console.log(error);
    // Return a default structure that matches SearchResults
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
      cast: [],
    };
  }
};

// To get recommended movies for Details page, cached for 1 minute

export const getRecommendedMovies = async (id?: string): Promise<Movie[]> => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${id}/recommendations`
  );

  try {
    const data = await fetcher<{ results: Movie[] }>(url, 60);
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

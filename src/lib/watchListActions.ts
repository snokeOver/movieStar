import { WMovie } from "@/type_interface/types";

// Mocked watch list in memory for demonstration purpose
let watchlist: WMovie[] = [];

// Add movies to the watch list
export const addToWatchlist = async (movie: WMovie) => {
  watchlist.push(movie);
  return watchlist;
};

// Remove movie from the watch list
export const removeFromWatchlist = async (movieId: string) => {
  watchlist = watchlist.filter((movie) => movie.id !== movieId);
  return watchlist;
};

// Get the watch List
export const getWatchList = async () => {
  return watchlist;
};

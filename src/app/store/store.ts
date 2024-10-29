import {
  getPopularMovies,
  getSearchedMovies,
  getTopRatedMovies,
} from "@/lib/getMovies";
import { addToWatchlist, removeFromWatchlist } from "@/lib/watchListActions";
import { Movie, WMovie } from "@/type_interface/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ThemeStore {
  theme: string;
  setTheme: (newTheme: string) => void;
}

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      theme: "dark", // default theme
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface WatchList {
  isExist: boolean;
  setIsExist: (exists: boolean) => void;
  toastMsg: string;
  setToastMsg: (msg: string) => void;
}

export const useWatchList = create<WatchList>((set) => ({
  // WatchListExistance state
  isExist: false,
  setIsExist: (exists) => set({ isExist: exists }),

  // ToastMessage state
  toastMsg: "",
  setToastMsg: (msg) => set({ toastMsg: msg }),
}));

interface MovieStore {
  topRatedMovies: Movie[];
  popularMovies: Movie[];
  isLoadingTopRated: boolean;
  isLoadingPopular: boolean;
  errorTopRated: string | null;
  errorPopular: string | null;
  hasMore: boolean;
  fetchTopRatedMovies: () => Promise<void>;
  fetchPopularMovies: (page: number) => Promise<void>;
  fetchSearchedMovies: (query: string) => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set) => ({
  topRatedMovies: [],
  popularMovies: [],
  isLoadingTopRated: true,
  isLoadingPopular: true,
  errorTopRated: null,
  errorPopular: null,
  hasMore: true,

  // Get the Top Rated movies for banner
  fetchTopRatedMovies: async () => {
    set({ isLoadingTopRated: true, errorTopRated: null });
    try {
      const movies = await getTopRatedMovies();
      set({ topRatedMovies: movies, isLoadingTopRated: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      set({ isLoadingTopRated: false, errorTopRated: errorMessage });
    }
  },

  // Get the Movies for search input
  fetchSearchedMovies: async (query: string) => {
    set({ isLoadingPopular: true, errorPopular: null });
    try {
      const movies = await getSearchedMovies(query);

      set(() => ({
        popularMovies: movies,
        isLoadingPopular: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      set({ isLoadingPopular: false, errorPopular: errorMessage });
    }
  },

  // Get the popular movies
  fetchPopularMovies: async (page) => {
    set({ isLoadingPopular: true, errorPopular: null });
    try {
      const movies = await getPopularMovies(page);

      set((state) => ({
        popularMovies: [...state.popularMovies, ...movies],
        isLoadingPopular: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      set({ isLoadingPopular: false, errorPopular: errorMessage });
    }
  },
}));

interface WishListStore {
  wishlist: WMovie[];
  addToWishlist: (movie: WMovie) => Promise<void>;
  removeFromWishlist: (movieId: string) => Promise<void>;
}

export const useWishListStore = create<WishListStore>()(
  persist(
    (set) => ({
      wishlist: [],

      addToWishlist: async (movie) => {
        await addToWatchlist(movie); // Server action to add to watchlist
        set((state) => ({
          wishlist: [...state.wishlist, movie],
        }));
      },

      removeFromWishlist: async (movieId: string) => {
        await removeFromWatchlist(movieId); // Server action to remove from watchlist
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== movieId),
        }));
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage), // Persist wishlist in localStorage
    }
  )
);

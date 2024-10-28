import {
  getPopularMovies,
  getSearchedMovies,
  getTopRatedMovies,
} from "@/lib/getMovies";
import { Movie } from "@/type_interface/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ThemeStore {
  theme: string;
  setTheme: (newTheme: string) => void;
}

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      theme: "light", // default theme
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

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

      set((state) => ({
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

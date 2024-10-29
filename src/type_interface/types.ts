export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type WMovie = {
  id: string;
  backdrop_path: string;
  title: string;
  release_date: string;
  genres: Genre[];
};

export type CastMember = {
  id: number;
  original_name: string;
};

export type SearchResults = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  cast: CastMember[];
};

export type Genre = {
  id: number;
  name: string;
};

export type Genres = {
  genres: Genre[];
};

export type VideoProps = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

export type Videos = {
  videos: VideoProps[];
};

export type CurrMovieDetails = {
  backdrop_path: string;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  genres: Genre[];
};

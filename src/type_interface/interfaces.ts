import { Movie } from "./types";

export interface SearchBoxProps {
  footer?: boolean;
  showFullSearch?: boolean;
  setShowFullSearch?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BannerProps {
  bannerMovies: Movie[];
}

export interface MovieDetailsProps {
  params: {
    id: string;
  };
}

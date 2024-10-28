import { Movie } from "./types";

export interface SearchBoxProps {
  showFullSearch: boolean;
  setShowFullSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LogoProps {
  showFullSearch?: boolean;
  footer?: boolean;
}

export interface BannerProps {
  bannerMovies: Movie[];
}

export interface MovieDetailsProps {
  params: {
    id: string;
  };
}

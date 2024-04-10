import { Response } from "@/types/Response";
import { Platform } from "./Platform";

type Tag = {
  games_count: number;
  id: number;
  image_background: string;
  language: string;
  name: string;
  slug: string;
};

type Store = {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
  };
};

type Screenshot = {
  id: number;
  image: string;
};

type Plat = {
  games_count: number;
  id: number;
  image: null;
  image_background: string;
  name: string;
  slug: string;
  year_end: null;
  year_start: null;
};

type Rating = {
  count: number;
  id: number;
  percent: number;
  title: string;
};

export type Game = {
  added: number;
  added_by_status: {
    beaten: number;
    dropped: number;
    owned: number;
    playing: number;
    toplay: number;
    yet: number;
  };
  background_image: string;
  clip: null;
  dominant_color: string;
  esrb_rating: {
    id: number;
    name: string;
    slug: string;
  };
  genres: Response[];
  id: number;
  metacritic: number;
  name: string;
  parent_platforms: Platform[];
  platforms: Plat[];
  playtime: number;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  released: string;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  short_screenshots: Screenshot[];
  slug: string;
  stores: Store[];
  suggestions_count: number;
  tags: Tag[];
  tba: boolean;
  updated: string;
  user_game: null;
};

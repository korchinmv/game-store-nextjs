import { Game } from "./Game";

export type Year = {
  count: number;
  nofollow: boolean;
  year: number;
};

export type Filter = {
  count: number;
  decade: number;
  filter: string;
  from: number;
  nofollow: boolean;
  to: number;
  years: Year[];
};

export type ResponseGamesData = {
  count?: number;
  description?: string;
  filters?: {
    years: Year[];
  };
  next?: null | string;
  nofollow?: boolean;
  nofollow_collections?: string[];
  noindex?: false;
  previous?: null | string;
  results: Game[];
  seo_description?: string;
  seo_h1?: string;
  seo_keywords?: string;
  seo_title?: string;
};

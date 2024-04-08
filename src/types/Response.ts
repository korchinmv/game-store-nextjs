export type ResponseGame = {
  added: number;
  id: number;
  name: string;
  slug: string;
};

export type Response = {
  games_count: number;
  id: number;
  image?: string;
  image_background: string;
  name: string;
  slug: string;
  games: ResponseGame[];
  year_start?: number;
  year_end?: number;
};

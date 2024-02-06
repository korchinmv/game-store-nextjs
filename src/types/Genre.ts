export type GenreGame = {
  added: number;
  id: number;
  name: string;
  slug: string;
};

export type Genre = {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
  games?: GenreGame[];
};

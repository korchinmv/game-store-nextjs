import { Game } from "@/types/Game";
import { Genre } from "@/types/Genre";

export const filterGamesByGenre = (data: Genre[], slug: string): Game[] => {
  const filtredGames: Game[] = [];

  data.forEach((game) => {
    game.genres.forEach((genre) => {
      if (genre.slug === slug) {
        filtredGames.push(game);
      }
    });
  });

  return filtredGames;
};

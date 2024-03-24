import { RootState } from "@/redux/store";

export const favoritesGamesSelector = (state: RootState) =>
  state.favoritesGames;

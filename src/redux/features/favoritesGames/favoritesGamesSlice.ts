import { Game } from "@/types/Game";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const games =
  getLocalStorage("favoritesGames") !== null
    ? getLocalStorage("favoritesGames")
    : [];

const totalFavoritesQuantity =
  getLocalStorage("totalFavoritesGames") !== null
    ? getLocalStorage("totalFavoritesGames")
    : 0;

const setItemFunc = (games: Game | Game[], totalQuantity: number): void => {
  localStorage.setItem("favoritesGames", JSON.stringify(games));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

interface InitialState {
  results: Game[];
  totalFavoritesQuantity: number;
}

const initialState: InitialState = {
  results: games,
  totalFavoritesQuantity,
};

export const favoritesGamesReducer = createSlice({
  name: "favoritesGames",
  initialState,

  reducers: {
    toggleLikeGame: (state, action: PayloadAction<Game>) => {
      if (state.results.length === 0) {
        state.results.push(action.payload as Game);
        setItemFunc(
          state.results.map((game) => game),
          state.results.length
        );
        return;
      }

      if (state.results.length > 0) {
        if (state.results.some((game) => game.id === action.payload.id)) {
          state.results = state.results.filter(
            (game) => game.id !== action.payload.id
          );
          setItemFunc(
            state.results.map((game) => game),
            state.results.length
          );
        } else {
          state.results.push(action.payload as Game);
          setItemFunc(
            state.results.map((game) => game),
            state.results.length
          );
        }
      }
    },
  },
});

export const { toggleLikeGame } = favoritesGamesReducer.actions;

export default favoritesGamesReducer.reducer;

import { Game } from "@/types/Game";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  results: Game[];
}

const initialState: InitialState = {
  results: [],
};

export const favoritesGamesReducer = createSlice({
  name: "favoritesGames",
  initialState,
  reducers: {
    toggleLikeGame: (state, action: PayloadAction<Game>) => {
      if (state.results.length === 0) {
        state.results.push(action.payload as Game);
        return;
      }

      if (state.results.length > 0) {
        if (state.results.some((game) => game.id === action.payload.id)) {
          state.results = state.results.filter(
            (game) => game.id !== action.payload.id
          );
        } else {
          state.results.push(action.payload as Game);
        }
      }
    },
  },
});

export const { toggleLikeGame } = favoritesGamesReducer.actions;

export default favoritesGamesReducer.reducer;

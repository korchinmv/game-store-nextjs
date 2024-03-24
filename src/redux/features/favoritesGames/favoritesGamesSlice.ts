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
    addGame: (state, action: PayloadAction<Game>) => {
      state.results.push(action.payload as Game);
    },
    deleteGame: () => {},
  },
});

export const { addGame, deleteGame } = favoritesGamesReducer.actions;

export default favoritesGamesReducer.reducer;

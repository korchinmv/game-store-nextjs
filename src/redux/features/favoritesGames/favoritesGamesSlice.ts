import { Game } from "@/types/Game";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Game[] = [];

export const favoritesGames = createSlice({
  name: "favoritesGames",
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<Game>) => {
      state.push(action.payload as Game);
    },
    deleteGame: () => {},
  },
});

export const { addGame, deleteGame } = favoritesGames.actions;

export default favoritesGames.reducer;

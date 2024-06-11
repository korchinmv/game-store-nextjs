import { createSlice } from "@reduxjs/toolkit";
import qs from "qs";

interface InitialState {
  platform: null | number;
  ordering: null | string;
}

const initialState: InitialState = {
  platform: null,
  ordering: null,
};

export const filterGamesReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      if (typeof action.payload == "string") {
        state.ordering = action.payload;
      } else {
        state.platform = action.payload;
      }
    },
  },
});

export const { setFilter } = filterGamesReducer.actions;

export default filterGamesReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const toggleMenuReducer = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleState: (state) => {
      return (state = !state);
    },
  },
});

export const { toggleState } = toggleMenuReducer.actions;

export default toggleMenuReducer.reducer;

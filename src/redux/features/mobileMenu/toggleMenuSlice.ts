import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const toggleMenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleState: (state) => {
      return (state = !state);
    },
  },
});

export const { toggleState } = toggleMenuSlice.actions;

export default toggleMenuSlice.reducer;

import { RootState } from "@/redux/store";

export const filterGamesSelector = (state: RootState) =>
  state.filterGamesReducer;

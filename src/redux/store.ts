import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import toggleMenuReducer from "./features/mobileMenu/toggleMenuSlice";
import favoritesGamesReducer from "./features/favoritesGames/favoritesGamesSlice";
// import filterGamesReducer from "./features/filterGames/filterGamesSlice";

export const store = () => {
  return configureStore({
    reducer: {
      toggleMenuReducer,
      favoritesGamesReducer,
      [api.reducerPath]: api.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

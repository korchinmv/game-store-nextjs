import { configureStore } from "@reduxjs/toolkit";
import toggleMenuSlice from "./features/mobileMenu/toggleMenuSlice";
import { api } from "./api/api";

export const store = () => {
  return configureStore({
    reducer: {
      menu: toggleMenuSlice,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

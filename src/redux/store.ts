import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import toggleMenuSlice from "./features/mobileMenu/toggleMenuSlice";

export const store = () => {
  return configureStore({
    reducer: {
      menu: toggleMenuSlice,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

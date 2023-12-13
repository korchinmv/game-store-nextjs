import { configureStore } from "@reduxjs/toolkit";
import toggleMenuSlice from "./features/mobileMenu/toggleMenuSlice";

export const store = () => {
  return configureStore({
    reducer: {
      menu: toggleMenuSlice,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

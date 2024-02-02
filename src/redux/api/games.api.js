import { api } from "./api.js";

export const gamesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query({
      query: (quantity) =>
        `games?page_size=${quantity}&key=${process.env.KEY_GAMESTORE}`,
    }),
    getGameData: builder.query({
      query: (id) => `games/${id}?key=${process.env.KEY_GAMESTORE}`,
    }),
  }),
});

export const { useGetGamesQuery, useGetGameDataQuery } = gamesApi;

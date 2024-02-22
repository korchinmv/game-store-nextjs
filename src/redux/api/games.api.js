import { api } from "./api.js";

export const gamesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query({
      query: ({ quantity, numberPage }) =>
        `games?page_size=${quantity}&key=${process.env.KEY_GAMESTORE}&page=${
          numberPage ? numberPage : ""
        }`,
    }),
    getGamesByGenre: builder.query({
      query: ({ id, quantity }) => {
        return `games?genres=${id}&page_size=${quantity}&filter=true&comments=true&key=${process.env.KEY_GAMESTORE}`;
      },
    }),
    getGameData: builder.query({
      query: (id) => `games/${id}?key=${process.env.KEY_GAMESTORE}`,
    }),
    getGameScreenshots: builder.query({
      query: (id) => `games/${id}/screenshots?key=${process.env.KEY_GAMESTORE}`,
    }),
    getGameDlc: builder.query({
      query: (id) => `games/${id}/additions?key=${process.env.KEY_GAMESTORE}`,
    }),
  }),
});

export const {
  useGetGamesQuery,
  useGetGameDataQuery,
  useGetGamesByGenreQuery,
  useGetGameScreenshotsQuery,
  useGetGameDlcQuery,
} = gamesApi;

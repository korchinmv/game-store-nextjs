import { api } from "./api.js";

export const genresApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: (quantity) =>
        `genres?page_size=${quantity}&key=${process.env.KEY_GAMESTORE}`,
    }),
  }),
});

export const { useGetGenresQuery } = genresApi;

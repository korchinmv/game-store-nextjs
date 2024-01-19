import { api } from "./api.js";

export const genresApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `genres?key=${process.env.KEY_GAMESTORE}`,
    }),
  }),
});

export const { useGetGenresQuery } = genresApi;

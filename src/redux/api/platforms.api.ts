import { api } from "./api.js";

export const platformsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlatforms: builder.query({
      query: (quantity) =>
        `platforms?page_size=${quantity}&key=${process.env.KEY_GAMESTORE}`,
    }),
  }),
});

export const { useGetPlatformsQuery } = platformsApi;

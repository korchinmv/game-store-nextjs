import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL_GAMESTORE,
  }),
  endpoints: () => ({}),
});

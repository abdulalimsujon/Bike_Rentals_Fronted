import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    getAllBike: builder.query({
      query: () => ({
        url: "/bikes",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBikeQuery } = baseApi;

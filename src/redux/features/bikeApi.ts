import { baseApi } from "../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBikebyModel: builder.query({
      query: (args) => {
        console.log("===", args);
        const params = new URLSearchParams();

        return {
          url: `/bikes/getBymodel/${args}`,
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const { useGetBikebyModelQuery } = bikeApi;

import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allBike: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/bikes/getBike?${params.toString()}`, // Attach params to the URL
          method: "GET",
        };
      },
    }),

    singleBike: builder.query({
      query: (bikeId) => {
        console.log("inside the api", bikeId);
        return {
          url: `/bikes/single-bike/${bikeId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useAllBikeQuery, useSingleBikeQuery } = bikeApi;

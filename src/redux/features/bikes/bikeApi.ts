import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allBike: builder.query({
      query: (args) => {
        console.log("here are the args", args);
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
  }),
});

export const { useAllBikeQuery } = bikeApi;

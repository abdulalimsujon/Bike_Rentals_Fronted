import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allBike: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args.forEach((item) => {
          params.append(item.name, item.value);
        });

        return {
          url: `/bikes/getBike?${params.toString()}`, // Attach params to the URL
          method: "GET",
        };
      },
    }),

    singleBike: builder.query({
      query: (bikeId) => {
        return {
          url: `/bikes/single-bike/${bikeId}`,
          method: "GET",
        };
      },
    }),

    createBike: builder.mutation({
      query: (data) => {
        return {
          url: "/bikes",
          method: "POST",
          body: data,
        };
      },
    }),
    deleteBike: builder.mutation({
      query: (bikeId) => {
        console.log("form the api", bikeId);
        return {
          url: `/bikes/${bikeId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useAllBikeQuery,
  useSingleBikeQuery,
  useCreateBikeMutation,
  useDeleteBikeMutation,
} = bikeApi;

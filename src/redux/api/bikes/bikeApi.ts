import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allBike: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args.forEach((item: { name: string; value: string }) => {
          params.append(item.name, item.value);
        });

        return {
          url: `/bikes/getBike?${params.toString()}`, // Attach params to the URL
          method: "GET",
        };
      },
      providesTags: ["Bike"],
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
        return {
          url: `/bikes/${bikeId}`,
          method: "DELETE",
        };
      },
    }),
    rentalBike: builder.mutation({
      query: (args) => {
        return {
          url: `/rentals`,
          method: "PUT",
          body: args,
        };
      },
    }),
    updateBike: builder.mutation({
      query: ({ data, bikeId }) => {
        return {
          url: `/bikes/${bikeId}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Bike"],
    }),
  }),
});

export const {
  useAllBikeQuery,
  useSingleBikeQuery,
  useCreateBikeMutation,
  useDeleteBikeMutation,
  useUpdateBikeMutation,
  useRentalBikeMutation,
} = bikeApi;

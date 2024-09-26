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
      invalidatesTags: ["Bike"],
    }),
    deleteBike: builder.mutation({
      query: (bikeId) => {
        return {
          url: `/bikes/${bikeId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Bike"],
    }),
    CreateRentalBike: builder.mutation({
      query: (args) => {
        return {
          url: `/rentals`,
          method: "POST",
          body: args,
        };
      },
      invalidatesTags: ["Bike"],
    }),
    getAllRentalBike: builder.query({
      query: () => {
        return {
          url: `/rentals`,
          method: "GET",
        };
      },
      providesTags: ["rental"],
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
    returnBike: builder.mutation({
      query: (args) => {
        return {
          url: `/rentals/return-bike`,
          method: "PUT",
          body: args,
        };
      },
    }),
    getRentalByUserId: builder.query({
      query: (userId) => {
        return {
          url: `/rentals/${userId}`,
          method: "GET",
        };
      },
    }),
    getAvailableBike: builder.query({
      query: () => {
        return {
          url: `/bikes/available-bike`,
          method: "GET",
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
  useUpdateBikeMutation,
  useGetAllRentalBikeQuery,
  useCreateRentalBikeMutation,
  useReturnBikeMutation,
  useGetRentalByUserIdQuery,
  useGetAvailableBikeQuery,
} = bikeApi;

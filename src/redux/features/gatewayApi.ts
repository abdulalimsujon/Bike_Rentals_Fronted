import { baseApi } from "../api/baseApi";

const gatewayApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (args) => {
        console.log(args);
        return {
          url: `gateway/create-checkout-session`,
          method: "POST",
          body: args,
        };
      },
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = gatewayApi;

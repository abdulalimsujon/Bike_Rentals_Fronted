import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: userInfo,
        };
      },
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation, useGetMeQuery } =
  authApi;

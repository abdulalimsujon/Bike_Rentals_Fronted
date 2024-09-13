import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation({
      query: (args) => {
        console.log("args", args);
        return {
          url: `/users/me`,
          method: "PUT",
          body: args, // Correct key for request body
        };
      },
    }),
  }),
});

export const { useUpdateUserProfileMutation } = userApi;

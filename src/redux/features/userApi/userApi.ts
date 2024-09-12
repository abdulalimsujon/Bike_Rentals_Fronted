import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation({
      query: (args) => {
        console.log("args", args);
        return {
          url: `/users/me`,
          method: "PUT",
          data: args,
        };
      },
    }),
  }),
});

export const { useUpdateUserProfileMutation } = userApi;

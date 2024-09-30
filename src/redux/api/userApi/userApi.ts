import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        return {
          url: `/users/all-user`,
          method: "GET",
          body: args,
        };
      },
    }),
    updateUserProfile: builder.mutation({
      query: (args) => {
        return {
          url: `/users/me`,
          method: "PUT",
          body: args,
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/delete-user${id}`,
          method: "DELETE",
        };
      },
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }: { id: string; role: string }) => {
        console.log({ id, role });
        return {
          url: `/users/update-role/${id}`,
          method: "PUT",
          body: { role: role },
        };
      },
    }),
  }),
});

export const {
  useUpdateUserProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = userApi;

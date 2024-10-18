import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query) => {
        return {
          url: `/users?${query}`,
        };
      },
      providesTags: [tagTypes.user],
    }),
    getAdminOverview: builder.query({
      query: () => `/users/admin/overview`,
    }),
    getSellerOverview: builder.query({
      query: () => `/users/seller/overview`,
    }),
    getUserOverview: builder.query({
      query: () => `/users/user/overview`,
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    getSellerProfileById: builder.query({
      query: (id) => `/users/seller/profile/${id}`,
    }),
    addUser: builder.mutation({
      query: (info) => {
        return {
          url: "/user",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    editUser: builder.mutation({
      query: (info) => {
        return {
          url: `/users/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.user, tagTypes.kyc, tagTypes.businessKyc],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    addWithdrawPin: builder.mutation({
      query: (info) => {
        return {
          url: `/auth/add-withdrawal-password-first-time`,
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    changePassword: builder.mutation({
      query: (info) => {
        return {
          url: `/auth/change-password`,
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    forgotPassword: builder.mutation({
      query: (forgotEmail) => {
        return {
          url: `/auth/send-forgot-email/${forgotEmail}`,
          method: "POST",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    uploadImage: builder.mutation({
      query: (info) => {
        return {
          url: `https://acct-media-server.onrender.com/api/v1/uploadImg`,
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
  useUploadImageMutation,
  useEditUserMutation,
  useForgotPasswordMutation,
  useGetUserByIdQuery,
  useGetAdminOverviewQuery,
  useGetSellerOverviewQuery,
  useGetUserOverviewQuery,
  useAddWithdrawPinMutation,
  useGetSellerProfileByIdQuery,
} = userApi;

import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: (query) => {
        return {
          url: `/accounts?${query}`,
        };
      },
      providesTags: [tagTypes.account],
    }),
    getAccountById: builder.query({
      query: (id) => `/accounts/${id}`,
      providesTags: [tagTypes.account],
    }),
    addAccount: builder.mutation({
      query: (info) => {
        return {
          url: "/accounts",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.account],
    }),
    addMultiAccount: builder.mutation({
      query: (info) => {
        return {
          url: "/accounts/multi-upload",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.account],
    }),
    editAccount: builder.mutation({
      query: (info) => {
        return {
          url: `/accounts/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.account],
    }),
    deleteAccount: builder.mutation({
      query: (id) => {
        return {
          url: `/accounts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.account],
    }),
  }),
});
export const {
  useGetAccountsQuery,
  useAddAccountMutation,
  useDeleteAccountMutation,
  useEditAccountMutation,
  useGetAccountByIdQuery,
  useAddMultiAccountMutation,
} = accountApi;

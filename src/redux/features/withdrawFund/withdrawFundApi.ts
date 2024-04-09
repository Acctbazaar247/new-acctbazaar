import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes, tagTypesList } from "../apiSlice/tagTypesList";
export const withdrawFundApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWithdrawFunds: builder.query({
      query: (query) => {
        return {
          url: `/withdrawal-request?${query}`,
        };
      },
      providesTags: [tagTypes.withdraw],
    }),
    getWithdrawFundById: builder.query({
      query: (id) => `/withdrawal-request/${id}`,
      providesTags: [tagTypes.withdraw],
    }),
    getWithdrawFundsOfLoggedInUser: builder.query({
      query: () => `/withdrawal-request/single-user-request `,
      providesTags: [tagTypes.withdraw],
    }),
    getWithdrawBanks: builder.query({
      query: () => `/withdrawal-request/withdrawal-banks`,
      providesTags: [tagTypes.withdraw],
    }),
    addWithdrawFund: builder.mutation({
      query: (info) => {
        return {
          url: "/withdrawal-request",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.withdraw],
    }),
    editWithdrawFund: builder.mutation({
      query: (info) => {
        return {
          url: `/withdrawal-request/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.withdraw],
    }),
    deleteWithdrawFund: builder.mutation({
      query: (id) => {
        return {
          url: `/withdrawal-request/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.withdraw],
    }),
  }),
});
export const {
  useGetWithdrawFundsQuery,
  useAddWithdrawFundMutation,
  useDeleteWithdrawFundMutation,
  useEditWithdrawFundMutation,
  useGetWithdrawFundByIdQuery,
  useGetWithdrawBanksQuery,
  useGetWithdrawFundsOfLoggedInUserQuery,
} = withdrawFundApi;

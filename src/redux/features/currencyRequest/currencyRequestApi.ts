import { apiSlice } from "../apiSlice/apiSlice";
export const currencyRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrencyRequests: builder.query({
      query: (query) => {
        return {
          url: `/currency-request?${query}`,
        };
      },
    }),
    getCurrencyRequestById: builder.query({
      query: (id) => `/currency-request/${id}`,
    }),
    addCurrencyRequest: builder.mutation({
      query: (info) => {
        return {
          url: "/currency-request",
          method: "POST",
          body: info,
        };
      },
    }),
    addCurrencyRequestWithPayStack: builder.mutation({
      query: (info) => {
        return {
          url: "/currency-request/paystack",
          method: "POST",
          body: info,
        };
      },
    }),
    editCurrencyRequest: builder.mutation({
      query: (info) => {
        return {
          url: `/currency-request/${info._id}`,
          method: "PATCH",
          body: info,
        };
      },
    }),
    deleteCurrencyRequest: builder.mutation({
      query: (id) => {
        return {
          url: `/currency-request/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useGetCurrencyRequestsQuery,
  useAddCurrencyRequestMutation,
  useDeleteCurrencyRequestMutation,
  useEditCurrencyRequestMutation,
  useGetCurrencyRequestByIdQuery,
  useAddCurrencyRequestWithPayStackMutation,
} = currencyRequestApi;

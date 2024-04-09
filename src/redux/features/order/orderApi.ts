import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (query) => {
        return {
          url: `/order?${query}`,
        };
      },
    }),
    getOrderById: builder.query({
      query: (id) => `/order/${id}`,
    }),
    getMyOrders: builder.query({
      query: () => {
        return {
          url: `/order/my-orders`,
        };
      },
      providesTags: [tagTypes.order],
    }),
    addOrder: builder.mutation({
      query: (info) => {
        return {
          url: "/order",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.cart, tagTypes.order, tagTypes.account],
    }),
    editOrder: builder.mutation({
      query: (info) => {
        return {
          url: `/order/${info._id}`,
          method: "PATCH",
          body: info,
        };
      },
    }),
    deleteOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/order/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useDeleteOrderMutation,
  useEditOrderMutation,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
} = orderApi;

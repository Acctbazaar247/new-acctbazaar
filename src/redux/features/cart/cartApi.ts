import { ICart } from "./../../../types/common";
import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: (query) => {
        return {
          url: `/cart?${query}`,
        };
      },
    }),
    getMyCarts: builder.query({
      query: () => {
        return {
          url: `/cart/my-carts`,
        };
      },
      providesTags: [tagTypes.cart],
    }),
    getCartById: builder.query({
      query: (id) => `/carts/${id}`,
      providesTags: [tagTypes.cart],
    }),
    addCart: builder.mutation({
      query: (info) => {
        return {
          url: "/cart",
          method: "POST",
          body: info,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // const result = await queryFulfilled;

        // update data
        // optimistic cache update end
        try {
          const result = await queryFulfilled;
          dispatch(
            cartApi.util.updateQueryData("getMyCarts", "", (draft) => {
              // const index = draft?.findIndex(
              //   (single: ICart) => single.id === arg
              // );
              // if (index !== -1) draft.splice(index, 1)
              // draft=[...dar]
              draft.data.push(result?.data?.data);
            })
          );
        } catch (err) {}
      },
    }),
    editCart: builder.mutation({
      query: (info) => {
        return {
          url: `/cart/${info._id}`,
          method: "PATCH",
          body: info,
        };
      },
    }),
    deleteCart: builder.mutation({
      query: (id) => {
        return {
          url: `/cart/${id}`,
          method: "DELETE",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getMyCarts", "", (draft) => {
            const index = draft.data?.findIndex(
              (single: ICart) => single.id === arg
            );
            if (index !== -1) draft.data.splice(index, 1);
          })
        );
        try {
          const result = await queryFulfilled;
        } catch (err) {
          patch.undo();
        }
      },
    }),
  }),
});
export const {
  useGetCartsQuery,
  useAddCartMutation,
  useDeleteCartMutation,
  useEditCartMutation,
  useGetCartByIdQuery,
  useGetMyCartsQuery,
} = cartApi;

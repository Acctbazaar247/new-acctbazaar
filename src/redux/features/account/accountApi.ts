import { IAccount } from "@/types/common";
import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
import { addCacheKey, getCacheKeys } from "./account.cacheKey.manager";
export const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: (query) => {
        addCacheKey(query);
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
      invalidatesTags: [tagTypes.account, tagTypes.plan],
    }),
    addMultiAccount: builder.mutation({
      query: (info) => {
        return {
          url: "/accounts/multi-upload",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.account, tagTypes.plan],
    }),
    editAccount: builder.mutation({
      query: (info) => {
        return {
          url: `/accounts/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch, getCacheEntry }) {
        // Optimistic update: update the cache before the request completes
        const cacheKeys = getCacheKeys();
        const patchResults = cacheKeys.map((key) =>
          dispatch(
            accountApi.util.updateQueryData("getAccounts", key, (draft) => {
              // console.log(key, JSON.parse(JSON.stringify(draft)));
              const index = draft.data.findIndex(
                (account: IAccount) => account.id === arg.id
              );
              if (index !== -1) {
                draft.data[index] = { ...draft.data[index], ...arg }; // Update the account with new data
              }
            })
          )
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchResults.forEach((patchResult) => patchResult.undo()); // Revert optimistic update if the request fails
        }
      },
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

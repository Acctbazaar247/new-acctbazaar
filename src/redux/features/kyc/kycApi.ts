import { TKyc } from "@/types/common";
import { getCacheKeys } from "../account/account.cacheKey.manager";
import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";

export const kycApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeKycRequest: builder.mutation({
      query: (info) => {
        return {
          url: "/kyc",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.kyc],
    }),
    updateKycRequest: builder.mutation({
      query: (info) => {
        return {
          url: `/kyc/${info?.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.kyc],
    }),
    updateStatusBySuperAdminKycRequest: builder.mutation({
      query: (info) => {
        return {
          url: `/kyc/${info?.id}`,
          method: "PATCH",
          body: info,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // Optimistic update: update the cache before the request completes
        const cacheKeys = getCacheKeys();
        console.log(cacheKeys);
        const patchResults = cacheKeys.map((key) =>
          dispatch(
            kycApi.util.updateQueryData("getAllKycRequest", key, (draft) => {
              console.log(key, JSON.parse(JSON.stringify(draft)));
              const index = draft.data.findIndex(
                (kycReq: any) => kycReq?.id === arg.id
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
    getAllKycRequest: builder.query({
      query: (query) => `/kyc?${query}`,
      providesTags: [tagTypes.kyc],
    }),
    getSingleUserKyc: builder.query({
      query: () => `/kyc/single-user-kyc`,
      // providesTags: [tagTypes.kyc],
    }),
  }),
});

export const {
  useGetSingleUserKycQuery,
  useUpdateKycRequestMutation,
  useUpdateStatusBySuperAdminKycRequestMutation,
  useGetAllKycRequestQuery,
  useMakeKycRequestMutation,
} = kycApi;

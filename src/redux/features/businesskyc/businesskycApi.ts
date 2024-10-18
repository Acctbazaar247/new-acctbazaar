import { getCacheKeys } from "../account/account.cacheKey.manager";
import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";

export const kycApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeBusinessKycRequest: builder.mutation({
      query: (info) => {
        return {
          url: "/business-kyc",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.businessKyc],
    }),
    updateBusinessKycRequest: builder.mutation({
      query: (info) => {
        return {
          url: `/business-kyc/${info?.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.businessKyc],
    }),
    updateStatusBySuperAdminBusinessKycRequest: builder.mutation({
      query: (info) => {
        return {
          url: `/business-kyc/${info?.id}`,
          method: "PATCH",
          body: info,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // Optimistic update: update the cache before the request completes
        const cacheKeys = getCacheKeys();
        // console.log(cacheKeys);
        const patchResults = cacheKeys.map((key) =>
          dispatch(
            kycApi.util.updateQueryData(
              "getAllBusinessKycRequest",
              key,
              (draft) => {
                // console.log(key, JSON.parse(JSON.stringify(draft)));
                const index = draft.data.findIndex(
                  (kycReq: any) => kycReq?.id === arg.id
                );
                if (index !== -1) {
                  draft.data[index] = { ...draft.data[index], ...arg }; // Update the account with new data
                }
              }
            )
          )
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchResults.forEach((patchResult) => patchResult.undo()); // Revert optimistic update if the request fails
        }
      },
    }),
    getAllBusinessKycRequest: builder.query({
      query: (query) => `/business-kyc?${query}`,
      providesTags: [tagTypes.businessKyc],
    }),
    getSingleUserBusinessKyc: builder.query({
      query: () => `/business-kyc/single-user-business-kyc`,
      // providesTags: [tagTypes.kyc],
    }),
  }),
});

export const {
  useGetAllBusinessKycRequestQuery,
  useGetSingleUserBusinessKycQuery,
  useMakeBusinessKycRequestMutation,
  useUpdateBusinessKycRequestMutation,
  useUpdateStatusBySuperAdminBusinessKycRequestMutation,
} = kycApi;

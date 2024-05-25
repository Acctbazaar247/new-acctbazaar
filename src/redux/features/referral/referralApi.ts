import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";

export const referralApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReferral: builder.query({
      query: (query) => `/referral?${query}`,
      providesTags: [tagTypes.referral],
    }),

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

    getSingleUserKyc: builder.query({
      query: () => `/kyc/single-user-kyc`,
      providesTags: [tagTypes.kyc],
    }),
  }),
});

export const {
  useGetSingleUserKycQuery,
  useUpdateKycRequestMutation,
  useGetAllReferralQuery,
  useMakeKycRequestMutation,
} = referralApi;

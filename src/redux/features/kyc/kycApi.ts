import { apiSlice } from "../apiSlice/apiSlice";

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
    }),
    getSingleUserKyc: builder.query({
      query: () => `/kyc/single-user-kyc`,
    }),
  }),
});

export const { useGetSingleUserKycQuery, useMakeKycRequestMutation } = kycApi;

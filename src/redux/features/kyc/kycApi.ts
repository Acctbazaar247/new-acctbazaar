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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          kycApi.util.updateQueryData(
            "getAllKycRequest",
            undefined,
            (draft) => {
              const kycData = draft?.data?.find(
                (single: any) => single.id === arg?.id
              );
              if (kycData) {
                kycData.status = arg?.status;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patch.undo();
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

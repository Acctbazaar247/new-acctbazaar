import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";

export const planApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlan: builder.query({
      query: (query) => `/plan?${query}`,
      providesTags: [tagTypes.plan],
    }),

    getCurrentPlan: builder.query({
      query: () => `/plan/get-my-plan`,
      providesTags: [tagTypes.plan],
    }),

    getUploadLeftOnCurrentPlan: builder.query({
      query: () => `/plan/get-how-many-upload-left`,
      providesTags: [tagTypes.plan],
    }),

    takeAPlan: builder.mutation({
      query: (info) => {
        return {
          url: "/plan",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.plan],
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
  }),
});

export const {
  useGetCurrentPlanQuery,
  useUpdateKycRequestMutation,
  useGetAllPlanQuery,
  useTakeAPlanMutation,
  useGetUploadLeftOnCurrentPlanQuery,
} = planApi;

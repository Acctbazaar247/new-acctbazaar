import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (query) => {
        return {
          url: `/review?${query}`,
        };
      },
      providesTags: [tagTypes.Review],
    }),
    getReviewById: builder.query({
      query: (id) => `/review/${id}`,
      providesTags: [tagTypes.Review],
    }),
    addReview: builder.mutation({
      query: (info) => {
        return {
          url: "/review",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.Review],
    }),
    editReview: builder.mutation({
      query: (info) => {
        return {
          url: `/reviews/${info._id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.Review],
    }),
    deleteReview: builder.mutation({
      query: (id) => {
        return {
          url: `/reviews/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.Review],
    }),
  }),
});
export const {
  useGetReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useEditReviewMutation,
  useGetReviewByIdQuery,
} = reviewApi;

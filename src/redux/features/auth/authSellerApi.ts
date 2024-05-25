import { apiSlice } from "../apiSlice/apiSlice";
export const authSellerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    becomeSeller: builder.mutation({
      query: (info) => {
        return {
          url: `/auth/become-seller`,
          method: "POST",
          body: info,
        };
      },
    }),
    becomeSellerWithWallet: builder.mutation({
      query: () => {
        return {
          url: `/auth/become-seller-with-wallet`,
          method: "POST",
        };
      },
    }),
    changePassword: builder.mutation({
      query: (info) => {
        return {
          url: `/auth/change-password`,
          method: "POST",
          body: info,
        };
      },
    }),
    enterForgotOtp: builder.mutation({
      query: (arg) => {
        return {
          url: "/auth/verify-forgot-token",
          method: "POST",
          body: arg,
        };
      },
    }),
  }),
});

export const {
  useBecomeSellerMutation,
  useBecomeSellerWithWalletMutation,
  useEnterForgotOtpMutation,
  useChangePasswordMutation,
} = authSellerApi;

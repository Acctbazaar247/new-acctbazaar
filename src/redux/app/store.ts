import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice/apiSlice";
import { useDispatch } from "react-redux";
import authSlice from "../features/auth/authSlice";
import marketplaceSlice from "../features/marketplace/marketplaceSlice";
import categorySlice from "../features/categories/categorySlice";
import accountSlice from "../features/account/accountSlice";
import cartSlice from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: authSlice,
    marketplace: marketplaceSlice,
    categories: categorySlice,
    account: accountSlice,
    cart: cartSlice,
  },

  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

import {
  AccountCategory,
  AccountType,
  EApprovedForSale,
  IAccount,
  ICart,
  IOrder,
  IUser,
} from "@/types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  cartItems: {
    id: string;
    name: string;
    username: string;
    password: string;
    description: string;
    preview?: string;
    additionalEmail?: string;
    additionalPassword?: string;
    additionalDescription?: string;
    price: number;
    accountType: AccountType;
    category: AccountCategory;
    createdAt: Date;
    shouldSendEmail: boolean;
    isApprovedForSeller: boolean;
    updatedAt: Date;
    approvedForSale: EApprovedForSale;
    isSold: Boolean;
    ownById: string;
    ownBy?: IUser;
    Orders: IOrder[];
    quantity: number;
  }[];
  selectedCart: string[];
  selectedCount: number;
}

// Define the initial state using that type
const initialState: IInitialState = {
  cartItems: [],
  selectedCart: [],
  selectedCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<any>) => {
      state.cartItems.push(action.payload);
    },
    toggleCart: (state, action: PayloadAction<string>) => {
      const cart = action.payload;
      const index = state.selectedCart.indexOf(cart);
      if (index === -1) {
        state.selectedCart.push(cart);
        state.selectedCount++;
      } else if (index !== -1) {
        state.selectedCart.splice(index, 1);
        state.selectedCount--;
      }
    },
    toggleSelectAll: (state) => {
      if (state.selectedCart.length === state.cartItems.length) {
        // If all items are already selected, clear the selection
        state.selectedCart = [];
        state.selectedCount = 0;
      } else {
        // Otherwise, select all items
        state.selectedCart = state.cartItems.map((item) => item.id);
        state.selectedCount = state.cartItems.length;
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== idToRemove
      );
    },
    clearSelectedCart: (state) => {
      state.selectedCart = [];
      state.selectedCount = 0;
    },
  },
});

export const {
  addCart,
  clearSelectedCart,
  toggleCart,
  removeItemFromCart,
  toggleSelectAll,
} = cartSlice.actions;

export default cartSlice.reducer;

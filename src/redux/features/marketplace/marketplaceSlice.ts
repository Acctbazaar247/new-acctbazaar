import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  minPrice: number;
  maxPrice: number;
}

// Define the initial state using that type
const initialState: IInitialState = {
  minPrice: 0,
  maxPrice: 1000,
};

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setPrice: (
      state,
      action: PayloadAction<{ minPrice: number; maxPrice: number }>
    ) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
  },
});

export const { setPrice } = marketplaceSlice.actions;
export default marketplaceSlice.reducer;

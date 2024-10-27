import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  minPrice: number;
  maxPrice: number;
  modalOpen: boolean;
}

// Define the initial state using that type
const initialState: IInitialState = {
  modalOpen: false,
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
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
  },
});

export const { setPrice, setModalOpen } = marketplaceSlice.actions;
export default marketplaceSlice.reducer;

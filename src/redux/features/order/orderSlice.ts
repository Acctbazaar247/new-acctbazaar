import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {}

// Define the initial state using that type
const initialState: IInitialState = {};

export const orderSlice = createSlice({
  name: "order",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<any>) => {},
  },
});

export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;

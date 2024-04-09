 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const currencySlice = createSlice({
  name: "currency",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;

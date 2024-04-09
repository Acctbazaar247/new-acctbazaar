 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const currencyRequestSlice = createSlice({
  name: "currencyRequest",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setCurrencyRequest: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setCurrencyRequest } = currencyRequestSlice.actions;

export default currencyRequestSlice.reducer;

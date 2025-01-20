 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const manualCurrencyRequestSlice = createSlice({
  name: "manualCurrencyRequest",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setManualCurrencyRequest: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setManualCurrencyRequest } = manualCurrencyRequestSlice.actions;

export default manualCurrencyRequestSlice.reducer;

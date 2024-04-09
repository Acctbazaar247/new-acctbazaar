 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const withdrawFundSlice = createSlice({
  name: "withdrawFund",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setWithdrawFund: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setWithdrawFund } = withdrawFundSlice.actions;

export default withdrawFundSlice.reducer;

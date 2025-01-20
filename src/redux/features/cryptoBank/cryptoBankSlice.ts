 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const cryptoBankSlice = createSlice({
  name: "cryptoBank",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setCryptoBank: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setCryptoBank } = cryptoBankSlice.actions;

export default cryptoBankSlice.reducer;

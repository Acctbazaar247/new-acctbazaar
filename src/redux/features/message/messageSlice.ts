 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const messageSlice = createSlice({
  name: "message",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;

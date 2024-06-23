 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const reviewSlice = createSlice({
  name: "review",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setReview: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setReview } = reviewSlice.actions;

export default reviewSlice.reducer;

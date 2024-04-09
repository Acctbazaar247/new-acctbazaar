 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const notificationsSlice = createSlice({
  name: "notifications",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  selectedCategories: string[];
  selectedCount: number;
}

const initialState: IInitialState = {
  selectedCategories: [],
  selectedCount: 0,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.selectedCategories.indexOf(category);
      if (index === -1) {
        state.selectedCategories.push(category);
        state.selectedCount++;
      } else if (index !== -1) {
        state.selectedCategories.splice(index, 1);
        state.selectedCount--;
      }
    },
    clearSelectedCategories: (state) => {
      state.selectedCategories = [];
      state.selectedCount = 0;
    },
  },
});

export const { toggleCategory, clearSelectedCategories } =
  categorySlice.actions;
export default categorySlice.reducer;

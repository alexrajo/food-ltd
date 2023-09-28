import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Confinement {
  sortingPreference: string;
  filters: string[];
}

const initialState: Confinement = {
  sortingPreference: 'none',
  filters: [],
};

export const confinementReducer = createSlice({
  name: 'themeReducer',
  initialState,
  reducers: {
    setSortingPreference: (state, action: PayloadAction<string>) => {
      state.sortingPreference = action.payload;
    },
    setFilters: (state, action: PayloadAction<Array<string>>) => {
      state.filters = action.payload;
    },
    addFilter: (state, action: PayloadAction<string>) => {
      state.filters = [...state.filters, action.payload];
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      state.filters = state.filters.filter((filter) => filter !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSortingPreference, setFilters, addFilter, removeFilter } =
  confinementReducer.actions;

export default confinementReducer.reducer;

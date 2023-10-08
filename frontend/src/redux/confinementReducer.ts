import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Confinement {
  sortingPreference: string;
  includingFilters: string[];
  excludingFilters: string[];
  keyWord: string;
}

const initialState: Confinement = {
  sortingPreference: 'none',
  includingFilters: [],
  excludingFilters: [],
  keyWord: '',
};

export const confinementReducer = createSlice({
  name: 'themeReducer',
  initialState,
  reducers: {
    setSortingPreference: (state, action: PayloadAction<string>) => {
      state.sortingPreference = action.payload;
    },
    includeFilter: (state, action: PayloadAction<string>) => {
      state.includingFilters = [...state.includingFilters, action.payload];
    },
    removeIncludedFilter: (state, action: PayloadAction<string>) => {
      state.includingFilters = state.includingFilters.filter((filter) => filter !== action.payload);
    },
    excludeFilter: (state, action: PayloadAction<string>) => {
      state.excludingFilters = [...state.excludingFilters, action.payload];
    },
    removeExcludedFilter: (state, action: PayloadAction<string>) => {
      state.excludingFilters = state.excludingFilters.filter((filter) => filter !== action.payload);
    },
    resetAllFilters: (state) => {
      state.includingFilters = [];
      state.excludingFilters = [];
    },
    setKeyWord: (state, action: PayloadAction<string>) => {
      state.keyWord = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSortingPreference,
  includeFilter,
  removeIncludedFilter,
  excludeFilter,
  removeExcludedFilter,
  setKeyWord,
  resetAllFilters,
} = confinementReducer.actions;

export default confinementReducer.reducer;

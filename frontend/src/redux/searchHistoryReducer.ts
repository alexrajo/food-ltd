import { createSlice } from '@reduxjs/toolkit';

interface SearchHistory {
  value: string[];
}

const initialState: SearchHistory = {
  value: [],
};

export const searchHistoryReducer = createSlice({
  name: 'searchHistoryReducer',
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    removeSearch: (state, action) => {
      state.value = state.value.filter((search) => search !== action.payload);
    },
    resetSearch: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSearch, removeSearch, resetSearch } = searchHistoryReducer.actions;

export default searchHistoryReducer.reducer;

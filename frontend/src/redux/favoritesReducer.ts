import { createSlice } from '@reduxjs/toolkit';

interface Favorites {
  value: string[];
}

const initialState: Favorites = {
  value: [],
};

export const favoritesReducer = createSlice({
  name: 'favoritesReducer',
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
export const { addSearch, removeSearch, resetSearch } = favoritesReducer.actions;

export default favoritesReducer.reducer;

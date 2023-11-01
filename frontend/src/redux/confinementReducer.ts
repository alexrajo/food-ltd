import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Ingredient } from 'src/types/types'

export interface Confinement {
  sortingPreference: 'A-Z' | 'Rating' | 'Popular'
  includedIngredients: Ingredient[]
  excludedIngredients: Ingredient[]
  keyWord: string
}

const initialState: Confinement = {
  sortingPreference: 'Popular',
  includedIngredients: [],
  excludedIngredients: [],
  keyWord: '',
}

export const confinementReducer = createSlice({
  name: 'themeReducer',
  initialState,
  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.keyWord = action.payload
    },
    setSortingPreference: (state, action: PayloadAction<string>) => {
      state.sortingPreference = action.payload
    },
    includeFilter: (state, action: PayloadAction<Ingredient>) => {
      state.includedIngredients = [...state.includedIngredients, action.payload]
    },
    removeIncludedFilter: (state, action: PayloadAction<Ingredient>) => {
      state.includedIngredients = state.includedIngredients.filter(
        (filter) => filter.id !== action.payload.id,
      )
    },
    excludeFilter: (state, action: PayloadAction<Ingredient>) => {
      state.excludedIngredients = [...state.excludedIngredients, action.payload]
    },
    removeExcludedFilter: (state, action: PayloadAction<Ingredient>) => {
      state.excludedIngredients = state.excludedIngredients.filter(
        (filter) => filter.id !== action.payload.id,
      )
    },
    resetAllFilters: (state) => {
      state.includedIngredients = []
      state.excludedIngredients = []
    },
    setKeyWord: (state, action: PayloadAction<string>) => {
      state.keyWord = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setSortingPreference,
  includeFilter,
  removeIncludedFilter,
  excludeFilter,
  removeExcludedFilter,
  setKeyWord,
  resetAllFilters,
} = confinementReducer.actions

export default confinementReducer.reducer

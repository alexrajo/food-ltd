import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface Confinement {
  sortingPreference: string
  includedIngredients: string[]
  excludedIngredients: string[]
  keyWord: string
}

const initialState: Confinement = {
  sortingPreference: 'none',
  includedIngredients: [],
  excludedIngredients: [],
  keyWord: '',
}

export const confinementReducer = createSlice({
  name: 'themeReducer',
  initialState,
  reducers: {
    setSortingPreference: (state, action: PayloadAction<string>) => {
      state.sortingPreference = action.payload
    },
    includeFilter: (state, action: PayloadAction<string>) => {
      state.includedIngredients = [...state.includedIngredients, action.payload]
    },
    removeIncludedFilter: (state, action: PayloadAction<string>) => {
      state.includedIngredients = state.includedIngredients.filter(
        (filter) => filter !== action.payload,
      )
    },
    excludeFilter: (state, action: PayloadAction<string>) => {
      state.excludedIngredients = [...state.excludedIngredients, action.payload]
    },
    removeExcludedFilter: (state, action: PayloadAction<string>) => {
      state.excludedIngredients = state.excludedIngredients.filter(
        (filter) => filter !== action.payload,
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

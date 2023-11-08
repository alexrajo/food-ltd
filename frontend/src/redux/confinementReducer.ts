import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Ingredient } from 'src/types/types'

export type SortingPreference = 'A-Z' | 'Rating' | 'Popular'

export interface Confinement {
  sortingPreference: SortingPreference
  includedIngredients: Ingredient[]
  excludedIngredients: Ingredient[]
  keyWord: string
  page: number
}

const initialState: Confinement = {
  sortingPreference: 'Popular',
  includedIngredients: [],
  excludedIngredients: [],
  keyWord: '',
  page: 1,
}

export const confinementReducer = createSlice({
  name: 'themeReducer',
  initialState,
  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.page = 1
      state.keyWord = action.payload
    },
    setSortingPreference: (state, action: PayloadAction<SortingPreference>) => {
      state.page = 1
      state.sortingPreference = action.payload
    },
    includeFilter: (state, action: PayloadAction<Ingredient>) => {
      state.page = 1
      state.includedIngredients = [...state.includedIngredients, action.payload]
    },
    removeIncludedFilter: (state, action: PayloadAction<Ingredient>) => {
      state.page = 1
      state.includedIngredients = state.includedIngredients.filter(
        (filter) => filter.id !== action.payload.id,
      )
    },
    excludeFilter: (state, action: PayloadAction<Ingredient>) => {
      state.page = 1
      state.excludedIngredients = [...state.excludedIngredients, action.payload]
    },
    removeExcludedFilter: (state, action: PayloadAction<Ingredient>) => {
      state.page = 1
      state.excludedIngredients = state.excludedIngredients.filter(
        (filter) => filter.id !== action.payload.id,
      )
    },
    resetAllFilters: (state) => {
      state.includedIngredients = []
      state.excludedIngredients = []
    },
    setKeyWord: (state, action: PayloadAction<string>) => {
      state.page = 1
      state.keyWord = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
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
  setPage,
} = confinementReducer.actions

export default confinementReducer.reducer

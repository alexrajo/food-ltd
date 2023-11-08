import { createSlice } from '@reduxjs/toolkit'

interface History {
  value: string[]
}

const initialState: History = {
  value: [],
}

export const historyReducer = createSlice({
  name: 'historyReducer',
  initialState,
  reducers: {
    addToSearch: (state, action) => {
      state.value = [...state.value, action.payload]
    },
    removeFromSearch: (state, action) => {
      state.value = state.value.filter((search) => search !== action.payload)
    },
    resetSearch: (state) => {
      state.value = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToSearch, removeFromSearch, resetSearch } =
  historyReducer.actions

export default historyReducer.reducer

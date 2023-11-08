import { createSlice } from '@reduxjs/toolkit'

interface Theme {
  value: 'light' | 'dark'
}

const initialState: Theme = {
  value: 'dark',
}

export const themeReducer = createSlice({
  name: 'themeReducer',
  initialState,
  reducers: {
    setDark: (state) => {
      state.value = 'dark'
    },
    setLight: (state) => {
      state.value = 'light'
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDark, setLight } = themeReducer.actions

export default themeReducer.reducer

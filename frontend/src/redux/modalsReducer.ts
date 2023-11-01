import { createSlice } from '@reduxjs/toolkit'

interface Modals {
  filterMenu: boolean
  navbar: boolean
}

const initialState: Modals = {
  filterMenu: false,
  navbar: false,
}

export const modalsReducer = createSlice({
  name: 'modalsReducer',
  initialState,
  reducers: {
    openFilterMenu: (state) => {
      state.filterMenu = true
    },
    closeFilterMenu: (state) => {
      state.filterMenu = false
    },
    openNavbar: (state) => {
      state.navbar = true
    },
    closeNavbar: (state) => {
      state.navbar = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { openFilterMenu, closeFilterMenu, openNavbar, closeNavbar } =
  modalsReducer.actions

export default modalsReducer.reducer

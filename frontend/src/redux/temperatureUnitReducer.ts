import { createSlice } from '@reduxjs/toolkit';

interface TemperatureUnit {
  value: 'fahrenheit' | 'celsius';
}

const initialState: TemperatureUnit = {
  value: 'fahrenheit',
};

export const temperatureUnitReducer = createSlice({
  name: 'temperatureUnitReducer',
  initialState,
  reducers: {
    setFahrenheit: (state) => {
      state.value = 'fahrenheit';
    },
    setCelsius: (state) => {
      state.value = 'celsius';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFahrenheit, setCelsius } = temperatureUnitReducer.actions;

export default temperatureUnitReducer.reducer;

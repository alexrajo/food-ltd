/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#5fd14f',
        'primary-text': '#000000',
        'grayed-text': '#9ca399',
        selected: '#5fd14f',
      },
    },
  },
  plugins: [],
};

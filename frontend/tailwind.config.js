/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#7acc5c',
        'primary-text': '#000000',
        'grayed-text': '#9ca399',
        selected: '#7acc5c',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-text': '#000000',
        'grayed-text': '#9ca399',
      },
    },
  },
  plugins: [],
};

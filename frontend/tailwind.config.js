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
        primary: '#FBE6BB',
        secondary: '#E38A35',
        tulip: '#EFB33C',
        flame: '#D7582C',
        oldbrick: '#8A2120',
        primarydark: '#212121',
        secondarydark: '#424242',
        tertiarydark: '#616161',
      },
    },
  },
  plugins: [],
}

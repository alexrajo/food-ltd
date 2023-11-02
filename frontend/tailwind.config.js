/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        //secondary: '#5fd14f',
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
        error: '#B00020',
        errordark: '#D32F2F',
        success: '#388E3C',
      },
    },
  },
  plugins: [],
}

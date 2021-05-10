const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      sm: '0 1px 2px 0rgba(134, 118, 255, 0.5)',
      DEFAULT: '0 1px 3px 0 rgba(134, 118, 255, 0.21), 0 1px 2px 0 rgba(134, 118, 255, 0.06)',
      md: '0 4px 6px -1px rgba(134, 118, 255, 0.21), 0 2px 4px -1px rgba(134, 118, 255, 0.06)',
      lg: '0 10px 15px -3px rgba(134, 118, 255, 0.21), 0 4px 6px -2px rgba(134, 118, 255, 0.5)',
      xl: '0 20px 25px -5px rgba(134, 118, 255, 0.1), 0 10px 10px -5px rgba(134, 118, 255, 0.08)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
     '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(134, 118, 255, 0.06)',
      none: 'none',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      nightBlue: {
        DEFAULT: '#383874',
      },
      purpleHeart: {
        DEFAULT: '#8676FF',
      }, 
      briches: {
        DEFAULT: '#023AFF'
      },
      lightBlue: {
        default:'#EEF1FA',
        rect: '#D5D7EE'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

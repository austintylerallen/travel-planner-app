// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#006400', // Dark Green
        'primary-dark': '#004d00',
        'primary-light': '#009900',
        secondary: '#228B22', // Forest Green
        'secondary-dark': '#006400',
        'secondary-light': '#32CD32',
        accent: '#8B4513', // Saddle Brown
        'accent-dark': '#5D3A00',
        'accent-light': '#D2B48C',
        light: '#F5FFFA', // Mint Cream
        dark: '#2F4F4F', // Dark Slate Gray
        white: '#FFFFFF',
        gray: {
          100: '#F0FFF0',
          200: '#D3D3D3',
          300: '#A9A9A9',
          400: '#696969',
          500: '#808080',
          600: '#666666',
          700: '#4F4F4F',
          800: '#2F4F4F',
          900: '#1C1C1C',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

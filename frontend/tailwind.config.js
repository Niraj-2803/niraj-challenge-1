// /frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JSX and TSX files
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      fontFamily: {
        times: ['Times New Roman', 'serif'],
      },
      colors: {
        customGray: '#282828', // Add the custom grey color
        customBlue: '#76ABAE',
        customHover : '#585858'
    },},
  },
  plugins: [],
};

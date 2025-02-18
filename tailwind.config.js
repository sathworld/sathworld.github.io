/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using class strategy
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'purple-light': {
          DEFAULT: '#E0BBE4',
          dark: '#957DAD',
          contrast: '#D291BC'
        },
        'purple-dark': {
          DEFAULT: '#2A1A40',
          light: '#472D60',
          contrast: '#9145b6'
        }
      }
    },
  },
  plugins: [],
};
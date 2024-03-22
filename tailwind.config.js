/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
      },
      fontFamily: {
        'title': ['Rubik Doodle Triangles', 'serif'],
      },
      boxShadow: {
        '3xl': '0 0 50px -25px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}


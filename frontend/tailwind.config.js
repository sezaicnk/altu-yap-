/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFD700',
          dark: '#111111',
          gray: '#333333',
          light: '#F5F5F5'
        }
      }
    },
  },
  plugins: [],
}

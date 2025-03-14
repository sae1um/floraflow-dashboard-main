/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "card-image": "url('/src/image/image 7.png')"
      }
    },
  },
  plugins: [],
}


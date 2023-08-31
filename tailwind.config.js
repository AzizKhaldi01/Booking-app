/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      custom: ['CustomFont', 'Fira Sans'],
    },
    extend: {
      colors: {
        main:'#578280'

      },
    },
  },
  plugins: [],
}

 
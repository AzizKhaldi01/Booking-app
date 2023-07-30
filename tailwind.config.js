/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      custom: ['CustomFont', 'Roboto_Slab'],
    },
    extend: {
      colors: {
        primary: '#00241B',
        secondary: '#4E878C',
        tertiary: '#65B891',
        quaternary: '#93E5AB',


      },
    },
  },
  plugins: [],
}

// colores 

// #00241B
// #4E878C
// #65B891
// #93E5AB
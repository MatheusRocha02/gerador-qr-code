/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#66B2FF',
        secondary: '#6C757D',
      }, 
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #A0D3E8, #E0F7FA)'
      },
      fontFamily: {
        ibm: ['"IBM Plex Sans", "sans-serif"']
      }
      
    },
  },
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
}


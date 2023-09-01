/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ['./src/**/*.{svelte,html,js}'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },

    fontFamily: {
      ubuntu: ['Ubuntu', 'Arial', 'Noto Sans', 'sans-serif']
    },

    extend: {
      colors: {
        jt: {
          primary: '#63CBCF',
          secondary: '#ECF6F6',

          red: '#D34836',

          blue: '#1A91F0',

          black: '#2B2B2B',

          gray: {
            400: '#828BA2',
            300: '#9FA6BB',
            200: '#BEC4D5',
            100: '#E7EAF4'
          }
        }
      }
    }
  },
  plugins: []
}

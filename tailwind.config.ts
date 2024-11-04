import { content, darkMode, plugin, screens } from 'shared/config/tailwindcss'

export default {
  content,
  darkMode,
  theme: {
    screens,
  },

  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.card-shadow': {
          border: '1px solid #fff',
          'transition-duration': '0.2s',
          'box-shadow': '0 0.3rem 0.8rem rgba(0, 0, 0, 0.12)',

          '&:hover': {
            border: '1px solid rgba(0, 0, 0, 0.12)',
            'box-shadow': '0 0.3rem 1.2rem rgba(0, 0, 0, 0.2)',
          },
        },
      })
    }),
  ],
}

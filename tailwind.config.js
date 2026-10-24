/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0A',
          red: '#CC0000',
          'red-dark': '#AA0000',
          'red-light': '#E53535',
          white: '#FFFFFF',
          gray: {
            50: '#F9F9F9',
            100: '#F0F0F0',
            200: '#E0E0E0',
            300: '#C0C0C0',
            400: '#9E9E9E',
            500: '#6B6B6B',
            600: '#4A4A4A',
            700: '#333333',
            800: '#1E1E1E',
            900: '#111111',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

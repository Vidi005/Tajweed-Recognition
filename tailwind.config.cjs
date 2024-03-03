/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      'lpmq-isep-misbah': ['LPMQ-IsepMisbah']
    }
  },
  plugins: [],
  darkMode: 'class',
  variants: {
    extend: {
      backgroundColor: ['dark', 'dark:hover', 'content-dark', 'content-dark:hover'],
      textColor: ['dark', 'dark:hover', 'content-dark', 'content-dark:hover']
    }
  }
}

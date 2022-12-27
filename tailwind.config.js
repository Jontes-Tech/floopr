/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["content/**/*.md", "layouts/**/*.html", "content/**/*.html"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        darkGreen: '#2c3923',
        lightGreen: '#616d40',
        milkWhite: '#fcfadf',
        lightOrange: '#dfa066',
        darkOrange: '#bf6d35',
      }
    },
  },
  plugins: [],
};

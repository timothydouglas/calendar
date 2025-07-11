/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'color-default': '#5c6bc0',
        'color-1': '#616161',
        'color-2': '#ff5733',
        'color-3': '#8e24aa',
        'color-4': '#f48fb1',
        'color-5': '#7cb342',
        'color-6': '#90caf9',
        'color-7': '#80deea',
        'color-8': '#ffea00',
        'color-9': '#8d6e63',
        'color-10': '#f44336',
        'color-11': '#eceff1'
      },
      fontFamily: {
        sans: ['Open Sans', 'Roboto']
      },
      gridTemplateColumns: {
        '1/5': '1fr 5fr'
      }
    }
  },
  // we're not explicit with the predefined colors,
  // so we need to manually include them
  safelist: [{ pattern: /bg-color-.*/ }],
  plugins: [],
  important: '#root'
};

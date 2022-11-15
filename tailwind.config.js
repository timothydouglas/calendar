/** @type {(tailwindConfig: object) => object} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans']
      },
      gridTemplateColumns: {
        '1/5': '1fr 5fr'
      }
    },
  },
  plugins: [],
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        first: '#222831',
        second: '#393E46',
        lsecond: '#454b54',
        lfirst: '#00ADB5',
        tfirst: '#e2e2e2', // text first
        tsecond: '#818181', // text second
      },
    },
  },
  plugins: [],
};

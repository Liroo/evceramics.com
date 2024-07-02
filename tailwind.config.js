const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-brut)'],
        romie: ['var(--font-romie)'],
      },
      colors: {
        clay: {
          DEFAULT: '#D7D3CA',
          dark: '#8F877A',
        },
        mud: {
          DEFAULT: '#241409',
        },
      },
      width: {
        tablet: '640px',
        laptop: '1024px',
        desktop: '1440px',
      },
      maxWidth: {
        tablet: '640px',
        laptop: '1024px',
        desktop: '1440px',
      },
      screens: {
        tablet: '640px',
        laptop: '1024px',
        desktop: '1440px',
        'pointer-fine': { raw: '(pointer: fine)' },
        'pointer-coarse': { raw: '(pointer: coarse)' },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};

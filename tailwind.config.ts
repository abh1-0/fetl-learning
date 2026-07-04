declare const require: any;
const typography = require('@tailwindcss/typography');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [typography],
};



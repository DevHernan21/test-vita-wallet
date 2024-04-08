/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        black: "#010E11",
        gray1: "#B9C1C2",
        gray2: "#DEE0E0",
        gray3: "#F5F6F6",
        white: "#F9F9FA",
        blue1: "#167287",
        blue2: "#05BCB9",
        red: "#CE3434"
      },
      fontFamily: {
        display: ["Open Sans", "sans-serif"],
      },
      height: {
        '88': '5.5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}


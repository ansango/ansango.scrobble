// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xs": "320px",
        xs: "480px",
      },
      fontFamily: {
        sans: ["var(--sans)", ...fontFamily.sans],
        serif: ["var(--serif)", ...fontFamily.serif],
        display: ["var(--display)", ...fontFamily.sans],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      textColor: {
        default: "var(--color-text)",
        offset: "var(--color-text-offset)",
        "primary-light": "var(--color-text-primary-light)",
        "primary-dark": "var(--color-text-primary-dark)",
        "secondary-light": "var(--color-text-secondary-light)",
        "secondary-dark": "var(--color-text-secondary-dark)",
      },
      backgroundColor: {
        default: "var(--color-background)",
        offset: "var(--color-background-offset)",
        soft: "var(--color-background-soft)",
        "soft-offset": "var(--color-background-soft-offset)",
        hard: "var(--color-background-hard)",
        alternative: "var(--color-background-alternative)",
        "alternative-offset": "var(--color-background-alternative-offset)",
        "alternative-hard": "var(--color-background-alternative-hard)",
      },
      borderColor: {
        default: "var(--color-border)",
        primary: "var(--color-border-primary)",
        secondary: "var(--color-border-secondary)",
        "primary-light": "var(--color-border-primary-light)",
        "primary-dark": "var(--color-border-primary-dark)",
        "secondary-light": "var(--color-border-secondary-light)",
        "secondary-dark": "var(--color-border-secondary-dark)",
      },
      gradientColorStops: {
        default: "var(--color-gradient)",
        offset: "var(--color-gradient-offset)",
        soft: "var(--color-gradient-soft)",
        "soft-offset": "var(--color-gradient-soft-offset)",
        alternative: "var(--color-gradient-alternative)",
        "alternative-offset": "var(--color-gradient-alternative-offset)",
        "primary-light": "var(--color-text-primary-light)",
        "primary-dark": "var(--color-text-primary-dark)",
        "secondary-light": "var(--color-text-secondary-light)",
        "secondary-dark": "var(--color-text-secondary-dark)",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwindcss-fluid-type")({
      settings: {
        fontSizeMin: 1.125, // 1.125rem === 18px
        fontSizeMax: 1.25, // 1.25rem === 20px
        ratioMin: 1.125, // Multiplicator Min
        ratioMax: 1.2, // Multiplicator Max
        screenMin: 20, // 20rem === 320px
        screenMax: 96, // 96rem === 1536px
        unit: "rem", // default is rem but it's also possible to use 'px'
        prefix: "", // set a prefix to use it alongside the default font sizes
      },
      values: {
        xs: [-2, 1.6],
        sm: [-1, 1.6],
        base: [0, 1.6],
        lg: [1, 1.6],
        xl: [2, 1.2],
        "2xl": [3, 1.2],
        "3xl": [4, 1.2],
        "4xl": [5, 1.1],
        "5xl": [6, 1.1],
        "6xl": [7, 1.1],
        "7xl": [8, 1],
        "8xl": [9, 1],
        "9xl": [10, 1],
      },
    }),
    require("@tailwindcss/typography"),
  ],
};

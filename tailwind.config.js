/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B5CF6",
          50: "#F5EEFF",
          100: "#EDE3FF",
          200: "#D9C6FF",
          300: "#C4A8FF",
          400: "#A678FF",
          500: "#8B5CF6",
          600: "#7B4DE6",
          700: "#6B3DD6",
          800: "#5A2DC6",
          900: "#4A1DB6",
        },
        mauve: {
          DEFAULT: "#1A1523",
          50: "#F4F2F6",
          100: "#E6E2EB",
          200: "#C9C1D0",
          300: "#ADA6B7",
          400: "#8F8A9E",
          500: "#706F85",
          600: "#5A536C",
          700: "#433754",
          800: "#2D1B3B",
          900: "#1A1523",
        },

        background: {
          light: "#FFFFFF",
          dark: "#0E0E0E",
        },
        border: {
          subtle: "#6602d0ff",
          subtle20: "#F1E6FD30",
          testBlue: "#00AEEF",
          testGreen: "#00FF99",
        },
        text: {
          primary: {
            light: "#1A1523",
            dark: "#FFFFFF",
          },
          secondary: {
            light: "#706F85",
            dark: "#B5B2BC",
          },
        },
      },

      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

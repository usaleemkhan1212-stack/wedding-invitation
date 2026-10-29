import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        royal: {
          50: "#F8F4FC",
          100: "#F0E7FA",
          200: "#DFCDF2",
          300: "#C5A8E5",
          400: "#A27AD2",
          500: "#8154BC",
          600: "#6A3FA1",
          700: "#563285",
          800: "#43286A",
          900: "#2F1B4C",
          950: "#1E0F33",
        },
        gold: {
          100: "#F7EFDD",
          200: "#EEDFBC",
          300: "#E2CA96",
          400: "#D2B278",
          500: "#BF9A5C",
          600: "#A07D45",
          700: "#7D6034",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        script: ["var(--font-script)", "Great Vibes", "cursive"],
        urdu: [
          "var(--font-nastaliq)",
          "Jameel Noori Nastaleeq",
          "Urdu Typesetting",
          "Noto Nastaliq Urdu",
          "Noto Naskh Arabic",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;

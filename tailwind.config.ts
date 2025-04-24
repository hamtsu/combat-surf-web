import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "bounce-right": "bounce-right 1s infinite",
        "bounce-left": "bounce-left 1s infinite",
        "wiggle": "wiggle 1s infinite",
        "fadeIn": 'fadeIn 0.5s ease-out forwards',
        "fadeInFirst": 'fadeIn 0.5s ease-out 2s forwards',
        "fadeInSecond": 'fadeIn 0.5s ease-out 2.2s forwards',
        "fadeInThird": 'fadeIn 0.5s ease-out 2.4s forwards',
        "fadeInFourth": 'fadeIn 0.5s ease-out 2.6s forwards',
      },
      keyframes: {
        "bounce-right": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(2px)",
          },
        },
        "bounce-left": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(-2px)",
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        },
      },
      fadeIn: {
        '0%': { opacity: "0" },
        '100%': { opacity: "1" },
      }
    },
  },
  plugins: [],
};
export default config;


import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "dark-mode-content": "#000000",
        // "light-mode-content": "#ffffff",
        // "dark-mode-section": "#1e1e1e",
        // "light-mode-section": "#f4f4f4",
        // "light-body": "#ffffff",
        // "dark-body": "#121212",
      },
      backgroundColor: {
        "dark-mode": "#000000",
        "light-mode": "#ffffff",
        "dark-mode-section": "#1e1e1e",
        "light-mode-section": "#f4f4f4",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xxsm: "240px",
        xsm: "340px",
        sm: "640px",
        md: "760px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1440px",
        xxxl: "1700px",
        xxxxl: "2560px",
      },
      fontFamily: {
        BeVietnam: ['"Be Vietnam"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

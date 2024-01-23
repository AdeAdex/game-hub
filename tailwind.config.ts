import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xxsm: "240px",
        // => @media (min-width: 240px) { ... }
        xsm: "340px",
        // => @media (min-width: 340px) { ... }
        sm: "640px",
        // => @media (min-width: 640px) { ... }
        md: "760px",
        // => @media (min-width: 768px) { ... }
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
        xxl: "1440px",
        // => @media (min-width: 1440px) { ... }
        xxxl: "1700px",
        // => @media (min-width: 2040px) { ... }
        xxxxl: "2560px",
        // => @media (min-width: 2560px) { ... }
      },
      fontFamily: {
        BeVietnam: ['"Be Vietnam"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

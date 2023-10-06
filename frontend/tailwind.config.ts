import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

// Add withMT()
const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "0px",
        sm: "375px",
      },
      colors: {
        primaryBlue: "#000743",
        primaryBlack: "#03010F",
        bgGradient1: "#020126",
        bgGradient2: "#0A0140",
        sliderBG1: "#A0CFDF",
        sliderBG2: "#A6D4E3",
        sliderBG3: "#47968D",
        sliderBG4: "#589793",
        bgButton1: "#9835E5",
        bgButton2: "#1539A6",
        searchBorder: "#6252FF",
        searchText: "#5A558B",
        madeInColor: "#070137",
        darkBlue: "#080133",
        bgSocial: "#393461",
        customBlue: "rgba(0, 71, 255, 0.96)",
        bgCustomGradient1: "F6F6F6",
        bgCustomGradient2: "FAFAFA",
        customPurple: "#251F4A",
        customGray: "#393461",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
      boxShadow: {
        around: "0 0 20px 3px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        vanish: "vanish .5s",
        pingOnce: "pingOnce 0.4s",
      },
      keyframes: {
        vanish: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        pingOnce: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.5)" },
        },
      },
    },
  },
  plugins: [],
});
export default config;

/** @type {import('tailwindcss').Config} */
import { createThemes } from "tw-colors";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using src directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "custom-dvh": "calc(100dvh - 80px)",
        "custom-dvh-md": "calc(100dvh - 64px)",
        "custom-dvh-sm": "calc(100dvh - 56px)",
      },
      screens: {
        xxs: "385px",
        "3xl": "1600px",
      },
      // colors: {
      //   primary: "#FF5A35",
      //   textBlack: "#1B1818",
      //   textBlueBlack: "#1D2939",
      //   textBlueGrey: "#667085",
      //   textDarkGrey: "#403C3C",
      //   textGreyBlack: "#312F2F",
      //   textGrey: "#645D5D",
      //   darkishGrey: "#828282",
      //   whiteGrey: "#EFECEC",
      //   darkBg: "#252120",
      //   brown: "#B54708",
      //   khoyri: "#581203",
      //   biskutColor: "#A77207",
      //   zinc: "#98A2B3",
      //   blue: "#175CD3",
      //   yellowShadow: "#FFFAEB",
      //   yellowMore: "#FFFAEB",
      //   borderColor: "#D5D8DB",
      //   borderLight: "#F2F4F7",
      //   success: "#2AAE09",
      //   red: "#E11C1B",
      // },
      container: {
        center: true,
        padding: {
          //   DEFAULT: "1rem",
          // sm: "2rem",
          // lg: "2rem",
          xl: "2rem",
          "2xl": "1rem",
        },
      },
    },
  },
  plugins: [
    createThemes({
      light: {
        loader: "#000",
        background: "#ffffff",
        primary: "#FF5A35",
        textBlack: "#1B1818",
        textBlueBlack: "#1D2939",
        textBlueGrey: "#667085",
        textDarkGrey: "#403C3C",
        textGreyBlack: "#312F2F",
        textGrey: "#645D5D",
        darkishGrey: "#828282",
        whiteGrey: "#EFECEC",
        darkBg: "#252120",
        brown: "#B54708",
        khoyri: "#581203",
        biskutColor: "#A77207",
        zinc: "#98A2B3",
        blue: "#175CD3",
        yellowShadow: "#FFFAEB",
        yellowMore: "#FFFAEB",
        yellowyellow: "#FFDB94",
        borderColor: "#D5D8DB",
        borderLight: "#F2F4F7",
        success: "#2AAE09",
        red: "#E11C1B",
      },
      dark: {
        loader: "#FFFFFF",
        background: "#181C14",
        primary: "#FF5A35", // A brighter version of primary to stand out on dark backgrounds
        textBlack: "#EDEDED", // Lightened for better readability
        textBlueBlack: "#CBD5E1", // Lighter variant of blue-black
        textBlueGrey: "#94A3B8", // Softer blue-grey for text on dark backgrounds
        textDarkGrey: "#D1D5DB", // Lightened dark grey
        textGreyBlack: "#E2E2E2", // Light greyish black
        textGrey: "#9CA3AF", // Medium grey tone
        darkishGrey: "#4B5563", // Slightly darker grey
        whiteGrey: "#374151", // Darkened white-grey
        darkBg: "#1E1E1E", // Dark background
        brown: "#8D3610", // Darker brown
        khoyri: "#3C0A02", // Darker khoyri
        biskutColor: "#6A4E01", // Darkened biskut color
        zinc: "#52525B", // A darkened zinc
        blue: "#175CD3", // Brightened blue for contrast
        yellowShadow: "#1F2937", // Dark shadow tone
        yellowyellow: "#1f1501",
        yellowMore: "#FFEBCD", // Pale yellow for highlighting
        borderColor: "#374151", // Dark border
        borderLight: "#1F2937", // Even darker border for subtle effects
        success: "#22C55E", // Bright green for success
        red: "#DC2626", // Strong red for errors or alerts
      },
    }),
  ],
};

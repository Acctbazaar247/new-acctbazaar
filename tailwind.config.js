/** @type {import('tailwindcss').Config} */
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
      colors: {
        primary: "#FF5A35",
        textBlack: "#1B1818",
        textBlueBlack: "#1D2939",
        textDarkGrey: "#403C3C",
        textGreyBlack: "#312F2F",
        textGrey: "#645D5D",
        borderColor: "#D5D8DB",
        success: "#2AAE09",
        red: "#E11C1B",
      },
      container: {
        center: true,
        padding: {
          //   DEFAULT: "1rem",
          //   sm: "2rem",
          //   lg: "4rem",
          xl: "0rem",
          "2xl": "2rem",
        },
      },
    },
  },
  plugins: [],
};

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
      height: {
        "custom-dvh": "calc(100dvh - 80px)",
        "custom-dvh-md": "calc(100dvh - 64px)",
        "custom-dvh-sm": "calc(100dvh - 56px)",
      },
      colors: {
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
        borderColor: "#D5D8DB",
        borderLight: "#F2F4F7",
        success: "#2AAE09",
        red: "#E11C1B",
      },
      container: {
        center: true,
        padding: {
          //   DEFAULT: "1rem",
          // sm: "2rem",
          // lg: "2rem",
          xl: "2rem",
          "2xl": "2rem",
        },
      },
    },
  },
  plugins: [],
};

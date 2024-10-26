module.exports = {
  content: ["./src/**/*.{html,js}"],

  theme: {
    extend: {
      colors: {
        primary: "#f97316",
        secondary: "#1e1b4b",
        background01: "#E5E5E5",
        "rgba-6ab5d2-16": "rgba(255, 255, 255, 0.16)",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      spacing: {
        1: "4px",
      },
      backgroundImage: {
        homeimage01: "url('../src/assets/homeimage01.jpeg')",
        homeimage02: "url('../src/assets/homeimage02.jpeg')",
      },
      textShadow: {
        md: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        lg: "4px 4px 6px rgba(0, 0, 0, 0.75)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({
      preferredStrategy: "pseudoelements",
      nocompatible: true,
    }),
    require("tailwindcss-textshadow"),
  ],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        alegreya: "'Alegreya Sans', sans-serif", //For texts
        exo: "'Exo 2', sans-serif", //For headings
      },
      colors: {
        primary: "#1a73e8",
        secondary: "#49a3f1",
      },
    },
  },
  plugins: [require("daisyui")],
};

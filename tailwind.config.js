/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A5319",
        secondary: "#508D4E",
        tertiary: "#80AF81",
        quaternary: "#D6EFD8",
        brightLime: "#B1FF05",
      },
    },
  },
  plugins: [],
};

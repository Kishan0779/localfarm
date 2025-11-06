/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2e7d32",   // green theme
        accent: "#e8f5e9",    // light green
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        // Mercury Alpine Blue Hour Design Tokens
        "onyx-canvas": "#171721",
        "graphite-card": "#1e1e2a",
        "obsidian-button": "#272735",
        "slate-border": "#70707d",
        "mist-border": "#e2e3ed",
        "ash-text": "#c3c3cc",
        "ivory-text": "#ededf3",
        cobalt: "#5266eb",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
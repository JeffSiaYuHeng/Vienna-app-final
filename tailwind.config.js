/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
    "./widgets/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        C7CAF75: "#7CAF75",
        CF4FFF5: "#F4FFF5",
        C2B5708: "#2B5708",
        CC5ECBE: "#C5ECBE",
        C9BC17C: "#9BC17C",
        CEEDDA0: "#EEDDA0",
        C645623: "#645623",
        CDEE8B5: "#DEE8B5",
        CEFA8C2: "#EFA8C2",
        CE38D68: "#E38D68",
        C6D4731: "#6D4731",
        C87C17C: "#87C17C",
        CC17C7C: "#C17C7C",
        C186EE9: "#186EE9",
        C3B579D: "#3B579D",
        CEEAEA0: "#EEAEA0",
        C642323: "#642323",
        C73CEE2: "#73CEE2",
        C11434E: "#11434E",
        CFF7C7C: "#FF7C7C",
      },
      fontSize: {
        xxs: "9px",
      },
    },
  },
  plugins: [],
};


/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
  colors: {
  primary: {
  100: "#002930",
  300: "#002930",
  900: "#006922",
  200:"#D4AF37",
  150:"#f4ff93"
  },
  dark: {
  100: '#1a202c',
  200: '#2d3748',
  300: '#4a5568',
  400: '#718096',
  500: '#a0aec0',
  600: '#cbd5e0',
  700: '#e2e8f0',
  800: '#edf2f7',
  900: '#f7fafc',
  },
  },
  },
  },
  plugins: [],
  };

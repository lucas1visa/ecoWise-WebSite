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
  100: "#4e5664",
  300: "#818998",
  900: "#707887",
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

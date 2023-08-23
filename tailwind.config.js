import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
  extend: {
  colors: {
  primary: {

  201:"#b4debe",
  202:"#f0f0d8",
  203:"#77cca4",
  204:"#666666",
  205:"#0e2a0b",
  100: "#002930",
  300: "#002930",
  900: "#006922",
  200:"#D4AF37",
  150:"#f4ff93",
  151:"#f6eee0"
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
  })

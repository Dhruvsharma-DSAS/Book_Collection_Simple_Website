/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#FDF8F0",
          beige: "#F2E8D5",
          brown: "#8B5E3C",
          green: "#2D6A4F",
          gold: "#D4A017",
          night: {
            bg: "#0D1117",
            card: "#161B22",
            glow: "#1F6FEB",
          }
        }
      },
      fontFamily: {
        heading: ["Pacifico", "cursive"],
        body: ["Nunito", "sans-serif"],
        accent: ["Oleo Script", "cursive"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'warm': '0 4px 6px -1px rgba(139, 94, 60, 0.1), 0 2px 4px -1px rgba(139, 94, 60, 0.06)',
        'premium': '0 0 24px rgba(212, 160, 23, 0.35)',
      }
    },
  },
  plugins: [],
}

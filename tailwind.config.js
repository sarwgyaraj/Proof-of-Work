/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070b14',
          900: '#0c1222',
          850: '#101930',
          800: '#162244',
          700: '#213363',
          600: '#2f4886',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Indigo / violet accent
          600: '#4f46e5',
          700: '#4338ca',
        },
        violet: {
          500: '#8b5cf6',
          600: '#7c3aed',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(99, 102, 241, 0.25)',
        'glow-sm': '0 0 20px -5px rgba(99, 102, 241, 0.2)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}


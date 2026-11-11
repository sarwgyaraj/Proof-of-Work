/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Earthy Palette: Rich Charcoal & Deep Espresso for base/panels
        navy: {
          950: '#151311', // Deep Warm Espresso / Base background
          900: '#1D1A17', // Roasted Umber / Card surface
          850: '#24201C', // Warm Charcoal / Elevated surface
          800: '#2C2723', // Muted Deep Clay / Interactive borders & hover
          700: '#3D3631', // Earthy Border tone
          600: '#524942', // Soft Earthy Slate
        },
        // Warm Terracotta / Amber Earth Accent
        brand: {
          50: '#FBF8F5',  // Warm Ivory / Cream
          100: '#F5EFEB', // Soft Sand
          200: '#E8DCD3', // Natural Linen
          300: '#D5C1B2', // Warm Bisque
          400: '#C29B7F', // Sandstone Bronze
          500: '#B46E46', // Warm Terracotta Earth (Primary brand)
          600: '#9B5834', // Deep Terracotta
          700: '#7F4525', // Burnt Umber
          800: '#64361C', // Dark Earth
          900: '#4B2814',
          950: '#2E170A',
        },
        // Muted Sage / Moss Accent (replaces harsh violet)
        violet: {
          50: '#F4F6F4',
          100: '#E5EAE5',
          200: '#CCD7CC',
          300: '#A9BFA9',
          400: '#83A183',
          500: '#628362', // Muted Olive Sage
          600: '#4D6B4D', // Deep Forest Sage
          700: '#3C533C',
          800: '#2C3D2C',
          900: '#1E2B1E',
          950: '#121A12',
        },
        // Warm Earth Slate for text and subtle borders (replaces blue-tinted slate)
        slate: {
          50: '#FAF8F5',  // Cream white
          100: '#F3EFEA', // Soft Ivory
          200: '#E4DDD5', // Light Sandstone
          300: '#C8BEB3', // Muted Clay text
          400: '#A39688', // Warm secondary text
          500: '#7E7265', // Muted Khaki
          600: '#5F554B', // Subtle stone
          700: '#3D3630', // Surface border
          750: '#332D27',
          800: '#28231E', // Dark earthy line
          850: '#201C18', // Panel background
          900: '#191613', // Deep ground
          950: '#110F0D',
        },
        // Subtle Olive Green for verified / success states
        emerald: {
          50: '#F4F7F4',
          100: '#E4EBE4',
          200: '#C5D6C5',
          300: '#9EBA9E',
          400: '#749C74',
          500: '#538053', // Natural Olive
          600: '#406640',
          700: '#304F30',
          800: '#223822',
          900: '#172717',
          950: '#0F1A0F',
        },
        // Warm Ochre / Amber for streak / badge highlights
        amber: {
          50: '#FAF7F0',
          100: '#F3EBD9',
          200: '#E6D4B0',
          300: '#D5B981',
          400: '#C29A50',
          500: '#A87D32', // Rich Ochre
          600: '#8A6324',
          700: '#6D4B18',
          800: '#52360F',
          900: '#3A2508',
          950: '#231503',
        },
        // Soft Terracotta / Rust for danger / alert
        rose: {
          50: '#FAF4F3',
          100: '#F3E4E2',
          200: '#E5C5C0',
          300: '#D19C94',
          400: '#B97066',
          500: '#A24F44', // Warm Rust
          600: '#863E34',
          700: '#6A2E26',
          800: '#502019',
          900: '#38140F',
          950: '#240A07',
        },
        // Deep Sage Blue for indigo
        indigo: {
          50: '#F5F7F6',
          100: '#E5EBE8',
          200: '#CCD8D1',
          300: '#A9BDB2',
          400: '#7E9C8E',
          500: '#5A7C6C', // Slate Sage
          600: '#466456',
          700: '#364E43',
          800: '#273931',
          900: '#1B2721',
          950: '#101814',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 35px -8px rgba(180, 110, 70, 0.28)',
        'glow-sm': '0 0 20px -5px rgba(180, 110, 70, 0.22)',
        'card': '0 4px 20px -2px rgba(18, 15, 13, 0.4), 0 2px 6px -1px rgba(18, 15, 13, 0.3)',
      }
    },
  },
  plugins: [],
}


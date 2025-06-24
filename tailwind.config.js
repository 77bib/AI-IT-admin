/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))',
        'auto-sm': 'repeat(auto-fill, minmax(150px, 1fr))',
        'auto-lg': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#5F6FFF', // Your original primary color
          500: '#3a4bff',
          600: '#1d2bf7',
          700: '#131dd4',
          800: '#151cac',
          900: '#171e87',
        },
        secondary: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#d6e0ff',
          300: '#b3c3ff',
          400: '#8a9eff',
          500: '#5f73ff',
          600: '#3d4dff',
          700: '#2b36f5',
          800: '#222bc8',
          900: '#21289e',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2ff',
          200: '#bae6ff',
          300: '#7dd3ff',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'blue-sm': '0 1px 3px 0 rgba(95, 111, 255, 0.1), 0 1px 2px -1px rgba(95, 111, 255, 0.1)',
        'blue': '0 4px 6px -1px rgba(95, 111, 255, 0.1), 0 2px 4px -2px rgba(95, 111, 255, 0.1)',
        'blue-lg': '0 10px 15px -3px rgba(95, 111, 255, 0.1), 0 4px 6px -4px rgba(95, 111, 255, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
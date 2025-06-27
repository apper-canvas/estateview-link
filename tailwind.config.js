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
          50: '#f2f7f5',
          100: '#e0ebe5',
          200: '#c1d6cb',
          300: '#9bbaa8',
          400: '#759b85',
          500: '#598069',
          600: '#466653',
          700: '#385343',
          800: '#2d4337',
          900: '#2d4a3e',
        },
        secondary: {
          50: '#f9f7f4',
          100: '#f1ebe3',
          200: '#e3d4c3',
          300: '#d0b89a',
          400: '#bd9b70',
          500: '#b1885a',
          600: '#8b7355',
          700: '#735e45',
          800: '#5e4e3c',
          900: '#4e4132',
        },
        accent: {
          50: '#fef7ed',
          100: '#fdedd4',
          200: '#fad7a8',
          300: '#f6ba71',
          400: '#f19638',
          500: '#e67e22',
          600: '#d76418',
          700: '#b24d16',
          800: '#8e3e18',
          900: '#743317',
        },
        surface: '#F8F5F0',
        success: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        info: '#3498DB',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 25px rgba(0, 0, 0, 0.15)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
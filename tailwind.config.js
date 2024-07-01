/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '7.5': '1.875rem',
        '13': '3.25rem',
      },
      animation: {
        'fade-in': 'fadeIn .2s',
        'zoom-in': 'zoomIn .5s'
      },
      keyframes: {
        fadeIn: {
          from: {opacity: 0},
          to: {opacity: 1}
        },
        zoomIn: {
          '0%': {
            opacity: 0,
            transform: 'scale3d(.3, .3, .3)'
          },
          '50%': {opacity: 1}
        }
      }
    },
  },
  plugins: [
    scrollbar({noCompatible: true}),
  ],
}


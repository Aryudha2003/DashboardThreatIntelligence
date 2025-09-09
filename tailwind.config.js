/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          900: '#071428',
          800: '#0f1b29',
          700: '#1a2332',
          600: '#252b3b',
        },
        'cyber': {
          cyan: '#00d2ff',
          magenta: '#ff4da6',
          green: '#2ee6a7',
        },
        'status': {
          critical: '#ff6b6b',
          high: '#ff9f43',
          medium: '#feca57',
          low: '#48dbfb',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['Source Code Pro', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow': 'flow 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px rgba(0, 210, 255, 0.5)'
          },
          '50%': { 
            opacity: '.8',
            boxShadow: '0 0 30px rgba(0, 210, 255, 0.8)'
          },
        },
        'flow': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        }
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};

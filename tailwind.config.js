/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-blue': '#0A1E40',
        'cream-paper': '#F2F0E6',
        'gold-star': '#C5A059',
        'glass-green': '#4A6B63',
        'retro-pink': '#D988B9',
        'highlight-yellow': '#FEF08A',
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'hand': ['"Permanent Marker"', 'cursive'],
        'body': ['"Space Mono"', 'monospace'],
      },
      animation: {
        'jitter': 'jitter 0.3s infinite',
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        jitter: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(-1px, 1px) rotate(-0.5deg)' },
          '50%': { transform: 'translate(1px, -1px) rotate(0.5deg)' },
          '75%': { transform: 'translate(-1px, -1px) rotate(-0.5deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      },
      boxShadow: {
        'paper': '4px 4px 0 rgba(0,0,0,0.1), 8px 8px 20px rgba(0,0,0,0.15)',
        'levitate': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'glass': '4px',
      }
    },
  },
  plugins: [],
}

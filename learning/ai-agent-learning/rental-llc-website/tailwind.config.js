/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B1120', // Rich Navy (was Slate 800)
        secondary: '#D4AF37', // Classic Gold (was Yellow 600)
        accent: '#F5F5F0', // Warm Off-White (was Slate 50)
        surface: '#1C2535', // Dark Blue-Grey for cards
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}


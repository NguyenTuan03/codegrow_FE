// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #7ECFAF 0%, #C7E6D7 32%, #6C7ED0 100%)',
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px', // Extra small breakpoint
      },
      width: {
        "base-width": "500px",
      },

      fontFamily: {
        'league-spartan': ['League Spartan', 'sans-serif'],
      },
      fontSize: {
        'number': '32px',
        'sm-md': '20px',
      },
      fontWeight: {
        'bold': '700',
      },
      borderRadius: {
        'xl': '200px',
      },
    },
  },
  plugins: [],
}

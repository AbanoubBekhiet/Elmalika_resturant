/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFC222",
      },
      // فقط لو حبيت تستخدمه بـ font-brando
      fontFamily: {
        brando: ['Brando', 'sans-serif'],
         Fredoka: ['Fredoka', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: '#f49ecb',
        secondary: '#1b3e6f',
      },
    },
  },
};
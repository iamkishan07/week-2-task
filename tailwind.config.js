/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: { fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] }, boxShadow: { soft: "0 8px 30px rgba(15,23,42,.045)" } } },
  plugins: []
};
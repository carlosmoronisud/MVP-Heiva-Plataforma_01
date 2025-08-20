/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenbackground: '#001C16',
        primarygreen: '#10b981',
        verdeFechado: '#1F5A1DE5',
        verdeEscuro : '#2A7A2B',
        verdeEscuroAlpha: '#2A7A2BE5',
        verdeSuaveAlpha: '#32A233E5', 
        verdeSuave: '#32A233', 
        verdeSuaveClaro: '#32A233E5',
        verdeSuaveClaroAlpha: '#32A233E5',}
    },
  },
  plugins: [],
}
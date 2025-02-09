/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Incluye el archivo HTML principal
    "./src/**/*.{js,jsx,ts,tsx}", // Incluye todos los archivos JS, JSX, TS y TSX en la carpeta src
    "node_modules/flowbite/**/*.js" // Incluye los archivos de Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Asegúrate de incluir el plugin de Flowbite
  ],
}
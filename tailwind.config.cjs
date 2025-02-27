module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
      gap: false,
      gridTemplateColumns: false,
    // Отключаем CSS переменные для совместимости
    cssVariables: false 
   
  },
  theme: {},
  plugins: [],
}
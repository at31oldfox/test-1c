module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
    require('postcss-preset-env')({
      stage: 0,
      features: {
        'custom-properties': {
          preserve: false
        }
      }
    }),
  ]
}
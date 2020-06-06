/* eslint-disable */

mix.webpackConfig({
  module: {
    rules: [{
      test: /\.svg$/,
      use: [{ loader: 'html-loader' }]
    }]
  }
})

const path = require('path');

module.exports = {
  entry: './frontend/app.jsx', //where did we get this object from? the rest came from a guide
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devtool: "eval-source-map"
};
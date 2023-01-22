const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'client');
const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  stats: {
    excludeModules: /node_modules/
  },
  // Path to entry point
  entry: {
    app: path.resolve(SRC_DIR, 'Index.jsx')
  },
 // Path and filename of result bundle.
  // Webpack bundles all JavaScript into bundle.js
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }

        }
      }
    ]
  },
  // Default mode for Webpack is production current mode set to development.
};
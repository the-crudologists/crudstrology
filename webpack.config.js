// Webpack uses this to work with directories
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'client');
const DIST_DIR = path.resolve(__dirname, 'dist');
// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  stats: {
    excludeModules: /node_modules/
  },
  // Path to your entry point. From this file Webpack will begin its work
  entry: {
    app: path.resolve(SRC_DIR, 'Index.jsx')
  },
  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
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
  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on the final bundle. For now, we don't need production's JavaScript 
  // minifying and other things, so let's set mode to development
};
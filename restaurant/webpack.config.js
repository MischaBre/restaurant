const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './src/js/index.js',
  output: {
    path: path.resolve('./bundles/dev/'),
    filename: "[name]-[hash].js"
  },
  plugins: [
    new BundleTracker({filename: './webpack-dev.stats.json'})
  ],
};
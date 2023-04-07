const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  mode: process.env.PRODUCTIVE ? 'production' : 'development',
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist/assets/webpack_bundles/'),
    publicPath: (process.env.PRODUCTIVE ? '' : 'http://localhost:8080') + '/static/',
    filename: "[name]-[hash].js"
  },
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'})
  ],
};
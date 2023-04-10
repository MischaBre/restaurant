const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  entry: './src/index.js',
  output: {
    path: path.resolve('./bundles/dev/'),
    filename: "[name]-[hash].js"
  },
  plugins: [
    new BundleTracker({filename: './webpack-dev.stats.json'}),
    new VueLoaderPlugin(),
  ],
};
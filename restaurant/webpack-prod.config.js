var config = require('./webpack.config');
var BundleTracker = require('webpack-bundle-tracker');


config.mode = 'production';
config.output.path = require('path').resolve('./bundles/dist/');
config.plugins = [
  new BundleTracker({filename: './webpack-prod.stats.json'})
];

module.exports = config;
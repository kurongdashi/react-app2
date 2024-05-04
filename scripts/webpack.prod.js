const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base');

const proConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  // mode: 'development',
  devtool: false,
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    }
  }
};

module.exports = merge(proConfig, baseConfig);

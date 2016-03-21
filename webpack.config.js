'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    javascript: './src/index.js',
    html: './src/index.html'
  },
  output: {
    filename: 'index.js',
    path: __dirname + '/dist'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.join(process.cwd(), 'lib')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /masonry-layout/,
        loader: 'imports?define=>false&this=>window'
      },
      {
        test: /imagesloaded/,
        loader: 'imports?define=>false&this=>window'
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ]
  },
  devServer: {hot: true},
  plugins: [new webpack.HotModuleReplacementPlugin(), new ExtractTextPlugin('common-[hash:6].css', { allChunks: true })],
  inline: true,
  progress: true,
  colors: true
};

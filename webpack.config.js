'use strict';
var path = require('path');
var webpack = require('webpack');

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
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        query: { mimetype: 'image/png' }
      }
    ]
  },
  devServer: {hot: true},
  plugins: [new webpack.HotModuleReplacementPlugin()],
  inline: true,
  progress: true,
  colors: true
};

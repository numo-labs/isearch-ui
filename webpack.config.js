'use strict';
var path = require('path');
module.exports = {
  entry: {
    javascript: './src/app.js',
    html: './src/index.html'
  },
  output: {
    filename: 'app.js',
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
    ]
  }
};

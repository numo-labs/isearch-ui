'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: __dirname + '/public/',
    filename: 'bundle-[hash:6].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
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
        loader: 'file-loader?name=[name].[ext]'
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: 'src/index.template.html',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /da/),
    new webpack.optimize.UglifyJsPlugin({ comments: false })
  ],
  colors: true,
  progress: true
};

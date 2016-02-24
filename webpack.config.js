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
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'] // 'babel-loader' is also a legal name to reference
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  }
};

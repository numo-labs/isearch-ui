const browser = process.env.KARMA_BROWSER || 'PhantomJS';

module.exports = function (config) {
  config.set({

    singleRun: true,

    browsers: [browser],

    frameworks: ['mocha', 'sinon'],

    files: [
      require.resolve('babel-polyfill/dist/polyfill.js'),
      '../lib/**/*.test.js',
      '../test/**/*.test.js'
    ],

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    reporters: ['mocha'],

    mochaReporter: {
      showDiff: true
    },

    preprocessors: {
      '../test/**/*.js': ['webpack', 'sourcemap'],
      '../lib/**/*.js': ['webpack', 'sourcemap']
    },

    webpackMiddleware: {
      noInfo: true,
      quiet: true
    },

    webpack: {
      cache: true,
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          },
          {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
          },
          {
            test: /\.png$/,
            loader: 'url-loader',
            query: { mimetype: 'image/png' }
          }
        ]
      },
      devtool: 'inline-source-map'
    }

  });
};

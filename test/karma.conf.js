module.exports = function (config) {
  config.set({

    singleRun: true,

    browsers: ['PhantomJS'],

    frameworks: ['mocha', 'sinon'],

    files: [
      require.resolve('babel-polyfill/dist/polyfill.js'),
      './index.js'
    ],

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
            test: /\.(css|png|otf|svg)$/,
            loader: 'ignore-loader'
          }
        ]
      },
      devtool: 'inline-source-map'
    }

  });
};

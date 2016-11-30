const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],
    client: {
      mocha: {
        reporter: 'html',
      },
    },
    coverageReporter: {
      reporters: [{
        type: 'lcov'
      }]
    },
    files: [
      'src/**/__tests__/**',
    ],
    exclude: [
      '**/*.map',
    ],
    preprocessors: {
      './src/**/*.ts': ['webpack', 'coverage'],
      './src/**/*.js': ['webpack', 'coverage'],
    },
    webpack: {
      devtool: webpackConfig.devtool,
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      externals: webpackConfig.externals
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity,
  });
};

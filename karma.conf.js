/** @license
 *  Copyright 2016 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

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
      dir: 'coverage',
      reporters: [{
        type: 'text'
      }, {
        type: 'lcov'
      }]
    },
    files: [
      'src/**/__tests__/*.ts?(x)',
    ],
    preprocessors: {
      'src/**/*.ts?(x)': ['webpack'],
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

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

'use strict';

const path = require('path');
const webpack = require('webpack');
const PACKAGE = require('./package.json');

const PUBLIC_PATH = '/assets/';
const IS_DEV = process.env.RMX_ENV === 'development';
const IS_PROD = process.env.RMX_ENV === 'production';

module.exports = {
  entry: {
    remixer: './src/core/Remixer.ts',
    overlay: './src/ui/render.tsx'
  },
  output: {
    path: path.resolve('./build'),
    publicPath: PUBLIC_PATH,
    filename: '[name].' + (IS_PROD ? 'min.' : '') + 'js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: IS_DEV ? 'source-map' : 'cheap-module-source-map',
  devServer: {
    contentBase: "examples",
    inline: true,
  },
  performance: {
    hints: IS_DEV ? false : "warning"
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.tsx?$/,
      exclude: /(__tests__|node_modules)\//,
      loader: 'istanbul-instrumenter-loader',
      enforce: 'post'
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.BannerPlugin(`${PACKAGE.name}
@version v${PACKAGE.version}
@license ${PACKAGE.license}
@copyright 2016 Google, Inc.
@link ${PACKAGE.repository.url}
    `)
  ],
};

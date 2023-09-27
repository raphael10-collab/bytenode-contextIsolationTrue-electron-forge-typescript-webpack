import type { Configuration } from 'webpack';

import assert = require("assert");

import { BytenodeWebpackPlugin } from '@herberttn/bytenode-webpack-plugin';

import { rules } from './webpack.shared.rules';
import { plugins } from './webpack.shared.plugins';

const rendererConfig: Configuration = {
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  plugins: [new BytenodeWebpackPlugin({ compileForElectron: true })],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      'assert': require.resolve('assert'),
      'zlib': require.resolve('browserify-zlib'), 
      'vm': require.resolve('vm-browserify'),
      'stream': require.resolve('stream-browserify'),
      'path': require.resolve('path-browserify'),
      'fs': false
    },
  },
  //target: 'electron-renderer',
};

export {
  rendererConfig,
};

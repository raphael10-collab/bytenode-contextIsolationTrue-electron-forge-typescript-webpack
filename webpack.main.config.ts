import assert = require("assert");

import type { Configuration } from 'webpack';

import { BytenodeWebpackPlugin } from '@herberttn/bytenode-webpack-plugin';

import { rules } from './webpack.shared.rules';
import { plugins } from './webpack.shared.plugins';

const mainConfig: Configuration = {
  entry: {
    index: './src/main/index.ts',
  },
  module: {
    rules,
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    filename: '[name].js',
  },
  plugins: [new BytenodeWebpackPlugin({ compileForElectron: true })],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    fallback: {
      'assert': require.resolve('assert'),
      'zlib': require.resolve('browserify-zlib'),
      'vm': require.resolve('vm-browserify'),
      'stream': require.resolve('stream-browserify'),
      'path': require.resolve('path-browserify'),
      'fs': false
    },
  },
  target: 'electron-main',
};

export {
  mainConfig,
};

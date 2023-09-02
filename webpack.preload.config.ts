import type { Configuration } from 'webpack';

import { BytenodeWebpackPlugin } from '@herberttn/bytenode-webpack-plugin';

import { rules } from './webpack.shared.rules';
import { plugins } from './webpack.shared.plugins';

const preloadConfig: Configuration = {
  entry: {
    preload: './src/main/preload/preload.ts',
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
  },
  target: 'electron-preload',
};

export {
  preloadConfig,
};

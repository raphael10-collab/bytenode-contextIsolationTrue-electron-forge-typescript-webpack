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
  },
  target: 'electron-main',
};

export {
  mainConfig,
};

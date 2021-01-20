const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  mode: 'development',

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./src/public", to: "./" },
      ],
    }),
  ],

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};
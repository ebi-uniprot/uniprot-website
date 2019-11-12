const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: ['core-js/stable', path.resolve(__dirname, 'src/index.tsx')],
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react-router-dom': path.resolve('./node_modules/react-router-dom'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)$/,
        include: [
          // We use realpathSync otherwise doesn't work with symlinks
          fs.realpathSync(__dirname + '/node_modules/litemol/dist/css'),
          fs.realpathSync(__dirname + '/node_modules/@geneontology/ribbon/es'),
          path.resolve(__dirname, 'src'),
        ],
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: [
          path.resolve(__dirname, 'node_modules/litemol/dist/fonts'),
          path.resolve(__dirname, 'node_modules/protvista-datatable'),
        ],
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: [path.resolve(__dirname, 'node_modules/litemol/dist/fonts')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'node_modules/protvista-datatable')],
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `${__dirname}/index.html`,
      filename: 'index.html',
    }),
  ],
};

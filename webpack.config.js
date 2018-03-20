const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
require('dotenv').config()

const buildPath = '/build/'

module.exports = [{
  devtool: 'cheap-eval-source-map',
  entry: {
    bundle: './src/client/app/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, buildPath, 'public'),
    publicPath: '/'
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVER_URL: JSON.stringify(process.env.SERVER_URL)
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/client/public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new CopyWebpackPlugin([{
      from: 'src/client/public/css',
      to: 'css',
      force: true
    },
    {
      from: 'src/client/public/img',
      to: 'img',
      force: true
    }]),
    new webpack.ProvidePlugin({
      io: 'socket.io-client'
    }),
    new webpack.HotModuleReplacementPlugin({multistep: true})
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    hot: true,
    inline:true,
    port: 3001,
    compress: true,
    open: true,
    contentBase: path.join(__dirname, 'src/client/public/'),
    publicPath: '/',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
},{
  entry: './src/server.js',
  output: {
    path: __dirname + '/build',
    filename: 'server.js'
  },
  module: {
    rules: [{
      test: /.js$/,
      loader: 'babel-loader'
    }]
  },
  target: 'node',
  plugins: [],
  externals: [nodeExternals()]
}]
const path = require('path')
const nodeModules = path.resolve(__dirname, 'node_modules')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    test: ['./src/app.js'],
    search: ['./search/app.js']
  },
  output: {
      path: path.resolve(__dirname, 'bin'),
      filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: [nodeModules],
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'stage-1', 'stage-3'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.s?css$/,
        exclude: [nodeModules],
        loader: 'style!css!postcss-loader!sass',
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: [nodeModules],
        loader: 'url?limit=10000&name=img/[name].[sha512:hash:base64:7].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: [nodeModules],
        loader: 'url?limit=10000&name=fonts/[name].[sha512:hash:base64:7].[ext]'
      },
      {
        test: /\.html$/,
        exclude: [nodeModules],
        loader: 'html?name=html/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('verdors.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
}

config.plugins.push(new webpack.HotModuleReplacementPlugin())
config.plugins.push(new HtmlWebpackPlugin({
  title:  '学习webpack',
  template: 'index.ejs',
  filename: 'test/index.html',
  chunks: ['verdors', 'test'],
  cache: true
}))

config.plugins.push(new HtmlWebpackPlugin({
  title:  '学习webpack',
  template: 'index.ejs',
  filename: 'search/index.html',
  chunks: ['verdors', 'search'],
  cache: true
}))

module.exports = config
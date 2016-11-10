const path = require('path')
const nodeModules = path.resolve(__dirname, 'node_modules')

const config = {
  entry: './src/app.js',
  output: {
      path: './bin',
      filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: [nodeModules],
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0', 'stage-1', 'stage-3'],
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
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.[hash:8].js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ]
}

config.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports config
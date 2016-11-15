# learnConfigreMyWebpack
study webpack

webpack的三个概念：模块（module）、入口文件（entry）、分块（chunk）。
* module: 资源的集合（js + css + html）
* entry: 每个module的入口文件
* chunk: 每个入口文件都生成一个chunk

### entry
cats、search、vendors 都是一个chunk
这些就是webpack要打包的内容

```javascript
entry: {
  cats: ['./src/cats/app.js'],
  search: ['./src/search/app.js'],
  vendors: ['react', 'react-dom']
}
```
### output
这是要把打包好的文件输出的地方
[name]为每个chunk的名字
[hash:8]随机生成8位哈希值，暂时不动什么用处（好像是热插拔的地方判断是否改变）

```javascript
output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'js/[name].[hash:8].js'
}
```

### laoder
* test: A condition that must be met
* exclude: A condition that must not be met（排除之外）
* include: A condition that must be met(包括在内)
* loader: A string of “!” separated loaders(多个用!分开)
* loaders: An array of loaders as string
* query: "?" 之后的内容

* 这里nodeModules为node-module目录
* [html]: Exports HTML as string, require references to static resources.
* [ext]: 文件的扩展名

```javascript
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
```

### plugin
* CommonsChunkPlugin： 这里我们的vendors用错了，这个插件应该是从多个chunk中分离出共有的文件，vendors.js是每个html都要有的内容
* HotModuleReplacementPlugin: 热插拔
* HtmlWebpackPlugin: 将html模板和打包好的vendor.js和[chunkname].js形成页面

```javascript
 plugins: [
   // new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.[hash:8].js'),
 ]

config.plugins.push(new webpack.HotModuleReplacementPlugin())
config.plugins.push(new HtmlWebpackPlugin({
  title:  '学习webpack',
  template: 'index.ejs',
  filename: 'cats/index.html',
  chunks: ['vendors', 'cats'],
  cache: true
}))

config.plugins.push(new HtmlWebpackPlugin({
  title:  '学习webpack',
  template: 'index.ejs',
  filename: 'search/index.html',
  chunks: ['vendors', 'search'],
  cache: true
}))
```

### webpack-dev-server
hot: true 是开启热插拔

```javascript
Object.keys(config.entry).forEach((name) => {
  config.entry[name].unshift('webpack-dev-server/client?http://127.0.0.1:8888/', 'webpack/hot/dev-server');
})

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  hot: true,
}).listen(8888, err => {
  if (err) {
    console.log(err);
  }
  console.log('Webpack Listening at 127.0.0.1:8888');
})
```
 

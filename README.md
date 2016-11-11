# learnConfigreMyWebpack
study webpack

### laoder
* test: A condition that must be met
* exclude: A condition that must not be met（排除之外）
* include: A condition that must be met(包括在内)
* loader: A string of “!” separated loaders(多个用!分开)
* loaders: An array of loaders as string
* query: "?" 之后的内容

* 这里nodeModules为node-module目录
* html: Exports HTML as string, require references to static resources.
* 'ext': 文件的扩展名

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

### plugin
* CommonsChunkPlugin： 整理所有js最后汇总到verdor.js中
* OccurenceOrderPlugin： reduces to total file size and is recommended.
* DefinePlugin： 定义全局变量
* HotModuleReplacementPlugin: 热插拔
* HtmlWebpackPlugin: 将html模板和打包好的vendor.js形成页面

        plugins: [
            new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.[hash:8].js'),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify(env),
            }),
          ]

       config.plugins.push(new webpack.HotModuleReplacementPlugin())
       config.plugins.push(new HtmlWebpackPlugin({
          title:  '学习webpack',
          template: 'index.ejs',
          filename: 'learnWebpack/index.html',
          chunks: ['verdors', 'learnWebpack'],
          cache: true
        }))
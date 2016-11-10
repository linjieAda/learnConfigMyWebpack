# learnConfigreMyWebpack
study webpack

### laoder
* test: A condition that must be met
* exclude: A condition that must not be met（排除之外）
* include: A condition that must be met(包括在内)
* loader: A string of “!” separated loaders(多个用!分开)
* loaders: An array of loaders as string
* query: "?" 之后的内容

*这里nodeModules为node-module目录
*html: Exports HTML as string, require references to static resources.
*'[ext]': 文件的扩展名

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

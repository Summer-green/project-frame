var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin'); // webpack4.0 单独打包css
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

var src = path.join(__dirname, '..', 'src'); // __dirname指向被执行 js 文件的绝对路径

module.exports = {
  entry: {
    app: './src/app/index.js', // 多页入口1
    login: './src/login/index.js' // 多页入口2
  },
  module: {
    rules: [
      // 处理非 JavaScript 文件
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: src,
        options: {
          // loader 的额外参数，配置视具体 loader 而定
          formatter: require('eslint-friendly-formatter') // 错误报告模式
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [src]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader', // es6转es5语法
        include: [src]
        // options: {
        //   presets: ['latest'] //按照最新的ES6语法规则去转换 npm babel-preset-latest
        // }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader', // 解析、编译vue单文件组件中的样式
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader' // 从右向左解析
          }
        ]
      },
      {
        test: /\.scss$/,
        include: src,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(gif|png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]', // 图片编译后的图片文件名 [ext]引用文件扩展名
              limit: '1024' // 小于限定范围 把文件转为DataURL
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // vue-loader@15.*之后必须带有VueLoaderPlugin 将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/login/index.html', // 指定你生成的文件所依赖哪一个html文件模板
      inject: 'body', // script标签位于html文件的 body 底部
      chunks: ['login'] // 选择打包后的js文件， 没有设置chunks选项，默认是全部引用
      // excludeChunks: ['index.js']
      // favicon: 'path/to/my_favicon.ico'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/app/index.html',
      inject: 'body',
      chunks: ['app']
    }),
    new CopyWebpackPlugin([
      { from: './src/common/lib/ckeditor', to: './vendor/ckeditor' }
    ])
  ],
  resolve: {
    extensions: ['.js', '.vue'] // 自动带上后缀后
  }
};

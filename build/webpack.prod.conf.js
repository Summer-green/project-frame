var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var dist = path.join(__dirname, '..', 'dist');

var config = merge(baseConfig, {
  output: {
    path: dist,
    filename: '[name].[hash:8].js',
    publicPath: './'
  },
  externals: {
    vue: 'Vue',
    axios: 'axios',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT',
    lodash: '_'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        cache: true, // 启用文件缓存
        parallel: true, // 使用多进程并行运行来提高构建速度 充分利用cpu
        sourceMap: false,
        extractComments: false, // 移除注释
        uglifyOptions: {
          compress: {
            // 压缩
            unused: false // 没用到的不排除
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CleanWebpackPlugin('./dist', {
      root: path.join(__dirname, '..'),
      verbose: true, //  Write logs to console.
      dry: false // 启用删除文件
    }),
    new CopyWebpackPlugin([{ from: './config/*.js', to: './vendor' }]),
    new CopyWebpackPlugin([{ from: './src/common/js/*/*.js', to: './vendor' }]), // 为什么要单独拷贝？
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'config', // 模块名
          entry: {
            path: 'config.js',
            cwpPatternConfig: {
              context: path.resolve(__dirname, '../') // 引用路径
            }
          }
        },
        {
          module: 'vue',
          entry:
            'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.runtime.min.js'
        },
        {
          module: 'element-ui',
          entry:
            'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.9/index.js'
        },
        {
          module: 'axios',
          entry:
            'https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.1/axios.min.js'
        }
      ],
      files: ['login.html']
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'config',
          entry: {
            path: 'config.js',
            cwpPatternConfig: {
              context: path.resolve(__dirname, '../')
            }
          }
        },
        {
          module: 'vue',
          entry:
            'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.runtime.min.js'
        },
        {
          module: 'element-ui',
          entry:
            'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.9/index.js'
        },
        {
          module: 'vue-router',
          entry:
            'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.1/vue-router.min.js'
        },
        {
          module: 'vuex',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/vuex/3.0.1/vuex.min.js'
        },
        {
          module: 'axios',
          entry:
            'https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.1/axios.min.js'
        },
        {
          module: 'lodash',
          entry:
            'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.9/lodash.min.js'
        }
      ],
      files: ['index.html']
    })
  ]
});

module.exports = config;

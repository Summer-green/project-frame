var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge'); // 合并
var baseConfig = require('./webpack.base.conf');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

var dist = path.join(__dirname, '..', 'dist');

var config = merge(baseConfig, {
  output: {
    path: dist, // 打包后结果存储路径
    filename: '[name].js',
    publicPath: '/' // 输出解析文件的目录，指定资源文件引用的目录 基础路径
  },
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      allChunks: true // 所有的CSS文件合并成1个文件, allChunks设置成true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'config',
          entry: {
            path: 'config.dev.js',
            cwpPatternConfig: {
              context: path.resolve(__dirname, '../')
            }
          }
        },
        {
          module: 'file-h5-upload',
          entry: {
            path: 'file-h5-upload.min.js',
            cwpPatternConfig: {
              context: path.resolve(__dirname, '../src/common/js/')
            }
          }
        }
      ],
      files: ['login.html', 'index.html']
    })
  ]
});

module.exports = config;

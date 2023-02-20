/*
 * @Author       : wanglei
 * @Date         : 2023-02-13 08:40:52
 * @LastEditors  : wanglei
 * @LastEditTime : 2023-02-18 22:12:12
 * @FilePath     : /webpack-code/webpack.config.js
 * @description  : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/main.js',
    output: {
        // path nodejs变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, '../dist'), // 所有文件的打包目录
        filename: 'static/js/my-first-bundle.js', // 打包之后的文件名，入口文件打包输出的文件名
        clean: true // 每次打包前，清空打包目录，将path目录清空
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 检测.css文件
                // use的执行顺序，是从右到左，或者从下到上。
                use: [
                    MiniCssExtractPlugin.loader,  // 生成单独的css 文件
                    'css-loader' // 将css资源编译成commonjs模块到js文件中
                ] 
            },
            {
                test: /\.less$/i,
                // use可以使用多个loader， loader只能使用一个loader
                // use: [
                //     {
                //         loader: 'style-loader',
                //       },
                // ]
                use: [
                  // compiles Less to CSS
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'less-loader',
                ],
              },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  // 将 JS 字符串生成为 style 节点
                  MiniCssExtractPlugin.loader,
                  // 将 CSS 转化成 CommonJS 模块
                  'css-loader',
                  // 将 Sass 编译成 CSS
                  'sass-loader',
                ],
              },
              {
                test: /\.styl$/,
                 // loader: "stylus-loader", // 将 Stylus 文件编译为 CSS
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'stylus-loader',
                ]
              },
              {
                test: /\.(png|jie?g|git|webp|svg)$/,
                type: 'asset',
                parser: {
                // 小于4kb的图片，转成base64字符串
                 dataUrlCondition: {
                   maxSize: 4 * 1024 // 4kb
                 }
               },
               // 图片路径输出的目录
               generator: {
                // [hash:10] hash值只取前10位
                filename: 'static/images/[hash:10][ext][query]'
              }
              },
              // 处理字体资源，也可以处理其它音频、视频资源
              {
                test: /\.(ttf|woff2?|map3|map4|avi)$/,
                type: "asset/resource", // 文件不会转base64
                generator: {
                  filename: 'static/fonts/[hash:10][ext][query]'
                }
              },
              {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules 文件夹
                use: {
                  loader: 'babel-loader',
                  // 配置可以写在babel.config.js里
                  // options: {
                  //   presets: ['@babel/preset-env']
                  // }
                }
              }
        ]
    },
    plugins: [
      new ESLintPlugin({
        // eslint检测的范围
        context: path.resolve(__dirname, '../src')
      }),
      // build时，用这个template进行build
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html')
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/main.css'
      })
    ],

    mode: 'production',

}
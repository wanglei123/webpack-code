/*
 * @Author       : wanglei
 * @Date         : 2023-02-13 08:40:52
 * @LastEditors  : wanglei
 * @LastEditTime : 2023-02-27 21:20:32
 * @FilePath     : /webpack-code/config/webpack.dev.js
 * @description  : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const os = require('os')
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const threads = os.cpus().length // 先判断当前电脑cpu的核数， 我们能启动的最大进程数据就是cpu的核数

module.exports = {
	entry: './src/main.js', // 这个不用改，还是会从要从根目录去找入口文件
	output: {
		// path nodejs变量，代表当前文件的文件夹目录
		path: undefined, // 所有文件的打包目录，这个放到config文件夹中之后，需要加上../, 开发环境可以不用定义
		filename: 'static/js/my-first-bundle.js', // 打包之后的文件名，入口文件打包输出的文件名
		chunkFilename: 'static/js/[name].chunk.js', // chunk的命名
		assetModuleFilename: 'static/images/[hash:10][ext][query]', // 图片、字体等通过type: asset处理的静态资源命名
		// clean: true // 每次打包前，清空打包目录，将path目录清空
	},
	module: {
		rules: [
			{
				// 加上oneOf,如果找到这个loader就不再继续向下寻找，提高效率，生产和开发模式都可以使用。
				oneOf: [
					{
						test: /\.css$/, // 检测.css文件
						// use的执行顺序，是从右到左，或者从下到上。
						use: [
							MiniCssExtractPlugin.loader,
							// 将js中css显示成style标签的形式，让页面样式生效
							// 这里把style-loader，替换成 MiniCssExtractPlugin.loader
							// 'style-loader',
							'css-loader', // 将css资源编译成commonjs模块到js文件中
						],
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
						use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
					},
					{
						test: /\.(png|jie?g|git|webp|svg)$/,
						type: 'asset',
						parser: {
							// 小于4kb的图片，转成base64字符串
							dataUrlCondition: {
								maxSize: 4 * 1024, // 4kb
							},
						},
						// 图片路径输出的目录
						// generator: {
						// 	// [hash:10] hash值只取前10位
						// 	filename: 'static/images/[hash:10][ext][query]',
						// },
					},
					// 处理字体资源，也可以处理其它音频、视频资源
					{
						test: /\.(ttf|woff2?|map3|map4|avi)$/,
						type: 'asset/resource', // 文件不会转base64
						// generator: {
						// 	filename: 'static/fonts/[hash:10][ext][query]',
						// },
					},
					{
						test: /\.js$/,
						exclude: /node_modules/, // 排除node_modules 文件夹
						use: [
							{
								loader: 'thread-loader', // 开启多进程
								options: {
									workds: threads, // 进程数量
								},
							},
							{
								loader: 'babel-loader',
								// 配置可以写在babel.config.js里
								// options: {
								//   presets: ['@babel/preset-env']
								// }
								options: {
									// presets: ['@babel/preset-env']
									cacheDirectory: true, // 开启babel缓存
									cacheCompression: false, // 关闭缓存的压缩
									plugins: ['@babel/plugin-transform-runtime'], // 减少代码体积
								},
							},
						],
					},
				],
			},
		],
	},
	plugins: [
		new ESLintPlugin({
			// eslint检测的范围
			context: path.resolve(__dirname, '../src'),
			cache: true, // 开启缓存
			cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'), // 配置缓存的目录
			threads,
		}),
		// build时，用这个template进行build
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'),
		}),
		new MiniCssExtractPlugin({
			filename: 'static/css/[name].css',
			chunkFilename: 'static/css/[name].chunk.css',
		}),
	],
	// 开发服务器没有任何输出资源，是在内存中编译打包的
	devServer: {
		host: 'localhost',
		port: 9000,
		open: true,
		hot: true, // HMR 默认是打开的(开发模式需要打开，生产模式不能用， 这个开启之后，配合style-loader，就会实现css的热替换，但js还是不行，这时就要用到vue-loader 或者 react-hot-loader)
	},
	mode: 'development',
	devtool: 'cheap-module-source-map',
}

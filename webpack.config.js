const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        // path nodejs变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, 'dist'), // 所有文件的打包目录
        filename: 'static/js/my-first-bundle.js', // 打包之后的文件名，入口文件打包输出的文件名
        clean: true // 每次打包前，清空打包目录，将path目录清空
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 检测.css文件
                // use的执行顺序，是从右到左，或者从下到上。
                use: [
                    'style-loader', // 将js中css显示成style标签的形式，让页面样式生效
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
                  'style-loader',
                  'css-loader',
                  'less-loader',
                ],
              },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  // 将 JS 字符串生成为 style 节点
                  'style-loader',
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
                  'style-loader',
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
              }
        ]
    },
    plugins: [],
    mode: 'development',

}
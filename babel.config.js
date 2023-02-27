/*
 * @Author       : wanglei
 * @Date         : 2023-02-18 22:11:24
 * @LastEditors  : wanglei
 * @LastEditTime : 2023-02-27 22:11:58
 * @FilePath     : /webpack-code/babel.config.js
 * @description  : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage', // 按需加载自动引入
				corejs: 3,
			},
		],
	],
}

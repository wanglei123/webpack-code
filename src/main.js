/*
 * @Author       : wanglei
 * @Date         : 2023-02-18 22:11:24
 * @LastEditors  : wanglei
 * @LastEditTime : 2023-02-27 22:16:15
 * @FilePath     : /webpack-code/src/main.js
 * @description  : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 字体文件
import './css/iconfont.css'
import './css/index.css'

import './less/index.less'

import './sass/index.scss'

import './stylus/index.styl'




document.getElementById('btn').onclick = function(){
  // webpack给chunk文件命名，也叫魔法命名
  import(/* webpackChunkName: 'sum' */'./js').then((res) => {
    res.default(1,2)
  }).catch(err => {
    console.log(2222)
  })
}

new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, 1000)
})
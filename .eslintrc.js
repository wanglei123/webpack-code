module.exports = {

    parserOptions: {
        ecmaVersion: 6, // ES 语法版本
        sourceType: 'module', // ES 模块化
        ecmaFeatures: { // ES 其他特性
            jsx: true // 如果是reaact项目，就需要开启
        }

    },
    // off 或者 0 为关闭规则
    // warn 或 1 为开启规则，使用警告级别的错误：warn（不会导致程序退出）
    // error 或 2 为开启规则，使用错误级别的错误：error （当被触发时，程序会退出） 

    // 我们自己写的规则会覆盖官方的规则
    rules: {
        'no-var': 2
    },
    env: {
        node: true, // 启用node中全局变量
        browser: true //  启用浏览器中全局亦是
    },
    // 继承
    extends: ['react-app'] // 要先安装 npm i eslint-config-react-app

    // 其他规则说见： http://eslint.bootcss.com/docs/user-guide/configuring
}
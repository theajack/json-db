// const MyPlugin = require('./plugin/plugin1')
// const ErudaWebapckPlugin = require('eruda-webpack-plugin')
const path = require('path');
const webpack = require('webpack');
// require('../helper/clear-dist-dev');
module.exports = {
    entry: [
        'webpack/hot/poll?1000',
        path.resolve('./', 'src/server.ts'),
    ],
    output: {
        path: path.resolve('./', 'dist/dev'),
        filename: 'backend.js'
    },
    /* 指明编译方式为 node */
    target: 'async-node',
    plugins: [
    /* HMR plugin */
        new webpack.HotModuleReplacementPlugin(),

        /* 当 HMR 替换时在浏览器控制台输出对用户更友好的模块名字信息 */
        // new webpack.NamedModulesPlugin()
    ],
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    module: {
        rules: [{
            test: /(.ts)$/,
            use: {
                loader: 'ts-loader'
            }
        }, {
            test: /(.js)$/,
            use: [{
                loader: 'babel-loader',
            }]
        }, {
            test: /(.js)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            exclude: /node_modules/,
            options: {
                configFile: './.eslintrc.js'
            }
        }]
    }
};
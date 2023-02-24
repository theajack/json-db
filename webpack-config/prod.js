/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-24 22:02:51
 * @Description: Coding something
 */
const path = require('path');
const fs = require('fs');
const nodeModules = {};

fs.readdirSync('node_modules')
    .filter( (catalogue) => {
        return ['.bin'].indexOf(catalogue) === -1;
    })
    .forEach( (mod) => {
        nodeModules[mod] = 'commonjs ' + mod;
    });
    
module.exports = {
    mode: 'production',
    entry: [
        path.resolve('./', 'src/server.ts')
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve('./', 'dist')
    },
    /* 告知 webpack 为 node 服务，并忽略 externals 中的模块 */
    target: 'node',
    // externals: nodeModules,

    /* __dirname 和 __filename 指向原始地址 */
    context: __dirname,
    node: {
        __filename: false,
        __dirname: false
    },
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
        }]
    }
};
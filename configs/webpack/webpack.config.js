const resolve = require('path').resolve
const merge = require('webpack-merge').merge
const common = require('./webpack.common.js')

const PATHS = {
    src: resolve(__dirname, '../../src'),
    dist: resolve(__dirname, '../../dist'),
}

const config = (env, argv) =>
    merge(common, {
        entry: {
            index: PATHS.src + '/index.ts',
        },
        output: {
            path: PATHS.dist,
            libraryTarget: 'commonjs',
            filename: '[name].js',
        },
        devtool: argv.mode === 'production' ? false : 'source-map',
    })

module.exports = config

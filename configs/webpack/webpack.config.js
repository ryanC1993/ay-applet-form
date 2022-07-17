const resolve = require('path').resolve
const merge = require('webpack-merge').merge
const TerserPlugin = require('terser-webpack-plugin')
const common = require('./webpack.common.js')

const PATHS = {
    pkg: resolve(__dirname, '../../package.json'),
    src: resolve(__dirname, '../../src'),
    dist: resolve(__dirname, '../../dist'),
}

const config = (env, argv = {}) => {
    const pkg = require(PATHS.pkg)
    const mode = argv.mode || 'production'
    const isProd = mode === 'production'

    return merge(common, {
        mode,
        entry: {
            index: PATHS.src + '/index.ts',
        },
        output: {
            path: PATHS.dist,
            library: {
                name: pkg.name,
                type: 'umd',
            },
            filename: '[name].js',
            clean: true,
        },
        devtool: isProd ? false : 'source-map',
        externals: {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom',
            },
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
        },
    })
}

module.exports = config

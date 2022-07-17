const gulp = require('gulp')
const ts = require('gulp-typescript')
const babel = require('gulp-babel')
const merge2 = require('merge2')
const rimraf = require('rimraf')
const webpack = require('webpack')
// configs
const getBabelConfig = require('./configs/getBabelConfig')
const getWebpackConfig = require('./configs/webpack/webpack.config')

const { series, parallel } = gulp

function build({ dest, tsConfig = {}, babelOptions = {} }) {
    const tsProject = ts.createProject('tsconfig.json', tsConfig)
    const tsResult = tsProject.src().pipe(tsProject())
    merge2([
        tsResult.dts.pipe(gulp.dest(dest)),
        tsResult.js
            .pipe(babel(getBabelConfig(babelOptions)))
            .pipe(gulp.dest(dest)),
    ])
}

function buildLib(cb) {
    const dest = 'lib'
    const tsConfig = {}
    rimraf(dest, {}, () => {
        build({ dest, tsConfig })
        cb()
    })
}
function buildESLib(cb) {
    const dest = 'es'
    const babelOptions = { modules: false }
    rimraf(dest, {}, () => {
        build({ dest, babelOptions })
        cb()
    })
}
function buildDist(cb) {
    webpack(getWebpackConfig(), (_, stats) => {
        const buildInfo = stats.toString({
            colors: true,
        })
        console.log(buildInfo)
        cb()
    })
}

exports.build = series(parallel(buildLib, buildESLib, buildDist))

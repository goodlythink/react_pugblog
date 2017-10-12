const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const paths = require('./paths')
const ruleJS = require('./rules/ruleJS')
const ruleCSS = require('./rules/ruleCSS')
const ruleStatic = require('./rules/ruleStatic')

module.exports = {
    entry: {
        main: [
            require.resolve('./polyfills-client.js'),
            path.resolve(paths.src, 'index.js')
        ]
    },
    output: {
        filename: 'js/[name].js',
        path: paths.build,
        publicPath: '/build/',
    },
    resolve: {
        modules: [paths.src, 'node_modules'],
    },
    module: {
        rules: [
            ruleJS.prod,
            ruleCSS.global.prod,
            ruleCSS.cssModule.prod,
            ruleStatic,
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new AssetsPlugin({
            filename: 'webpack-assets.json',
            path: paths.root,
            prettyPrint: true
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
            allChunks: true,
        }),
        new webpack.SourceMapDevToolPlugin({
            test: /.js$/,
            filename: '[file].map',
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false,
                unused: true,
                dead_code: true
            },
            output: {
                comments: false
            },
            sourceMap: true
        })
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        crypto: 'empty'
    }
}
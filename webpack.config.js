!function ()
{
    "use strict";

    const ENV               = process.env.NODE_ENV || 'development';
    const webpack           = require('webpack');
    const path              = require('path');
    const isDev             = () => ENV === 'development';
    const ExtractTextPlugin = require("extract-text-webpack-plugin");

    const languages  = require('./languages.json');
    const extractCSS = new ExtractTextPlugin('[name].css', { allChunks: true });

    module.exports = {
        context: __dirname,

        entry : {
            index: path.resolve('src/index')
        },
        output: {
            path      : path.resolve('build'),
            filename  : "[name].js",
            publicPath: '/country-icons/build/'
        },

        plugins: [
            extractCSS,

            new webpack.NoErrorsPlugin(),
            new webpack.SourceMapDevToolPlugin(
                {
                    module  : isDev(),
                    filename: '[file].map',
                    exclude : [
                        /vendor\/.+\.js/,
                        /node_modules\/.+\.js/,
                        'index.js'
                    ]
                }
            ),

            new webpack.EnvironmentPlugin('NODE_ENV')
        ],

        resolve: {

            root      : [
                __dirname,
                path.resolve('src/modules'),
                path.resolve('node_modules')
            ],
            extensions: ["", ".js"]
        },

        resolveLoader: {
            modulesDirectories: ["node_modules"],
            extensions        : ["", ".js"],
            moduleTemplates   : ['*-loader', '*'],
            packageMains      : ["webpackLoader", "webLoader", "loader", "main"]
        },

        module: {
            loaders: [
                {
                    test   : /\.js$/,
                    include: [__dirname + '/src'],
                    loader : 'babel-loader',
                    query  : {
                        cacheDirectory: true
                    }
                },
                {
                    test  : /\.less$/,
                    loader: extractCSS.extract('style', 'css!postcss-loader?browsers=last 2 version!less')
                },
                {
                    test  : /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test  : /\.css$/,
                    loader: extractCSS.extract('style', 'css!postcss-loader?browsers=last 2 version')
                },
                {
                    test  : /\.(png|gif|jpg|svg|ttf|eot|woff|woff2)$/,
                    loader: 'url?name=[path][name].[ext]?[hash]&limit=4096'
                }
            ]
        },

        devServer: {
            host       : 'localhost',
            port       : 8080,
            contentBase: __dirname,
            hot        : true,
            inline     : true
        }
    };
}()
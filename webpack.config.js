!function()
{
    "use strict";
    
    const ENV               = process.env.NODE_ENV || 'development';
    const webpack           = require('webpack');
    const path              = require('path');
    const isDev             = () => ENV === 'development';
    const ExtractTextPlugin = require("extract-text-webpack-plugin");
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    
    let extractCSS = new ExtractTextPlugin('[name].css', { allChunks: true });
    
    
    module.exports = {
        context: __dirname + '/language-icons',
        
        entry : {
            index: ['webpack-dev-server/client?localhost:8080', "./index"]
        },
        output: {
            path      : __dirname + '/language-icons/build',
            filename  : "[name].js",
            library   : "[name]",
            publicPath: '/'
        },
        
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.ProvidePlugin(
                {
                    angular: 'angular'
                }
            ),
            new webpack.ContextReplacementPlugin(/node_modules/, /\*.js$/),
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

            new HtmlWebpackPlugin(
                {
                    template: 'index.html'
                }
            ),
            
            new webpack.EnvironmentPlugin('NODE_ENV')
        ],
        
        resolve: {
            root      : [
                path.resolve('language-icons/modules'),
                path.resolve('node_modules'),
                path.resolve('./')
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
                    include: [__dirname + '/language-icons'],
                    loader : 'babel-loader',
                    query  : {
                        cacheDirectory: true
                    }
                },
                {
                    test  : /\.less/,
                    loader: extractCSS.extract('style', 'css!postcss-loader?browsers=last 2 version!less')
                },
                {
                    test  : /\.css$/,
                    loader: extractCSS.extract('style', 'css!postcss-loader?browsers=last 2 version')
                },
                {
                    test  : /\.(png|gif|jpg|svg|ttf|eot|woff|woff2)$/,
                    loader: 'url?name=[path][name].[ext]?[hash]&limit=4096'
                },
                {
                    test  : /\.html$/,
                    loader: "raw-loader"
                }
            ],
            
            noParse: [/\/(node_modules|bower_modules)\/(angular\/angular|jquery)/] // no search require, command for webpack
        },
        
        devServer: {
            host       : 'localhost',
            port       : 8080,
            contentBase: __dirname,
            hot        : true
        }
    };
}()
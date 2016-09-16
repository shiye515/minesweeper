var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/main.js']
    },
    output: {
        path: path.resolve(__dirname, '../docs'),
        publicPath: '/minesweeper/',
        filename: '[name].[hash:7].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            loaders: ['babel'],
            include: path.join(__dirname, '../src')
        }, {
            test: /\.css|less$/,
            loader: ExtractTextPlugin.extract(['css', 'postcss', 'less'])
        }]
    },
    postcss: function () {
        return [require('autoprefixer')];
    },
    plugins: [
        new ExtractTextPlugin('[name].[contenthash:7].css'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
            inject: true
        })
    ]
};

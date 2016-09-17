var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/main.js']
    },
    output: {
        path: path.resolve(__dirname, '../docs'),
        publicPath: '/',
        filename: '[name].[hash:7].js'
    },
    devtool: '#inline-source-map',
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
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'url-loader?limit=10000'
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
    ],
    devServer: {
        // hot: true,
        // inline: true,
        port: 80
    }
};

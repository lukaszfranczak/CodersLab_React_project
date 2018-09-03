
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['whatwg-fetch', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './src/app.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['env', 'stage-2', 'es2017', 'react']
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|svg|gif|webp)/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'src/components/')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devServer: {
        historyApiFallback: true
    }
};
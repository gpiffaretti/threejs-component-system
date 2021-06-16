const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./app/src/testApp.js",
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ThreeJS tests',
            template: './index.html',
        }),
    ],
    devServer: {
        contentBase: './dist',
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        ignored: ['**/node_modules'],
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        minimize: false,
    },
};
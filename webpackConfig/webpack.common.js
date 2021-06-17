const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ifdefLoaderOptions = {
    DEBUG: true,
    LOGGING: true,
    version: 3,
    "ifdef-verbose": true,                 // add this for verbose output
    "ifdef-triple-slash": true,            // add this to use double slash comment instead of default triple slash
    "ifdef-fill-with-blanks": true,        // add this to remove code with blank spaces instead of "//" comments
    "ifdef-uncomment-prefix": "// #code "  // add this to uncomment code starting with "// #code "
 };

const contextPath = path.resolve(__dirname, "../");
console.log("webpack context: " + contextPath);

module.exports = (env) => {
    return {
        context: path.resolve(__dirname, "../"),
        entry: "./app/src/testApp.js",
        module: {
            rules: [
                
            ]
        },
        resolve: {
            alias: {
                logging: path.resolve(__dirname, './engine/subsystems/logging/logging.js')
            },
        },
        optimization: {
            minimize: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'ThreeJS tests',
                template: './index.html',
            }),
        ],
        devServer: {
            contentBase: './dist',
        },
        watchOptions: {
            aggregateTimeout: 500,
            ignored: ['**/node_modules'],
        },
        output: {
            filename: "main.js",
            path: path.join(contextPath, 'dist'),
            clean: true,
        },
    };
}
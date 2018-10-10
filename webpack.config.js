var webpack = require('webpack');
var path = require("path");

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx']
    },
    devServer: {
        hot: true,
        inline: true,
        
        port: 8100
    },
    entry: [
        'webpack/hot/only-dev-server',
        "./src/app.js"
    ],
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader'   // translates CSS into CommonJS
                }, {
                    loader: 'less-loader'  // compiles Less to CSS
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        })
    ]
};
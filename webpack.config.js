var webpack = require('webpack'); 
var path = require("path");

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devServer: {
        hot: true,
        inline: true,
        port: 8100,
        historyApiFallback: true,
    },

    entry: [
        'webpack/hot/only-dev-server',
        "./src/app.js"
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
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
                    loader: 'css-loader',   // translates CSS into CommonJS
                    options: { modules: true }
                }, {
                    loader: 'less-loader',  // compiles Less to CSS
                    options: {
                        javascriptEnabled: true
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.svg$/,
                loader: 'file-loader'
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        })
    ]
};
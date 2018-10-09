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
            { test: /\.css$/, loader: "style!css" },
            { test: /\.less/, loader: 'style-loader!css-loader!less-loader' },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

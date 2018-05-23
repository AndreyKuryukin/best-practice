const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'src/static/index.html',
            to: 'index.html'
        }]),
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: [
                    path.resolve(__dirname, 'src/app/scss')
                ],
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[hash:base64]-[name]-[local]'
                        }
                    }, 'fast-sass-loader']
                })
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'src/app/scss')
                ],
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]'
                        }
                    }, 'fast-sass-loader']
                })
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080,
        proxy: {
            '*': {
                target: 'ws://localhost:8081/',
                ws: true
            }
        }

    }
};
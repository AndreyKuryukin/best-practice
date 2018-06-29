const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const scssLoader  = require('./src/utils/uniq-scss-loader');

module.exports = {
    entry: './src/web/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'src/web/static/index.html',
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
                    path.resolve(__dirname, 'src/web/scss')
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
                    path.resolve(__dirname, 'src/web/scss')
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
            '/ws': {
                target: 'ws://localhost:8082/',
                ws: true
            }
        }

    }
};
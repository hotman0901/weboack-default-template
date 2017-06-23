var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 告知要把css抽離的檔案
var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath: '/dist'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            }, {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                // 改另外產生css檔案作法
                use: ExtractTextPlugin.extract({
                    use: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                // html 抽離到另外的檔案了
                use: ['html-loader']
            },
            {
                // 使用bootstrap 需要額外再加上這些副檔名，否則編譯會報錯
                test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            // 不曉得為什麼加上這個反而會多一個img路徑
                            // publicPath: 'img/'
                        }

                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        extractPlugin,
        // html 模板參考
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // 要將jquery include近來
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),


    ]
};
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin= require('copy-webpack-plugin');


const Paths = {
    src: path.join(__dirname, "./src"),
    dist: path.join(__dirname, "./dist"),
}


module.exports = {
    mode: 'development',
//ENTRY
    entry: {
        main: './src/page/index/app.js'
    },
//OUT
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
 //PLUGINS   
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './src/page/index/index.pug'
            
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/blocks/header/img', to: `img` },
            { from: 'src/fonts', to: `fonts`}
        ]),
    ],

//DEVSERVER
    devServer: {
        port: 4200,
        stats: 'errors-only'
    },
//CLASS
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true
                        },
                        
                    },
                    'css-loader'
                ]
            },
            
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true
                        },
                        
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },

            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]'
                    }
                  }
                ]
            }
        ]
    }
   
}
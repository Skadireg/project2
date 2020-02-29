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
        main: Paths.src + '/blocks/page/index/index.js',
        uikit: Paths.src+ '/blocks/uikit/colorbar&type/colorbar&type.js'
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
            template: './src/blocks/page/index/index.pug'    
        }),
        new HTMLWebpackPlugin({
            filename: 'colorbar&type.html',
            template: './src/blocks/uikit/colorbar&type/colorbar&type.pug'
        }),
        new HTMLWebpackPlugin({
            filename: 'header&footer.html',
            template: './src/blocks/uikit/header&footer/header&footer.pug'
        }),
        new HTMLWebpackPlugin({
            filename: 'test.html',
            template: './src/blocks/uikit/test/test.pug'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/blocks/logo/img', to: `img/page/` },
            { from: 'src/layout/img', to: `img/kit/` },
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
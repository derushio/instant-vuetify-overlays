import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import webpack from 'webpack';

import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

/**
 * Path / File
 */
const contextPath = path.resolve(__dirname, './');
const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

const isProduct = process.env.NODE_ENV == 'production';

/**
 * Webpack Config
 */
const config = {
    mode: process.env.NODE_ENV,

    context: contextPath,
    entry: {
        index: path.resolve(srcPath, 'index.ts'),
    },
    externals: {
        vue: {
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
            root: 'Vue'
        },
        vuetify: {
            commonjs: 'vuetify',
            commonjs2: 'vuetify',
            amd: 'vuetify',
            root: 'Vuetify'
        },
    },

    output: {
        path: distPath,
        filename: '[name].bundle.js',
        library: 'SomeLibrary',
        libraryTarget: 'umd',
    },

    resolve: {
        extensions: [ '.js', '.ts', '.json', '.styl' ],
        alias: {
            '@': path.resolve(srcPath),
        },
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [ 'ts-loader', 'tslint-loader' ],
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
            },
            {
                test: /\.styl$/,
                use: [ 'style-loader', 'css-loader', 'stylus-loader' ],
            }
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`,
            },
        }),
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: !isProduct,
                uglifyOptions: {
                    ecma: 8,
                    compress: {
                        warnings: false,
                    },
                },
            }),
        ],
    },

    devtool: isProduct? false: '#source-map',
};

export default config;

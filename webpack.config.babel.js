import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import webpack from 'webpack';

import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import nodeExternals from 'webpack-node-externals';

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
    externals: [ nodeExternals() ],

    output: {
        path: distPath,
        filename: '[name].bundle.js',
        library: 'SomeLibrary',
        libraryTarget: 'umd',
    },

    resolve: {
        extensions: [ '.js', '.ts', '.json' ],
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

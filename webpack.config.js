const dotenv = require('dotenv');
const env = Object.assign({},
    dotenv.config({ path: '.env' }).parsed || {},
    dotenv.config({ path: '.env.local' }).parsed || {});
env.NODE_ENV = (env.NODE_ENV === 'production')
    ? env.NODE_ENV
    : process.env.NODE_ENV;
console.log('NODE_ENV:', env.NODE_ENV);

const path = require('path');
const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');

/**
 * Path / File
 */
const contextPath = path.resolve(__dirname, './');
const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

const isProduct = env.NODE_ENV == 'production';

/**
 * Webpack Config
 */
module.exports = {
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

    devtool: isProduct? false: '#source-map',
};

const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()
const config = {
    mode: 'production',
    entry: [path.join(CURRENT_WORKING_DIR, 'client/index.js')],
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react', { "runtime": "automatic" }]]
                    }
                },
            },
        ],
    },
};

module.exports = config
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        publicPath: '/'
    },
    target: 'node',
    externals: nodeExternals(),
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production',
                PORT: process.env.PORT || 3000
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-2'],
                    plugins: ['transform-class-properties']
                }
            }
        ]
    }
}

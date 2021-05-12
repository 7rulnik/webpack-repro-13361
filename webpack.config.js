const Plugin = require('./Plugin')

module.exports = {
    mode: 'development',
    devtool: false,
    optimization: {
        runtimeChunk: true
    },
    plugins: [
        new Plugin()
    ]
}
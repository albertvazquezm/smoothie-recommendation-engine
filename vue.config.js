const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');

module.exports = {
    //publicPath: 'https://albertvazquezm.github.io/smoothie-recommendation-engine/',
    configureWebpack: {
        plugins: [
            new ServiceWorkerWebpackPlugin({
                entry: path.join(__dirname, './src/workers/SmoothieNeuralNetWorker.js'),
            }),
        ]
    }
}
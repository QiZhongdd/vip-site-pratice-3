const {
    join,
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    output: {
        publicPath: "/",
        assetModuleFilename: "images/[name][ext]",
        filename: "scripts/[name].bundle.js"
    },
    devServer: {
        historyApiFallback: true,
        contentBase: join(__dirname, '../dist'),
        port: 8082,
        // 配合 friendly-error-webpack-plugin
        // node-notifier webpack-build-notifier
        // quiet:true,
        watchContentBase: true,
        inline:true,

    },
    devtool:"source-map",
    plugins:[
        new HtmlWebpackPlugin({
            title:"京程一灯VIP官网",
            filename:"index.html",
            template:resolve(__dirname,"../src/index-dev.html")
        })
    ]
}
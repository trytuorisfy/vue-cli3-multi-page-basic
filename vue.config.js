const utils  = require('./utils/utils');
const webpack = require('webpack');
module.exports = {
  publicPath: './',  // 配置基本url
	pages: utils.getPages(),
  devServer: {
    port: 8085,
    proxy: {
      '/api': {
        target: 'http://192.168.0.0', //填上自己的地址啊
        changeOrigin: true
      }
    }
  },
  configureWebpack: {//引入jquery
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ]
  },
}
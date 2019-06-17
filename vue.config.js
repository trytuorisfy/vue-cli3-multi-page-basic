const utils  = require('./utils/utils');
const webpack = require('webpack');
const path = require('path')
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
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    },
    css: {
      loaderOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
}
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, 'src/assets/css/variable.less') // 需要全局导入的less
            ],
        })
}
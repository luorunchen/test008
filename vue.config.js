// var path = require('path');
module.exports = {

  devServer: {
    proxy: 'http://psy119.cn'
    // port: 8080, // 端口号配置
    // host: '127.0.0.1',
    // proxy: {
    //   '/api': {
    //     target: 'http://edog-online.com/earlyWarn',// 要跨域的域名
    //     changeOrigin: true, // 是否开启跨域
    //     pathRewrite: {
    //       '^/api': '' // 在请求的时候 凡是/api开头的地址都可以跨域
    //     }
    //   },
    // }
  },
  configureWebpack: {
    externals: {
      'AMap': 'AMap' // 高德地图配置
    }
  },

  lintOnSave: false,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false
  // performance: { hints: false }
  // configureWebpack: {
  //   performance: {
  //     hints: 'warning',
  //     //入口起点的最大体积 整数类型（以字节为单位）
  //     maxEntrypointSize: 50000000,
  //     //生成文件的最大体积 整数类型（以字节为单位 300k）
  //     maxAssetSize: 30000000,
  //     //只给出 js 文件的性能提示
  //     assetFilter: function (assetFilename) {
  //       return assetFilename.endsWith('.js');
  //     }
  //   }
  // }
}
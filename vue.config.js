module.exports = {
  // devServer: {
  //   port: 57103 // 端口号配置
  // },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://edog-online.com/earlyWarn',// 要跨域的域名
        changeOrigin: true, // 是否开启跨域
        pathRewrite: {
          '^/api': '/' // 在请求的时候 凡是/api开头的地址都可以跨域
        }
      },
    }
  },
  configureWebpack: {
    externals: {
      'AMap': 'AMap' // 高德地图配置
    }
  }
}
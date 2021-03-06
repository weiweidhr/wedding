module.exports = {
  baseUrl: '/wedding/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://dev.chelaile.net.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      }
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  productionSourceMap: false
}

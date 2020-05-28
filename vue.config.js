const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  assetsDir: 'static',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/mixin.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/': {
        target: 'http://a.jiuyeb.net/mobile.php', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  // svg 配置
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
    config.module.rules.delete("svg");
    config.module
      .rule('svg-smart')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
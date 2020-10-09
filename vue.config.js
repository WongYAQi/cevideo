const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.FLUENTFFMPEG_COV': 0
      })
    ]
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  },
  lintOnSave: false,
  devServer: {
    proxy: 'http://localhost:3000',
    hot: false
  }
}
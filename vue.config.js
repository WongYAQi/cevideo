module.exports = {
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
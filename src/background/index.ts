import { ipcMain } from 'electron'
/**
 * 与前端通信的内容初始化
 */
export default function (win) {
  ipcMain.on('TitleBar', (event, arg) => {
    if (arg === 'mini') {
      win.minimize()
    } else if (arg === 'max') {
      win.maximize()
      win.send('maximize')
    } else if (arg === 'close') {
      win.close()
    } else if (arg === 'unmax') {
      win.restore()
      win.send('unmaximize')
    }
  })
}

import { ipcMain, BrowserWindow } from 'electron'
/**
 * 与前端通信的内容初始化
 */
export default function (win: BrowserWindow) {
  ipcMain.on('TitleBar', (event, arg) => {
    if (arg === 'mini') {
      win.minimize()
    } else if (arg === 'max') {
      win.maximize()
      win.webContents.send('TitleBar', 'maximize')
    } else if (arg === 'close') {
      win.close()
    } else if (arg === 'unmax') {
      win.restore()
      win.webContents.send('TitleBar', 'unmaximize')
    }
  })
  ipcMain.on('msg_showList', (event, arg) => {
    let res = win.getSize()
    let [width, height] = res
    if (arg) {
      win.setSize(width + 300, height)
    } else {
      win.setSize(width - 300, height)
    }
  })
}

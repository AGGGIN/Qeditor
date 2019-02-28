'use strict'

import {app, BrowserWindow, ipcMain, Menu} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  if (process.platform === 'darwin') {
    const template = [
      {
        label: 'Application',
        submenu: [
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click () { app.quit() }
          }
        ]
      },
      {
        label: '编辑',
        submenu: [
          {label: '剪切', accelerator: 'CmdOrCtrl+X', role: 'cut'},
          {label: '复制', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
          {label: '粘贴', accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
          {label: '全选', accelerator: 'CmdOrCtrl+A', role: 'selectall'},
          {label: '撤销', accelerator: 'CmdOrCtrl+Z', role: 'undo'},
          {label: '重做', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo'}
        ]
      }
    ]
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  } else {
    Menu.setApplicationMenu(null)
  }

  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1000,
    frame: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('window-close', () => {
  mainWindow.close()
})

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})

const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron');

const mainWindow = require('./windows/main')
const settingWindow = require('./windows/setting')
const rendererWindow = require('./windows/renderer');

const windowBank = {
  'setting': settingWindow,
  'renderer': rendererWindow
}

let rendererParams = {
  x: 0,
  y: 0,
  w: 0,
  h: 0
}

app.whenReady().then(() => {
  mainWindow.open(app)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow()
  })
})

ipcMain.on('openWindow', (e, windowName) => {
  windowBank[windowName].open(rendererParams)
})

ipcMain.on('closeWindow', (e, windowName) => {
  windowBank[windowName].close()
})

ipcMain.on('faceData', (e, message) => {
})

ipcMain.on('setRendererSize', (e, dataString) => {
  const data = JSON.parse(dataString);
  rendererParams.w = parseInt(data.w);
  rendererParams.h = parseInt(data.h);
  if (rendererWindow.getInstance()) {
    console.log(rendererParams.w, rendererParams.h)
    rendererWindow.getInstance().setSize(rendererParams.w, rendererParams.h);
  }
})

ipcMain.on('setMouseIgnore', (e, windowName, value) => {
  const nowWindow = windowBank[windowName].getInstance()
  if (nowWindow) {
    nowWindow.setIgnoreMouseEvents(value)
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


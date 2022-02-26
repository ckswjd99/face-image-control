const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  log: (text) => ipcRenderer.send('message', text),
  faceData: (text) => ipcRenderer.send('faceData', text),
  setMouseIgnore: (windowName, data) => ipcRenderer.send('setMouseIgnore', windowName, data)
})
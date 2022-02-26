const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  log: (text) => ipcRenderer.send('message', text),
  openWindow: (windowName) => ipcRenderer.send('openWindow', windowName),
  closeWindow: (windowName) => ipcRenderer.send('closeWindow', windowName),
  setRendererSize: (data) => ipcRenderer.send('setRendererSize', JSON.stringify(data)),
  setMouseIgnore: (windowName, data) => ipcRenderer.send('setMouseIgnore', windowName, data)
})
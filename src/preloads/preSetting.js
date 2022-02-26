const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  log: (text) => ipcRenderer.send('message', text)
})
const path = require('path')
const { BrowserWindow } = require('electron');

let rendererWindowInstance = null;

const openRendererWindow = (rendererParams) => {
  if (rendererWindowInstance) {
    rendererWindowInstance.focus();
    return;
  }

  const win = new BrowserWindow({
    x: rendererParams.x,
    y: rendererParams.y,
    width: rendererParams.w,
    height: rendererParams.h,
    resizable: false,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preloads', 'preRenderer.js')
    }
  })
  rendererWindowInstance = win;

  win.setIgnoreMouseEvents(true);

  win.loadFile(path.join(__dirname, '..', 'public', 'renderer.html'))

  win.on('close', () => {
    rendererWindowInstance = null;
  })
}

const closeRendererWindow = () => {
  if (rendererWindowInstance) rendererWindowInstance.close();
  rendererWindowInstance = null;
}

module.exports = {
  getInstance: () => rendererWindowInstance,
  open: openRendererWindow,
  close: closeRendererWindow
}
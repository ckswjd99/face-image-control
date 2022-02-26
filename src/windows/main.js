const path = require('path');
const { BrowserWindow } = require('electron');

let mainWindowInstance = null;

const openMainWindow = (app) => {
  if (mainWindowInstance) {
    mainWindowInstance.focus();
    return;
  }
  const win = new BrowserWindow({
    width: 720,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preloads', 'preMain.js')
    }
  })
  mainWindowInstance = win;

  win.loadFile(path.join(__dirname, '..', 'public', 'main.html'))

  win.on("close", () => {
    mainWindowInstance = null;
    app.quit();
    return;
  })
}

const closeMainWindow = () => {
  mainWindowInstance.close();
}

module.exports = {
  getInstance: () => mainWindowInstance,
  open: openMainWindow,
  close: closeMainWindow
}
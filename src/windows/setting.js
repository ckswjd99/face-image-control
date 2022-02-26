const path = require('path')
const { BrowserWindow } = require('electron');

let settingWindowInstance = null;

const openSettingWindow = () => {
  if (settingWindowInstance) {
    settingWindowInstance.focus();
    return;
  }

  const win = new BrowserWindow({
    width: 800,
    height: 400,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preloads', 'preSetting.js')
    }
  })
  settingWindowInstance = win;

  win.loadFile(path.join(__dirname, '..', 'public', 'setting.html'))

  win.on('close', () => {
    settingWindowInstance = null;
  })
}

const closeSettingWindow = () => {
  if (settingWindowInstance) settingWindowInstance.close();
  settingWindowInstance = null;
}

module.exports = {
  getInstance: () => settingWindowInstance,
  open: openSettingWindow,
  close: closeSettingWindow
}
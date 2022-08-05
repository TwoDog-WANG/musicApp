const { BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
    const win = new BrowserWindow({
      width: 502,
      // height: 440,
      height: 80,
      frame: false,
      resizable: false,
      alwaysOnTop: true,
      webPreferences: {
        preload: path.join(__dirname, './preload/preload.js'),
      },
    })
    win.setSkipTaskbar(true);
    // win.webContents.openDevTools()
    // win.loadFile('./src/vue_dist/main.html')
    win.loadURL('http://localhost:8080/main.html');
    return win
}

module.exports = createWindow;
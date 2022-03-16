const { BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, './preload/preload.js')
      }
    })
    win.loadURL('http://localhost:8080/main.html');
    win.webContents.openDevTools();
}

module.exports = createWindow;
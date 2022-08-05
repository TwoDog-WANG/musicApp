const { BrowserWindow } = require('electron');

function minimizeWindow() {
    let mainWindow = BrowserWindow.getFocusedWindow();
    mainWindow.minimize();
}
function minsizeWindow(event, isMinsize) {
    let mainWindow = BrowserWindow.getFocusedWindow();
    mainWindow.setResizable(true);
    if(isMinsize) {
        mainWindow.setSize(502, 80);
        mainWindow.setAlwaysOnTop(true);
        mainWindow.setSkipTaskbar(true);
    }
    else {
        mainWindow.setSize(502, 440);
        mainWindow.setAlwaysOnTop(false);
    }
    mainWindow.setResizable(false);
}
function closeWindow() {
    let mainWindow = BrowserWindow.getFocusedWindow();
    mainWindow.close();
}
module.exports = {
    on_minimizeWindow: minimizeWindow,
    on_closeWindow: closeWindow,
    on_minsizeWindow: minsizeWindow,
}
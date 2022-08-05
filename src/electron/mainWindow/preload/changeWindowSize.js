const { ipcRenderer } = require('electron');

function minimizeWindow() {
    ipcRenderer.send('minimizeWindow');
}
function minsizeWindow(isMinsize) {
    ipcRenderer.send('minsizeWindow', isMinsize);
}
function closeWindow() {
    ipcRenderer.send('closeWindow');
}

module.exports = {
    minimizeWindow,
    closeWindow,
    minsizeWindow
}
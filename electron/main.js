const { app } = require('electron');
const path = require('path');

const createWindow = require('./mainWindow/createWindow');
const registerIpcMainListener = require(path.join(__dirname, 'registerIpcMainListener.js'));

registerIpcMainListener();

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})


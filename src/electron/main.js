const { app } = require('electron');


const createWindow = require('./mainWindow/createWindow');

app.on('ready', createWindow);


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
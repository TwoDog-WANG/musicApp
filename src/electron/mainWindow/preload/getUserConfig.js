const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

async function getUserConfig() {
    const appDir = await ipcRenderer.invoke('returnAppDir');
    const userConfig = await fs.promises.readFile(path.join(appDir, '/userData/userConfig.json'), 'utf-8');
    return JSON.parse(userConfig);
}

module.exports = {getUserConfig};
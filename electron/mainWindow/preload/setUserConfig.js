const { app,ipcRenderer } = require("electron");
const fs = require('fs');
const path = require("path");

async function setLocalMusicDir() {
    let dir = await ipcRenderer.invoke('setLocallMusicDir');
    let appDir = await ipcRenderer.invoke('returnAppDir');
    let config = null;
    try {
        config = JSON.parse(await fs.promises.readFile(path.join(appDir, '/userData/userConfig.json'), 'utf-8'));
        config.localMusicDir = dir;
    } catch (err) {
        await fs.promises.mkdir(path.join(appDir, '/userData'));
        config = {localMusicDir: dir};
    }
    await fs.promises.writeFile(path.join(appDir, '/userData/userConfig.json'), JSON.stringify(config, null, '\t'));
    
    return dir
}

module.exports = {setLocalMusicDir}
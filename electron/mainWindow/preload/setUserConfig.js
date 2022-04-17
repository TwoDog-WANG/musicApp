const { dir } = require("console");
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

async function logNoListWarning() {
    let res = await ipcRenderer.invoke('logNoListWarning');
    if(res.response === 0) {
        alert('可以通过左上角的设置按钮来设置本地文件夹');
    }
    return res.response
}

module.exports = {setLocalMusicDir, logNoListWarning}
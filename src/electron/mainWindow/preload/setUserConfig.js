const { ipcRenderer } = require("electron");
const fs = require('fs');
const path = require("path");

async function setLocalMusicDir() {
    let dir = await ipcRenderer.invoke('setLocallMusicDir');
    return {
        dir
    }
}

async function logNoListWarning() {
    let res = await ipcRenderer.invoke('logNoListWarning');
    if(res.response === 0) {
        alert('可以通过左上角的设置按钮来设置本地文件夹');
    }
    return res.response
}

module.exports = {setLocalMusicDir, logNoListWarning}
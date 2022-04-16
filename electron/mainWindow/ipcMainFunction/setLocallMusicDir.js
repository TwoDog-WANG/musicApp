const { dialog } = require("electron");
const fs = require('fs');
const path = require("path");

async function setLocallMusicDir() {
    let res = await dialog.showOpenDialog({
        title: '选择本地音乐文件夹',
        properties:["openDirectory"]
    });
    console.log(res.filePaths);
    return res.filePaths[0]
}

module.exports = {
    handle_setLocallMusicDir: setLocallMusicDir
}
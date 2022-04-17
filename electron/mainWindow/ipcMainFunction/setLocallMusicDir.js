const { dialog } = require("electron");

async function setLocallMusicDir() {
    let res = await dialog.showOpenDialog({
        title: '选择本地音乐文件夹',
        properties:["openDirectory"]
    });
    if(res.canceled) {
        return 0
    }
    return res.filePaths[0]
}



module.exports = {
    handle_setLocallMusicDir: setLocallMusicDir
}
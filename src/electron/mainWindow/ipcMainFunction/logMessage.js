const { dialog } = require("electron");

async function logNoListWarning() {
    let res = await dialog.showMessageBox({
        message: '对不起，所选的文件夹没有歌曲，\n是否重新选择文件夹？',
        type: 'question',
        buttons: ['no', 'ok'],
    })
    return res
}



module.exports = {
    handle_logNoListWarning: logNoListWarning
}
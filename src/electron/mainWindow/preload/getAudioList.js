const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require('electron');
const {v4: uuidv4} = require('uuid');
const mm = require('music-metadata');

async function getAudioList(nowPath, isFist = false) {
    let musicInfList = null;
    let hasCatchMusicList = false;
    const appDir = await ipcRenderer.invoke('returnAppDir');
    if(isFist) {
        try {
            musicInfList = JSON.parse(await fs.promises.readFile(path.join(appDir,'/userData/userMusicList.json')), 'utf-8');
            hasCatchMusicList = true;
        } catch (err) {
            // 这里没读到缓存的音乐，就直把下面if里的代码放进来，鼠标不方便，下次
            console.log(err)
        }
    }
    if(!hasCatchMusicList) {
        // 读文件
        let musicNameList =  ( await fs.promises.readdir(nowPath) )
        .filter((fileName) => {
            return /(.mp3|.flac)$/i.test(fileName)
        });
        // 对于长度为0的数组，直接抛出错误
        if(musicNameList.length === 0) {
            throw 0;
        }
        else {
            let config = null;
            try {
                config = JSON.parse(await fs.promises.readFile(path.join(appDir, '/userData/userConfig.json'), 'utf-8'));
                config.localMusicDir = nowPath;
            } catch (err) {
                try {
                    await fs.promises.mkdir(path.join(appDir, '/userData'));
                } catch (error) {
                    console.log(error);
                }
                config = {localMusicDir: nowPath};
            }
            await fs.promises.writeFile(path.join(appDir, '/userData/userConfig.json'), JSON.stringify(config, null, '\t'));
        }
        // promise.all 提供一个可以使用await的环境，map最后放回的不是promise，会通过promise.reject转化为promis
        musicInfList = await Promise.all(musicNameList.map(async (value) => {
            // 读文件的基础信息
            let stats = await fs.promises.stat(path.join(nowPath, value));
            let musicInf = await mm.parseFile(path.join(nowPath, value), {
                skipCovers: true,
            });
            // let musicInf = await mm.parseStream(fileStream, value);
            return {
                musicName: value,
                birthTime: stats.birthtimeMs,
                duration: musicInf.format.duration,
                title: musicInf.common.title,
                artist: musicInf.common.artist,
                id: uuidv4()
            }
        }));
        await fs.promises.writeFile(path.join(appDir, '/userData/userMusicList.json'), JSON.stringify(musicInfList, null, '\t'))
    }
    return musicInfList;
}

module.exports = {getAudioList};
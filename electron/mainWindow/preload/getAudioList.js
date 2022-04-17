const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const mm = require('music-metadata');

async function getAudioList(nowPath) {
    // 读文件
    let musicNameList =  ( await fs.promises.readdir(nowPath) )
    .filter((fileName) => {
        return /(.mp3|.flac)$/i.test(fileName)
    });
    // 对于长度为0的数组，直接抛出错误
    if(musicNameList.length === 0) {
        throw 0;
    }
    // promise.all 提供一个可以使用await的环境，map最后放回的不是promise，会通过promise.reject转化为promis
    let musicInfList = await Promise.all(musicNameList.map(async (value) => {
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
    return musicInfList;
}

module.exports = {getAudioList};
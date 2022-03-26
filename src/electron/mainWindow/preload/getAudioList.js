const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

let basicPath = path.join('F:/music');

async function getAudioList(path = basicPath) {
    let musicNameList = ( await fs.promises.readdir(path) )
    .filter((fileName) => {
        return /(.mp3|.flac)$/i.test(fileName)
    })
    .map((value) => {
        //通过uuid来标识文件
        return {
            musicName: value,
            id: uuidv4(),
        }
    })
    //异步获得文件名后，map内部异步获得文件的stats，放回的是一个promise，所以可以用promise.all来接，随后await等待
    //因文件名不会重复，所以不在通过stat来标识文件
    // musicNameList = await Promise.all(musicNameList.map(async (value) => {
    //     const res = await fs.promises.stat(path + '/' + value);
    //     return {
    //         musicNmae: value,
    //         id: res.birthtimeMs
    //     };
    // }))
    return musicNameList;
}

module.exports = getAudioList;
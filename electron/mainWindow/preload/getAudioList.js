const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const mm = require('music-metadata');

let basicPath = path.join('F:/music');

async function getAudioList(nowPath = basicPath) {
    let musicNameList =  ( await fs.promises.readdir(nowPath) )
    .filter((fileName) => {
        return /(.mp3|.flac)$/i.test(fileName)
    });
    
    let musicInfList = await Promise.all(musicNameList.map(async (value) => {
        try {
            let stats = await fs.promises.stat(path.join(nowPath, value));
            //let fileStream = fs.createReadStream(path.join(nowPath, value), {end: 512*1024});
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
        } catch (err) {
            console.log(`value is ${value} \n`,err);
        }
    }));
    
    return musicInfList;
}

module.exports = {getAudioList};
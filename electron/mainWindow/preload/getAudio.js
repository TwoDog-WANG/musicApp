const fs = require('fs');
const path = require('path');

const basicPath = path.join('F:/music/');

async function getAudio(endPath = '3nd - Nemure.mp3') {
    let path = basicPath + endPath;
    const audioBuffer = await fs.promises.readFile(path);
    //将buffer变为无符号的8位数组，arraybuffer
    const audioArrayBuffer = Uint8Array.from(audioBuffer);
    
    return URL.createObjectURL(new Blob([audioArrayBuffer]));
}

module.exports = {getAudio};
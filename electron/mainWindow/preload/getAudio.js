const fs = require('fs');
const path = require('path');

const basicPath = path.resolve(__dirname, '../../111.mp3');

async function getAudio(path = basicPath) {
    const audioBuffer = await fs.promises.readFile(path);
    //将buffer变为无符号的8位数组，arraybuffer
    const audioArrayBuffer = Uint8Array.from(audioBuffer);
    
    return URL.createObjectURL(new Blob([audioArrayBuffer]));
}

module.exports = getAudio;
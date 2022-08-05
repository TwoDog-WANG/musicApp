const { BrowserWindow  } = require('electron');

let context = BrowserWindow.getAllWindows()[0].webContents;

function nextMusic() {
    context.send('changeMusic', 'next');
}
function preMusic() {
    context.send('changeMusic', 'pre');  
}
function addVolume() {
    context.send('changeMusic', 'add');
}
function subVolume() {
    context.send('changeMusic', 'sub');
}
function changeMode() {
    context.send('changeMusic', 'mode');
}
function toPlay() {
    context.send('changeMusic', 'play');
}
module.exports = {
    Control_Right: nextMusic,
    Control_Left: preMusic,
    Control_Up: addVolume,
    Control_Down: subVolume,
    Control_Alt_c: changeMode,
    Control_Space: toPlay,
}
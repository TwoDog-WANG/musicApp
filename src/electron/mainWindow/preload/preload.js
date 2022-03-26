const { contextBridge } = require('electron');
const fs = require('fs')

const getAudio = require('./getAudio.js');
const getAudioList = require('./getAudioList.js');

contextBridge.exposeInMainWorld('getAudio',getAudio);
contextBridge.exposeInMainWorld('getAudioList', getAudioList);
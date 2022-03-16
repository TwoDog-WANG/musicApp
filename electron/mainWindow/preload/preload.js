const { contextBridge } = require('electron');

const getAudio = require('./getAudio.js');

contextBridge.exposeInMainWorld('getAudio',getAudio)
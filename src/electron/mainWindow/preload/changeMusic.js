const { ipcRenderer } = require('electron');

function changeMusic(componentData) {
    ipcRenderer.on('changeMusic', (e, controlStr) => {
        switch (controlStr) {
            case 'next':
                componentData.changePlayIndex();
                break;
            case 'pre':
                componentData.changePlayIndex('preMusic');
                break;
            case 'add':
                componentData.addOrSubVolume('+');
                break;
            case 'sub':
                componentData.addOrSubVolume('-');
                break;
            case 'mode':
                componentData.changePlayMode();
                break;
            case 'play': 
                componentData.toPlay();
                break;
            default:
                break;
        }
    })
}

module.exports = {changeMusic}
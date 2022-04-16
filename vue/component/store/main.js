import { createStore } from "vuex";

const stores = {
    state() {
        return {
            myAudio: null,
            audioControlState: {
                audioIsPaused: true,
                //确保index相同的时候，watch能够监听到对应的数值
                playIndex: {num: NaN},
                isSortList: false,
            },
            audioList: [],
            audioRandomList: [],
            playList: [],
            userConfig: {
                localMusicDir: '',
            },
            userPlayState: {
                musicName: '',
                currentTime: NaN,
            }
        }
    },
    mutations: {
        setMyAudioEle(state, ele) {
            state.myAudio = ele;
        },
        setAudioList(state, list) {
            state.audioList = list;
        },
        setAudioRandomList(state, list) {
            state.audioRandomList = list;
        },
        setPlayList(state, list) {
            list.sort((v1, v2) => {
                if(v1.birthTime > v2.birthTime) {
                    return -1
                }
                else if(v1.birthTime === v2.birthTime) {
                    if(v1.musicName > v2.musicName) {
                        return 1
                    }
                    else {
                        return 0
                    }
                }
                else {
                    return 1
                }
            })
            state.playList = list;
        },
        sortPlayList(state, sortObj) {
            if(sortObj.dir === 0) {
                state.playList.sort((v1, v2) => {
                    if(v1.birthTime > v2.birthTime) {
                        return -1
                    }
                    else if(v1.birthTime === v2.birthTime) {
                        if(v1.musicName > v2.musicName) {
                            return 1
                        }
                        else {
                            return 0
                        }
                    }
                    else {
                        return 1
                    }
                });
            }
            else {
                if(sortObj.sortName === 'name-div') {
                    if(sortObj.dir === 1) {
                        state.playList.sort((v1, v2) => {
                            let name1 = v1.title? v1.title : v1.musicName.reduce((one, two) => {
                                return one + two
                            })
                            let name2 = v2.title? v2.title : v2.musicName.reduce((one, two) => {
                                return one + two
                            })
                            if(name1 > name2) {
                                return 1
                            }
                            else if(name1 === name2) {
                                if(v1.birthTime > v2.birthTime) {
                                    return -1
                                }
                                else {
                                    return 0
                                }
                            }
                            else {
                                return -1
                            }
                        })
                    }
                    else {
                        state.playList.sort((v1, v2) => {
                            let name1 = v1.musicName.reduce((one, two) => {
                                return one + two
                            })
                            let name2 = v2.musicName.reduce((one, two) => {
                                return one + two
                            })
    
                            if(name1 < name2) {
                                return 1
                            }
                            else if(name1 === name2) {
                                if(v1.birthTime > v2.birthTime) {
                                    return -1
                                }
                                else {
                                    return 0
                                }
                            }
                            else {
                                return -1
                            }
                        })
                    }
                }
                else if(sortObj.sortName === 'music-time-div') {
                    if(sortObj.dir === 1) {
                        state.playList.sort((v1, v2) => {
                            return v2.duration - v1.duration
                        })
                    }
                    else {
                        return v1.duration - v2.duration
                    }
                }
                else if(sortObj.sortName === 'music-artist-div') {
                    if(sortObj.dir === 1) {
                        state.playList.sort((v1, v2) => {
                            if(v1.artist < v2.artist) {
                                return 1
                            }
                            else if(v1.artist === v2.artist) {
                                if(v1.birthTime > v2.birthTime) {
                                    return -1
                                }
                                else {
                                    return 0
                                }
                            }
                            else {
                                return -1
                            }
                        })
                    }
                    else {
                        state.playList.sort((v1, v2) => {
                            if(v1.artist > v2.artist) {
                                return 1
                            }
                            else if(v1.artist === v2.artist) {
                                if(v1.birthTime > v2.birthTime) {
                                    return -1
                                }
                                else {
                                    return 0
                                }
                            }
                            else {
                                return -1
                            }
                        })
                    }
                }
            }

        },
        pushMusicToPlayList(state, music) {
            state.playList.splice(state.audioControlState.playIndex.num, 0, music);
        },
        setAudioIsPaused(state, value) {
            state.audioControlState.audioIsPaused = value;
        },
        changePlayIndex(state, value) {
            state.audioControlState.playIndex = {num: value};
        },
        changeIsSortList(state, value) {
            state.audioControlState.isSortList = value;
        },
        setLocalMusicDir(state, dir) {
            state.userConfig.localMusicDir = dir
        }
    }
}

const store = createStore(stores);

export default store
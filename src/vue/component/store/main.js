import { createStore } from "vuex";

const stores = {
    state() {
        return {
            myAudio: null,
            audioControlState: {
                audioIsPaused: true,
                playIndex: 0,
            },
            audioList: [],
            audioRandomList: [],
            playList: [],
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
            state.playList = list;
        },
        setAudioIsPaused(state, value) {
            state.audioControlState.audioIsPaused = value;
        },
        changePlayIndex(state, value) {
            state.audioControlState.playIndex = value;
        }
    }
}

const store = createStore(stores);

export default store
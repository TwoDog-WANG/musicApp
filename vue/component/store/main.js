import { createStore } from "vuex";

const stores = {
    state() {
        return {
            myAudio: null,
        }
    },
    mutations: {
        getMyAudioEle(state, ele) {
            state.myAudio = ele;
        }
    }
}

const store = createStore(stores);

export default store
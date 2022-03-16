<template>
    <MyAudioComponent
        :audioSrc="audioSrc"
    ></MyAudioComponent>
</template>

<script>
import MyAudioComponent from './component/myAudioComponent/MyAudioComponent.vue';
import src from '../electron/111.mp3';
export default {
    components: {
        MyAudioComponent,
    },
    data() {
        return {
            audioSrc: src
        }
    },
    created () {
        // window.getAudio().then(res => {
        //     if(this.audioSrc) {
        //         URL.revokeObjectURL(this.audioSrc);
        //     }
        //     this.audioSrc = res;
        // });
    },
}
</script>

<style>
    #app {
        margin-top: 200px;
    }
</style>
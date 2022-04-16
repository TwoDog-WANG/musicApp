<template>
    <MyAudioComponent></MyAudioComponent>
</template>

<script>
import MyAudioComponent from './component/myAudioComponent/MyAudioComponent.vue';
import src from 'C:/Users/王二狗/Desktop/web/konomusic/src/electron/111.mp3'
export default {
    components: {
        MyAudioComponent,
    },
    data() {
        return {
        }
    },
    methods: {
    },
}
</script>

<style>
    #app {
        margin-top: 200px;
    }
    /* body {
        -webkit-app-region: drag;
    }
    .click {
        -webkit-app-region: no-drag;
    } */
</style>
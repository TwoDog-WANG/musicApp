<template>
    <div class="my-audio-component" ref="myAudioComponent">
        <MainSpace></MainSpace>
        <ControlComponent></ControlComponent>
    </div>
</template>

<script>
import ControlComponent from './controlComponent/ControlComponent.vue'
import MainSpace from './ListSpace/MainSpace.vue';
export default {
    components: {
        ControlComponent,
        MainSpace,
    },
    data() {
        return {
        }
    },

    methods: {

    },
}
</script>

<style lang="less">


</style>
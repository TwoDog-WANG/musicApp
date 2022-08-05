<template>
    <div class="windowsize-space" @click="closeSizeBtn">
        <div class="minsize-button windowsize-button" @click="minsizeWindow">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6125"><path d="M449.92 543.36C449.92 520.96 431.36 512 410.24 512L97.92 512c-17.92 0-32 14.08-32 32 0 17.92 14.08 32 32 32l242.56 0-267.52 267.52c-12.16 12.16-12.16 31.36 0 43.52 12.16 12.16 31.36 12.16 43.52 0l269.44-269.44 0 246.4c0 17.92 14.08 32 32 32 17.92 0 32-14.08 32-32l0-320M865.92 384 622.72 384l267.52-267.52c12.16-12.16 12.16-31.36 0-43.52-12.16-12.16-31.36-12.16-43.52 0L577.92 342.4 577.92 96C577.92 78.08 563.2 64 545.92 64c-17.92 0-32 14.08-32 32l0 320c0 0.64 0.64 1.28 0.64 1.92 0 8.32 2.56 16.64 8.96 22.4C531.2 448.64 542.72 451.2 552.96 448l312.32 0c17.92 0 32-14.08 32-32C897.92 398.08 883.2 384 865.92 384z" p-id="6126"></path>
            </svg>
        </div>
        <div class="minimize-button windowsize-button" @click="minimizeWindow">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5804" data-spm-anchor-id="a313x.7781069.0.i7"><path d="M863.7 552.5H160.3c-10.6 0-19.2-8.6-19.2-19.2v-41.7c0-10.6 8.6-19.2 19.2-19.2h703.3c10.6 0 19.2 8.6 19.2 19.2v41.7c0 10.6-8.5 19.2-19.1 19.2z" p-id="5805"></path>
            </svg>
        </div>
        <div class="close-button windowsize-button" @click="closeWindow">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4912"><path d="M512 456.310154L94.247385 38.557538a39.542154 39.542154 0 0 0-55.689847 0 39.266462 39.266462 0 0 0 0 55.689847L456.310154 512 38.557538 929.752615a39.542154 39.542154 0 0 0 0 55.689847 39.266462 39.266462 0 0 0 55.689847 0L512 567.689846l417.752615 417.752616c15.163077 15.163077 40.290462 15.36 55.689847 0a39.266462 39.266462 0 0 0 0-55.689847L567.689846 512 985.442462 94.247385a39.542154 39.542154 0 0 0 0-55.689847 39.266462 39.266462 0 0 0-55.689847 0L512 456.310154z" p-id="4913"></path>
            </svg>
        </div>
    </div>
</template>

<script setup>
    import { useStore } from 'vuex';
    const store = useStore();

    const emit = defineEmits(['closeSizeBtn']);
    function closeSizeBtn() {
        emit('closeSizeBtn');
    }

    function minimizeWindow() {
        if(window.minimizeWindow) {
            window.minimizeWindow();
        }
    }
    function closeWindow() {
        if(window.closeWindow) {
            window.closeWindow();
        }
    }
    function minsizeWindow() {
        store.commit('changeIsMinsize');
        if(window.minsizeWindow) {
            window.minsizeWindow(store.state.isMinsize);
        }
    }
</script>

<style lang="less" scoped>
    @mikuColor: hsl(165, 100%, 60%);
    .windowsize-space {
        height: 100%;
        display: flex;
        -webkit-app-region: no-drag;
        .windowsize-button {
            transition: background-color 0.15s ease-in;
        }
        & > .windowsize-button:hover {
            background-color: #66ccff74;
        }
        .minsize-button {
            height: 100%;
            svg {
                width: 24px;
                margin: 3px;
                fill: @mikuColor;                   
            }                   
        }
        .minimize-button {
            height: 100%;
            svg {
                width: 28px;
                margin: 1px;
                fill: @mikuColor;                   
            }                 
        }
        .close-button {
            height: 100%;
            svg {
                width: 18px;
                margin: 6px;
                fill: @mikuColor;                   
            }
        }
    }
</style>
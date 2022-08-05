<template>
    <div class="my-audio-component" ref="myAudioComponent">
        <MainSpace v-show="!isMinsize"></MainSpace>
        <ControlComponent></ControlComponent>
    </div>
</template>

<script setup>
    import { computed, watch } from '@vue/runtime-core';
    import { useStore } from 'vuex';
        
    import deepCopy from '../../../basicFunction/deepCopy.js';

    import ControlComponent from './controlComponent/ControlComponent.vue'
    import MainSpace from './ListSpace/MainSpace.vue';

    const store = useStore();
    
    // 控制mainSpace是否出现
    let isMinsize = computed(() => {
        return store.state.isMinsize;
    })

    // 得到 user config
    if(window.getUserConfig) {
        window.getUserConfig()
        .then(res => {
            // 改变 local music dir
            store.commit('setLocalMusicDir', res.localMusicDir);
        })
        .catch((err) => {
            // dir或者说config不存在的时候，弹出设置界面
            window.setLocalMusicDir()
            .then(res => {
                if(res.dir === 0) {
                    alert('可以通过左上角的设置按钮来设置本地文件夹');
                    return
                }
                store.commit('setLocalMusicDir', res.dir)
            })
            .catch((err) => {
                if(err === 0) {
                    alert('可以通过左上角的设置按钮来设置本地文件夹')
                }
            })
        })
    }

    const musicDir = computed(() => {
        return store.state.userConfig.localMusicDir
    })
    // music dir改变
    watch(musicDir, (newDir, oldDir) => {
        
        if(window.getAudioList) {
            // 根据新的dir，获取音乐列表
            console.log(store.state.audioControlState.isFistLoad);
            window.getAudioList(newDir.dir, store.state.audioControlState.isFistLoad)
            .then((res) => {
                res.map((value, index, arr) => {
                    //split接受的正则表达式如果有捕获括号，那么括号内的也会被填入到数组中
                    //这里value是浅拷贝，可以直接value.musicName.split(/(.flac|.mp3|\s-\s)/)，不用赋值
                    arr[index].musicName = value.musicName.split(/(.flac|.mp3)/)
                });
                //let copyList = deepCopy(res);
                let copyList2 = deepCopy(res);
                //let randomList = [];
                //不重复生成随机歌单，现在直接使用random生成播放列表的索引，会有重复的概率，播放列表的长度越小，重复概率越高
                // while (copyList.length > 0) {
                //     let random = parseInt(Math.random() * copyList.length);
                //     randomList.push(copyList.splice(random, 1))
                // }
                //store.commit('setAudioRandomList', randomList);
                store.commit('setAudioList', res);
                store.commit('setPlayList', copyList2);
                // list 存在
                store.commit('setNoList', false);
                // 根据isFistLoad，来判断是否是第一次载入
                if(store.state.audioControlState.isFistLoad) {
                    // remain: 根据上一次最后播放的歌曲来改变playindex，暂时先不用，后面在改
                    store.commit('changePlayIndex', 0);
                    store.commit('setIsFistLoad', false);
                }
                else {
                    // 不是第一次的时候，改变music dir后，将playIndex置0，audioIsPaused置true，方便后续重置播放状态
                    store.commit('setAudioIsPaused', true)
                    store.commit('changePlayIndex', 0);
                }
            })
            .catch((err) => {
                if(store.state.audioControlState.isFistLoad) {
                    store.commit('setIsFistLoad', false);
                }
                store.commit('setNoList', true);
                // 对于读取文件报错的情况
                window.logNoListWarning()
                .then(res => {
                    if(res !== 0) {
                        window.setLocalMusicDir()
                        .then((res) => {
                            if(res.dir === 0) {
                                alert('可以通过左上角的设置按钮来设置本地文件夹');
                                return
                            }
                            store.commit('setLocalMusicDir', res.dir);
                        })
                    }
                })
            }) 
        }
    })

</script>

<style lang="less">
    * {
        font-family: 'Cambria Math',"宋体",sans-serif;
        user-select: none;
    }
</style>
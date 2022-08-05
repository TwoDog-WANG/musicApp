<template>
    <div class="list-space">
        <div class="list-control-space">
            <div class="setting-button" @click="toSetUserConfig">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M512 697.6c102.4 0 182.4-83.2 182.4-185.6 0-102.4-83.2-185.6-182.4-185.6-102.4 0-182.4 83.2-182.4 185.6C329.6 614.4 412.8 697.6 512 697.6L512 697.6zM512 646.4c-73.6 0-134.4-60.8-134.4-134.4 0-73.6 60.8-134.4 134.4-134.4 73.6 0 134.4 60.8 134.4 134.4C646.4 585.6 585.6 646.4 512 646.4L512 646.4z" p-id="2016"></path><path d="M249.015232 843.178592c35.2 28.8 73.6 51.2 112 67.2 41.6-38.4 96-60.8 150.4-60.8 57.6 0 108.8 22.4 150.4 60.8 41.6-16 80-38.4 112-67.2-12.8-54.4-3.2-112 22.4-163.2 28.8-48 73.6-86.4 128-102.4 3.2-22.4 6.4-44.8 6.4-67.2 0-22.4-3.2-44.8-6.4-67.2-54.4-16-99.2-54.4-128-102.4-28.8-48-35.2-108.8-22.4-163.2-35.2-28.8-73.6-51.2-112-67.2-41.6 38.4-92.8 60.8-150.4 60.8-54.4 0-108.8-22.4-150.4-60.8-41.6 16-80 38.4-112 67.2 12.8 54.4 3.2 112-22.4 163.2-28.8 48-73.6 86.4-128 102.4-3.2 22.4-6.4 44.8-6.4 67.2 0 22.4 3.2 44.8 6.4 67.2 54.4 16 99.2 54.4 128 102.4C252.215232 731.178592 261.815232 788.778592 249.015232 843.178592M361.015232 958.378592c-54.4-19.2-105.6-48-150.4-89.6-6.4-6.4-9.6-16-6.4-22.4 16-48 9.6-99.2-16-140.8-25.6-44.8-64-73.6-112-83.2-9.6-3.2-16-9.6-16-19.2-6.4-28.8-9.6-60.8-9.6-89.6 0-28.8 3.2-57.6 9.6-89.6 3.2-9.6 9.6-16 16-19.2 48-12.8 89.6-41.6 112-83.2 25.6-44.8 28.8-92.8 16-140.8-3.2-9.6 0-19.2 6.4-22.4 44.8-38.4 96-67.2 150.4-89.6 9.6-3.2 16 0 22.4 6.4 35.2 35.2 80 57.6 128 57.6 48 0 96-19.2 128-57.6 6.4-6.4 16-9.6 22.4-6.4 54.4 19.2 105.6 48 150.4 89.6 6.4 6.4 9.6 16 6.4 22.4-16 48-9.6 99.2 16 140.8 25.6 44.8 64 73.6 112 83.2 9.6 3.2 16 9.6 16 19.2 6.4 28.8 9.6 60.8 9.6 89.6 0 28.8-3.2 57.6-9.6 89.6-3.2 9.6-9.6 16-16 19.2-48 12.8-89.6 41.6-112 83.2-25.6 44.8-28.8 92.8-16 140.8 3.2 9.6 0 19.2-6.4 22.4-44.8 38.4-96 67.2-150.4 89.6-9.6 3.2-16 0-22.4-6.4-35.2-35.2-80-57.6-128-57.6-48 0-96 19.2-128 57.6-3.2 3.2-9.6 6.4-16 6.4C364.215232 958.378592 361.015232 958.378592 361.015232 958.378592z" ></path>
                </svg>
            </div>
            <div class="search-space">
                <div class="search-input-space">
                    <div class="search-button" @click="toSearch">
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M446.112323 177.545051c137.567677 0.219798 252.612525 104.59798 266.162424 241.493333 13.562828 136.895354-78.778182 261.818182-213.617777 289.008485-134.852525 27.203232-268.386263-52.156768-308.945455-183.608889s25.018182-272.252121 151.738182-325.779394A267.235556 267.235556 0 0 1 446.112323 177.545051m0-62.060607c-182.794343 0-330.989899 148.195556-330.989899 330.989899s148.195556 330.989899 330.989899 330.989899 330.989899-148.195556 330.989899-330.989899-148.195556-330.989899-330.989899-330.989899z m431.321212 793.341415a30.849293 30.849293 0 0 1-21.94101-9.102223l-157.220202-157.220202c-11.752727-12.179394-11.584646-31.534545 0.37495-43.50707 11.972525-11.972525 31.327677-12.140606 43.494141-0.37495l157.220202 157.220202a31.036768 31.036768 0 0 1 6.723232 33.810101 31.004444 31.004444 0 0 1-28.651313 19.174142z m0 0" p-id="2218"></path>
                        </svg>
                    </div>
                    <div class="input-space">
                        <input type="text" v-model="searchName" ref="searchInput">
                    </div>
                </div>
                <!-- <div class="search-list-show-space">
                        <span v-for="searchObj in searchList" :key="searchObj.id">
                            {{ searchObj.musicName }}
                        </span>
                </div> -->
                <SearchList 
                    :list="searchList"
                    :basicStyle="searchStyle"
                    :isShow="searchIsShow"
                    ref="searchList"
                    @clearSearch="clearSearch"
                >
                </SearchList>
            </div>
            <div class="now-music-button" @click="toNowMusic">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3836"><path d="M648.256 850.272a32 32 0 1 1-40.704-49.386667C758.304 676.693333 832 566.037333 832 471.072 832 293.344 688.693333 149.333333 512 149.333333c-176.693333 0-320 144.010667-320 321.738667 0 115.232 108.416 253.045333 329.173333 409.493333a32 32 0 0 1-37.013333 52.213334C248.021333 765.429333 128 612.853333 128 471.072 128 258.069333 299.882667 85.333333 512 85.333333s384 172.736 384 385.738667c0 118.378667-83.701333 244.053333-247.744 379.2zM512 618.666667c-82.474667 0-149.333333-66.858667-149.333333-149.333334s66.858667-149.333333 149.333333-149.333333 149.333333 66.858667 149.333333 149.333333-66.858667 149.333333-149.333333 149.333334z m0-64a85.333333 85.333333 0 1 0 0-170.666667 85.333333 85.333333 0 0 0 0 170.666667z" p-id="3837"></path>
                </svg>
            </div>
            <ChangeWindowSizeButtton></ChangeWindowSizeButtton>
        </div>
        <div class="music-info-space" @click="toSortMusic">
            <div class="name-div sort-div">
                <span>标题</span>
                <div :class="['up-down', {'to-down': upSort['name-div'] === 2 ? true: false}]" v-if="upSort['name-div']"></div>
            </div>
            <div class="music-artist-div sort-div">
                <span>作者</span>
                <div :class="['up-down', {'to-down': upSort['music-artist-div'] === 2 ? true: false}]" v-if="upSort['music-artist-div']"></div>
            </div>
            <div class="music-time-div sort-div">
                <span>时长</span>
                <div :class="['up-down', {'to-down': upSort['music-time-div'] === 2 ? true: false}]" v-if="upSort['music-time-div']"></div>
            </div>
        </div>
        <ContainAndScroll :list="audioList" :isPlay="true" ref="contain"></ContainAndScroll>
    </div>
</template>

<script>
//特此标注，现阶段需要将list和scroll抽象出来，可以复用的东西
import deepCopy from '../../../../../basicFunction/deepCopy.js';

import ContainAndScroll from './ContainScroll.vue';   
import SearchList from './SearchList.vue';
import ChangeWindowSizeButtton from '../../ChangeWindowSizeButton.vue';
export default {
    components: {
        ContainAndScroll,
        SearchList,
        ChangeWindowSizeButtton
    },
    data() {
        return {
            audioList: [],
            choseNum: 0,
            listStyle: {
                top: '0px',
                bottom: '',
            },
            scrollButtonStyle: {
                height: '100%',
                top: '0%',
            },
            basicScrollDistance: 0,
            mouseY: 0,
            searchName: '',
            searchList: [],
            searchStyle: {
                height: 210,
                width: 304,
                spanHeight: 30,
                fontSize: 16,
                top: 30,
                zIndex: 2,
            },
            searchIsShow: false,
            upSort: {
                'name-div': 0,
                'music-time-div': 0,
                'music-artist-div': 0,
            },
            isChangeMusicDir: false
        }
    },
    watch: {
        '$store.state.playList': {
            handler(newValue, oldValue) {
                this.audioList = newValue.map((value) => {
                    const audioSecond = parseInt(value.duration % 60).toString().length < 2 ? `0${parseInt(value.duration % 60)}` : parseInt(value.duration % 60);
                    const audioMinute = parseInt(value.duration / 60).toString().length < 2 ? `0${parseInt(value.duration / 60)}` : parseInt(value.duration / 60);
                    let time = `${audioMinute} : ${audioSecond}`
                    if(value.musicName.length === 3) {
                        return {
                            name: value.title ? value.title : value.musicName[0],
                            artist: value.artist,
                            id: value.id,
                            duration: time,
                            format: value.musicName[1].slice(1),
                            isChose: false,
                        }
                    }
                });
                if(this.isChangeMusicDir) {
                    this.$store.commit('setAudioIsPaused', true);
                    this.$store.commit('changePlayIndex', 0);
                    this.isChangeMusicDir = false;
                }
            },
            //在排序playList的时候，如果没有deep，则不会触发监听
            deep: true,
        },
        searchName: {
            handler(newValue) {
                if(newValue.length > 0) {
                    //调用searchList组件的resetList方法
                    this.$refs.searchList.resetList();
                    let reg = new RegExp(`${newValue}`, 'i');
                    //这里的filter对value时一个浅拷贝，在内部对musicName进行join操作会使得store里的audioList改变
                    //深拷贝一下
                    let deepList = deepCopy(this.$store.state.audioList);
                    this.searchList = deepList.filter((value) => {
                        return reg.test(value.musicName.join(''))
                    })
                    .map((val, index, arr) => {
                        let obj = {
                            name: val.musicName.join(''),
                            isChose: false,
                            id: val.id,
                        }
                        return obj
                    });
                    if(this.searchList.length < 8) {
                        this.searchStyle.height = (this.searchList.length) * 30;
                    }
                    else {
                        this.searchStyle.height = 210;
                    }
                    this.searchIsShow = true;
                }
                else {
                    this.searchIsShow = false;
                }

            }
        }
    },
    methods: {
        toSetUserConfig() {
            window.setLocalMusicDir()
            .then(res => {
                if(res.dir === 0) {
                    alert('可以通过左上角的设置按钮来设置本地文件夹');
                    return
                }
                this.isChangeMusicDir = true;
                this.$store.commit('setLocalMusicDir', res.dir)
            })
        },
        toNowMusic() {
            this.$refs.contain.toNowMusic();
        },
        clearSearch() {
            this.searchName = '';
            this.searchList = [];
            this.searchIsShow = false;
        },
        toSortMusic(e) {
            let getDivClassName = (ele) => {
                if(ele.className.split(' ')[1] === 'sort-div') {
                    return ele.className.split(' ')[0]
                }
                else {
                    return ele.parentElement ? getDivClassName(ele.parentElement) : undefined
                }
            }
            let divClassName = getDivClassName(e.target);
            if(this.upSort[divClassName] <= 1) {
                this.upSort[divClassName]++
            }
            else {
                this.upSort[divClassName] = 0;
            }
            let sortObj = {sortName: divClassName, dir: this.upSort[divClassName]}
            let oldMusicObj = this.$store.state.playList[this.$store.state.audioControlState.playIndex.num];
            this.$store.commit('sortPlayList', sortObj);
            let list = this.$store.state.playList;
            let nowIndex = list.findIndex((value) => {
                return value === oldMusicObj
            })
            this.$store.commit('changeIsSortList', true);
            this.$store.commit('changePlayIndex', nowIndex);
        },
    },
}
</script>
<style lang="less">
    @mikuColor: hsl(165, 100%, 60%);

    .list-space {
        height: 100%;
        .list-control-space {
            width: 500px;
            height: 30px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            -webkit-app-region: drag;
            .setting-button {
                height: 100%;
                margin-left: 10px;
                -webkit-app-region: no-drag;
                svg {
                    width: 26px;
                    margin: 2px 0;
                    fill: @mikuColor;
                    transition: transform 0.3s linear;
                    &:hover {
                        transform: rotate(180deg);
                    }
                }
            }
            .search-space {
                margin-left: 10px;
                position: relative;
                -webkit-app-region: no-drag;
                .search-input-space {
                    height: 30px;
                    display: flex;
                    .input-space {
                        height: 30px;
                        width: 275px;
                        overflow: hidden;
                        input {
                            float: left;
                            width: 250px;
                            height: 24px;
                            border: 2px @mikuColor solid;
                            outline: none;
                            border-radius: 13px;
                            padding: 0px 10px;
                            margin: 1px 0;
                            font-size: 16px;
                            line-height: 24px;
                        }
                    }
                    svg {
                        width: 30px;
                        height: 24px;
                        margin-top: 3px;
                        fill: @mikuColor;
                    }
                }
            }
            .now-music-button {
                -webkit-app-region: no-drag;
                height: 100%;
                margin-left: auto;
                margin-right: 10px;
                svg {
                    width: 26px;
                    margin: 2px 0;
                    fill: @mikuColor;
                }
            }
        }
        .music-info-space {
            width: 492px;
            height: 30px;
            display: flex;
            font-size: 16px;
            line-height: 30px;
            cursor: default;
            .sort-div {
                transition: background-color 0.15s linear;
                &:hover {
                    background-color: @mikuColor;
                }
                .up-down {
                    width: 0px;
                    height: 0px;
                    display: inline-block;
                    margin-left: 5px;
                    margin-bottom: 2px;
                    border-left: 4px solid transparent;
                    border-right: 4px solid transparent;
                    border-bottom: 6px rgb(255, 255, 255) solid;
                    transition: transform 0.15s linear;
                }
                .up-down.to-down {
                    transform: rotate(180deg);
                }
            }
            .name-div {
                width: 250px;
                margin-left: 50px;
                flex-grow: 1;
            }
            .music-artist-div {
                width: 150px;
                margin-left: 10px;
            }
            .music-time-div {
                width: 60px;
                margin-right: 10px;
            }
        }
    }
</style>
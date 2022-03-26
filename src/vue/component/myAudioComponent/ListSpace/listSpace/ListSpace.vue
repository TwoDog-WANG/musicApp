<template>
    <div class="list-space">
        <div class="list-control-space">
            <div class="search-space">
                <div class="search-input-space">
                    <input type="text" v-model="searchName">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M446.112323 177.545051c137.567677 0.219798 252.612525 104.59798 266.162424 241.493333 13.562828 136.895354-78.778182 261.818182-213.617777 289.008485-134.852525 27.203232-268.386263-52.156768-308.945455-183.608889s25.018182-272.252121 151.738182-325.779394A267.235556 267.235556 0 0 1 446.112323 177.545051m0-62.060607c-182.794343 0-330.989899 148.195556-330.989899 330.989899s148.195556 330.989899 330.989899 330.989899 330.989899-148.195556 330.989899-330.989899-148.195556-330.989899-330.989899-330.989899z m431.321212 793.341415a30.849293 30.849293 0 0 1-21.94101-9.102223l-157.220202-157.220202c-11.752727-12.179394-11.584646-31.534545 0.37495-43.50707 11.972525-11.972525 31.327677-12.140606 43.494141-0.37495l157.220202 157.220202a31.036768 31.036768 0 0 1 6.723232 33.810101 31.004444 31.004444 0 0 1-28.651313 19.174142z m0 0" p-id="2218"></path>
                    </svg>
                </div>
                <div class="search-list-show-space">
                        <span v-for="searchObj in searchList" :key="searchObj.id">
                            {{ searchObj.musicName }}
                        </span>

                </div>
            </div>
            <div class="now-music-button">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6608" ><path d="M512 512m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z" p-id="6609"></path><path d="M960 480h-33.632C910.752 276.16 747.84 113.248 544 97.632V64a32 32 0 1 0-64 0v33.632C276.16 113.248 113.248 276.16 97.632 480H64a32 32 0 0 0 0 64h33.632C113.248 747.84 276.16 910.752 480 926.368V960a32 32 0 1 0 64 0v-33.632C747.84 910.752 910.752 747.84 926.368 544H960a32 32 0 1 0 0-64zM544 862.368V800a32 32 0 1 0-64 0v62.368C311.424 847.104 176.896 712.576 161.632 544H224a32 32 0 1 0 0-64H161.632C176.896 311.424 311.424 176.896 480 161.632V224a32 32 0 0 0 64 0V161.632c168.576 15.296 303.104 149.792 318.368 318.368H800a32 32 0 1 0 0 64h62.368c-15.264 168.576-149.792 303.104-318.368 318.368z" p-id="6610"></path>
                </svg>
            </div>
        </div>
        <div class="music-info-space">

        </div>
        <div class="list-show-space" @wheel="listToWheel">
            <div class="list-contain-space" :style="listStyle" @dblclick="toPlayMusic">
                <span 
                    v-for="(musicname) in audioList" 
                    :key="musicname.id" 
                    :class="{'chose-style': musicname ? musicname.isChose : false}"
                    :title="musicname ? musicname.name : musicname"
                >
                    <!-- audioList是通过异步获得的，所以在初始阶段直接通过n来获得名字会报错，三元一下 -->
                    {{musicname ? musicname.name : musicname}}
                </span>
            </div>
            <div class="list-scroll-bar">
                <div 
                    class="list-scroll-button" 
                    :style="scrollButtonStyle"
                    @mousedown="bigMove"
                >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//特此标注，现阶段需要将list和scroll抽象出来，可以复用的东西
import deepCopy from '../../../../../basicFunction/deepCopy.js'

export default {
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
            searchName: '',
            searchList: [],
        }
    },
    created () {
        if(window.getAudioList) {
            window.getAudioList()
            .then((res) => {
                res.map((value, index, arr) => {
                    //split接受的正则表达式如果有捕获括号，那么括号内的也会被填入到数组中
                    //这里value是浅拷贝，可以直接value.musicName.split(/(.flac|.mp3|\s-\s)/)，不用赋值
                    arr[index].musicName = value.musicName.split(/(.flac|.mp3|\s-\s)/)
                });
                let copyList = deepCopy(res);
                let copyList2 = deepCopy(res);
                let randomList = [];
                while (copyList.length > 0) {
                    let random = parseInt(Math.random() * copyList.length);
                    randomList.push(copyList.splice(random, 1))
                }
                this.$store.commit('setAudioList', res);
                this.$store.commit('setAudioRandomList', randomList);
                this.$store.commit('setPlayList', copyList2);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else {
            //axios to get audioSrc and get audioList
        };
    },
    watch: {
        '$store.state.playList': {
            handler(newValue, oldValue) {
                this.audioList = newValue.map((value) => {
                    if(value.musicName.length === 5) {
                        return {
                            name: value.musicName[2],
                            isChose: false,
                            id: value.id
                            }
                    }
                    else if(value.musicName.length === 3) {
                        return {
                            name: value.musicName[0],
                            isChose: false,
                            id: value.id
                            }
                    }
                    else {
                        return {
                            name: value.musicName.slice(0, -2).join(''),
                            isChose: false,
                            id: value.id
                        }
                    }
                }); 
                this.audioList[this.choseNum].isChose = true;
                //滚动按钮的最小高度为5%，以移动5条歌曲滚动1%，最高容纳485，大于485的直接5%
                //不过在歌曲数较小的情况下，滚动条很难看，所以不使用这种方法，直接将滚动按钮调至5%
                if(this.audioList.length > 10 && this.audioList.length <= 190) {
                    let height = 100 - (this.audioList.length - 10) / 2;
                    this.scrollButtonStyle.height = height + '%';
                }
                else if(this.audioList.length > 190) {
                    this.scrollButtonStyle.height = '10%'
                }
                else {
                    this.scrollButtonStyle.height = '100%'
                }
                // if(this.audioList.length > 10) {
                //     this.scrollButtonStyle.height = '5%';
                // }
                this.basicScrollDistance = (100 - parseFloat(this.scrollButtonStyle.height)) / (this.audioList.length - 10);
            }
        },
        '$store.state.audioControlState.playIndex': {
            handler(newValue) {
                this.choseNum = newValue;
            },
            immediate: true,
        },
        //等会处理
        choseNum: { 
            handler(newValue, oldValue) {
                if(newValue > 4 && newValue < this.audioList.length - 6) {
                    this.listStyle.top =   -(this.choseNum - 4) * 26 + 'px';
                    this.scrollButtonStyle.top = (this.choseNum - 4) * this.basicScrollDistance + '%';
                    this.scrollButtonStyle.bottom = null;
                }
                else if(newValue <= 4 ) {
                    this.listStyle.top = '0%';
                    this.scrollButtonStyle.top = '0%';
                }
                else if(newValue >= this.audioList.length - 6) {
                    this.listStyle.top = -(this.audioList.length - 11) * 26 + 'px';
                }
                if(oldValue || oldValue === 0) {
                    this.audioList[oldValue].isChose = false;
                }
                this.audioList[newValue].isChose = true;
           },
        },
        searchName: {
            handler(newValue) {
                if(newValue.length > 0) {
                    let reg = new RegExp(`${newValue}`, 'i');
                    //这里的filter对value时一个浅拷贝，在内部对musicName进行join操作会使得store里的audioList改变
                    //深拷贝一下
                    let deepList = deepCopy(this.$store.state.audioList);
                    this.searchList = deepList.filter((value) => {
                        return reg.test(value.musicName.join(''))
                    })
                    if(this.searchList.length > 0) {
                        this.searchList.map((val, index, arr) => {
                            arr[index].musicName = val.musicName.join('')
                        })
                    }

                }

            }
        }
    },
    methods: {
        listToWheel(e) {
            if(e.deltaY > 0 && this.choseNum < this.audioList.length - 1) {
                this.choseNum++;
            }
            else if(e.deltaY < 0 && this.choseNum > 0) {
                
                this.choseNum--;
            }
        },
        //老三样，不过e.offsetY获得后在this.Move中使用闭包传值后，无法取消监听，所以通过this.mouseY来存值
        bigMove(e) {
            this.mouseY = e.offsetY;
            document.addEventListener('mousemove', this.Move);
            document.addEventListener('mouseup', this.endMove);
        },
        Move(e) {
            e.preventDefault();
            let track = document.getElementsByClassName('list-scroll-bar')[0].getBoundingClientRect();
            let precent = (e.clientY - this.mouseY - track.top) / track.height * 100;
            if(precent > 0 && precent < ( 100 - parseFloat(this.scrollButtonStyle.height) ) ) {
                if(precent < 0.5) {
                    precent = 0;
                }
                else if(precent > ( 99.5 - parseFloat(this.scrollButtonStyle.height) ) ) {
                    precent = 100 - parseFloat(this.scrollButtonStyle.height);
                }
                this.choseNum = parseInt(precent / this.basicScrollDistance) + 4;
            }
        },
        endMove(e) {
            document.removeEventListener('mousemove', this.Move);
        },
        toPlayMusic(e) {
            e.preventDefault();
            let index;
            if(e.target.tagName === 'SPAN') {
                let arr = Array.from(e.currentTarget.children);
                index = arr.findIndex((ele) => ele === e.target);
            }
            this.$store.commit('setAudioIsPaused', false);
            this.$store.commit('changePlayIndex', index);
        }
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
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            .search-space {
                margin-left: auto;
                margin-right: 10px;
                position: relative;
                .search-input-space {
                    height: 30px;
                    display: flex;
                        input {
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
                        svg {
                            width: 30px;
                            height: 30px;
                            fill: @mikuColor;
                        }
                }
                .search-list-show-space {
                    position: absolute;
                    z-index: 2;
                    background-color: white;
                    width: 100%;
                    top: 40px;
                    span {
                        display: block;
                        width: 100%;
                        font-size: 15px;
                    }
                }
            }
            .now-music-button {
                height: 100%;
                svg {
                    width: 26px;
                    margin: 2px 0;
                    fill: @mikuColor;
                }
            }
        }
        .list-show-space {
            width: 500px;
            height: 300px;
            //background: linear-gradient(white, @mikuColor, white);
            // background: linear-gradient(lighten(@mikuColor, 30%), @mikuColor, lighten(@mikuColor, 30%));
            overflow: hidden;
            font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
            position: absolute;
            bottom: 0%;
            .list-contain-space {
                position: absolute;
                transition: top 0.15s linear;
                span {
                    width: 492px;
                    font-size: 13px;
                    line-height: 26px;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: block;
                    color: rgba(180, 180, 180, 0.493);
                    transition: all 0.15s linear;
                    cursor: default;
                    user-select: none;
                }
                .chose-style {
                    font-size: 25px;
                    line-height: 35px;
                    color: rgb(100, 100, 100);
                }

            }
            .list-scroll-bar {
                width: 8px;
                height: 300px;
                position: absolute;
                top: 0;
                right: 0;
                border-radius: 5px;
                background: linear-gradient(white, @mikuColor, white);
                .list-scroll-button {
                    position: absolute;
                    width: 8px;
                    background-color: #66ccff;
                    border-radius: 4px;
                }
            }
        }
    }
</style>
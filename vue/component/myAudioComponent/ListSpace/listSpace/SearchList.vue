<template>
    <div 
        class="list-show-space" 
        @wheel="listToWheel" 
        :style="{height: basicStyle.height + 'px', width: basicStyle.width + 'px', top: basicStyle.top + 'px', zIndex: basicStyle.zIndex}"
        v-show="isShow"
    >
        <div class="list-contain-space" :style="listStyle" @dblclick="toPlayMusic">
            <div 
                v-for="(musicInf, index) in list" 
                :key="musicInf.id" 
                :class="['search-list-div', {'chose-style': musicInf ? musicInf.isChose : false}]"
                :title="musicInf ? musicInf.name : musicInf"
                :style="{height: basicStyle.spanHeight + 'px',fontSize: basicStyle.fontSize + 'px', lineHeight: basicStyle.spanHeight +'px'}"
            >
                <span class="list-index">
                    {{++index}}
                </span>
                <span class="list-name">
                    {{musicInf ? musicInf.name : musicInf}}
                </span>
            </div>
        </div>
        <div class="list-scroll-bar" :style="{height: basicStyle.height + 'px'}" ref="scrollBar" v-if="scrollIsShow">
            <div 
                class="list-scroll-button" 
                :style="scrollButtonStyle"
                @mousedown="bigMove"
            >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Object,
        },
        basicStyle: {
            type: Object,
            default: {
                height: 300,
                width: 500,
                spanHeight: 25,
                fontSize: 13,
                top: '',
                zIndex: 0,
            }
        },
        isPlay: {
            type: Boolean,
            default: false,
        },
        isShow: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            listMoveNum: 0,
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
            scrollIsShow: true,
        }
    },
    created () {
        if(this.isPlay) {
            this.$watch('$store.state.audioControlState.playIndex', {
                handler: (newValue, oldValue) => {
                    if(newValue.num >= 5) {
                        this.listMoveNum = newValue.num - 5;
                    }
                    else {
                        this.listMoveNum = 0;
                    }
                    this.list[newValue.num].isChose = true;
                    if(oldValue || oldValue === 0) {
                        this.list[oldValue].isChose = false;
                    }
                }
            })
        };
    },
    watch: {
        list: {
            handler(newValue) {
                if(this.isPlay) {
                    this.list[this.listMoveNum].isChose = true;
                }
                
                //滚动按钮的最小高度为10%，以移动2条歌曲滚动1%，最高容纳190，大于190的直接10%
                if(this.list.length > 10 && this.list.length <= 190) {
                    let height = 100 - (this.list.length - this.basicStyle.height / this.basicStyle.spanHeight) / 2;
                    this.scrollButtonStyle.height = height + '%';
                }
                else if(this.list.length > 190) {
                    this.scrollButtonStyle.height = '10%'
                }
                else {
                    //这个时候应该让滚动条消失，以后再弄
                    this.scrollButtonStyle.height = '100%';
                    this.scrollIsShow = false;
                }
                //滚动条剩下的高度除以列表显示出来剩余的条数，就得到滚动一条需要滚动的百分数
                this.basicScrollDistance = (100 - parseFloat(this.scrollButtonStyle.height)) / (this.list.length - this.basicStyle.height / this.basicStyle.spanHeight);
            }
        },
        listMoveNum: { 
            handler(newValue, oldValue) {
                let spanHeight = this.basicStyle.spanHeight;
                /**
                //从第四行开始移动
                let endNum = this.basicStyle.height / spanHeight - 4;
                if(newValue > 4 && newValue < this.list.length - endNum) {
                    this.listStyle.top =   -(this.listMoveNum - 4) * spanHeight + 'px';
                    this.scrollButtonStyle.top = (this.listMoveNum - 4) * this.basicScrollDistance + '%';
                }
                else if(newValue <= 4 ) {
                    this.listStyle.top = '0%';
                    this.scrollButtonStyle.top = '0%';
                }
                else if(newValue >= this.list.length - endNum){
                    this.listStyle.top = -(this.list.length - this.basicStyle.height / spanHeight) * spanHeight + 'px';
                }
                 */
                //从第二行开始移动
                if(newValue > 0 && newValue < this.list.length - this.basicStyle.height / spanHeight) {
                    this.listStyle.top = -(this.listMoveNum) * spanHeight + 'px';
                    this.scrollButtonStyle.top = this.listMoveNum * this.basicScrollDistance + '%';
                }
                else if(newValue === 0) {
                    this.listStyle.top = '0%';
                    this.scrollButtonStyle.top = '0%';
                }
                else if(newValue === this.list.length - this.basicStyle.height / spanHeight) {
                    this.listStyle.top = -(this.list.length - this.basicStyle.height / spanHeight) * spanHeight + 'px';
                    this.scrollButtonStyle.top = 100 - parseFloat(this.scrollButtonStyle.height) + '%'
                }
        
                /**
                //从第四行开始移动的时候，选中第四行的元素
                if(oldValue || oldValue === 0) {
                    this.list[oldValue].isChose = false;
                }
                this.list[newValue].isChose = true;
                 */

           },
        },
    },
    methods: {
        listToWheel(e) {
            let spanHeight = this.basicStyle.spanHeight;
            //小于list长度-窗口容纳的条数时
            if(e.deltaY > 0 && this.listMoveNum < this.list.length - this.basicStyle.height / spanHeight) {
                this.listMoveNum++;
            }
            else if(e.deltaY < 0 && this.listMoveNum > 0) {
                this.listMoveNum--;
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
            //let track = document.getElementsByClassName('list-scroll-bar')[0].getBoundingClientRect();
            let track = this.$refs.scrollBar.getBoundingClientRect();
            //鼠标Y方向位置-鼠标一开始点击时的位置得到滚动按钮顶部的位置，在减去轨道顶部的位置，得到按钮和轨道之间的差值，在取百分号
            //不过这个时候不对按钮位置进行赋值，而是除以基本移动距离，得到listMoveNum的值，此时由于向上取整，得到的都是小于等于此时按钮位置的值
            let precent = (e.clientY - this.mouseY - track.top) / track.height * 100;
            if(precent > 0 && precent < ( 100 - parseFloat(this.scrollButtonStyle.height) ) ) {
                if(precent < 1) {
                    precent = 0;
                }
                else if(precent > ( 99.5 - parseFloat(this.scrollButtonStyle.height) ) ) {
                    precent = 100 - parseFloat(this.scrollButtonStyle.height);
                }
                //从第四行开始移动
                //this.listMoveNum = parseInt(precent / this.basicScrollDistance) + 4;

                //此时precent / this.basicScrollDistance在precent拉到底的时候，为this.list.length - this.basicStyle.height / this.basicStyle.spanHeight
                //如果此时basicStyle.height不能整除basicStyle.lineHeight，那么listMoveNum无法取到最后一个数，整个目录就无法拉到最后
                //this.basicScrollDistance = (100 - parseFloat(this.scrollButtonStyle.height)) / (this.list.length - this.basicStyle.height / this.basicStyle.spanHeight);
                this.listMoveNum = parseInt(precent / this.basicScrollDistance);
            }
        },
        endMove(e) {
            document.removeEventListener('mousemove', this.Move);
        },
        resetList() {
            this.listMoveNum = 0;
        },
        toPlayMusic(e) {
            this.$emit('clearSearch');
            let name;
            if(e.target.className === 'list-name') {
                name = e.target.innerText;
            }
            else if(e.target.className === 'list-index') {
                name = e.target.nextElementSibling.innerText;
            }
            else {
                name = e.target.children[1].innerText;
            }
            let list = this.$store.state.playList;
            let index = list.findIndex((value) => {
                let nameStr = value.musicName.map((value) => {return value}).join('');
                return nameStr === name
            })
            if(index != -1) {
                this.$store.commit('setAudioIsPaused', false);
                this.$store.commit('changePlayIndex', index);
            }
            else {
                let list = this.$store.state.audioList;
                let index = list.findIndex((value) => {
                    let nameStr = value.musicName.map((value) => {return value}).join('');
                    return nameStr === name
                })
                if(index != -1) {
                    this.$store.commit('setAudioIsPaused', false);
                    this.$store.commit('pushMusicToPlayList', list[index]);
                    this.$store.commit('changePlayIndex', this.$store.state.audioControlState.playIndex.num + 1)
                }
            }
        }
    },
    emits: ['clearSearch']
}
</script>

<style lang="less" scoped>
    @mikuColor: hsl(165, 100%, 60%);

    .list-show-space {
        width: 500px;
        height: 300px;
        background: rgb(255, 255, 255);
        //background: linear-gradient(white, @mikuColor, white);
        // background: linear-gradient(lighten(@mikuColor, 30%), @mikuColor, lighten(@mikuColor, 30%));
        overflow: hidden;
        font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
        position: absolute;
        background: hsl(165, 100%, 80%);
        border-radius: 5px;
        .list-contain-space {
            width: 100%;
            position: absolute;
            transition: top 0.15s linear;
            .search-list-div {
                width: 100%;
                color: rgb(180, 180, 180);
                transition: all 0.15s linear;
                cursor: default;
                user-select: none;
                display: flex;
                align-items: center;
                &:hover {
                    background: hsl(165, 100%, 60%);
                }
                .list-index {
                    width: 20px;
                    text-align: center;
                    margin-left: 5px;
                    margin-right: 5px;
                }
                .list-name {
                    width: 265px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

        }
        .list-scroll-bar {
            width: 8px;
            height: 300px;
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 5px;
            background: hsl(165, 100%, 80%);
            .list-scroll-button {
                position: absolute;
                width: 8px;
                background-color: #66ccff;
                border-radius: 4px;
            }
        }
    }
</style>
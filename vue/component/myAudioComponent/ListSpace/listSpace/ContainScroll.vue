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
                :class="['list-div', {'chose-style': musicInf ? musicInf.isChose : false}]"
                :title="musicInf ? `${musicInf.name} - ${musicInf.artist}` : 'none'"
                :style="{height: basicStyle.spanHeight + 'px',fontSize: basicStyle.fontSize + 'px', lineHeight: basicStyle.spanHeight +'px'}"
            >
                <span class="music-index">
                    {{++index}}
                </span>
                <svg 
                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    :style="{visibility: musicInf && musicInf.isChose ? 'visible' : 'hidden'}"
                >
                    <path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z" p-id="2524"></path><path d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z" p-id="2525"></path>
                </svg>
                <span class="music-name">
                    {{musicInf ? musicInf.name : 'none'}}
                </span>
                <span class="music-artist">
                    {{musicInf ? musicInf.artist : 'none'}}
                </span>
                <span class="music-duration-time">
                    {{musicInf ? musicInf.duration : 'none'}}
                </span>
            </div>
        </div>
        <div class="list-scroll-bar" :style="{height: basicStyle.height + 'px'}" ref="scrollBar">
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
            default: true,
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
        }
    },
    created () {
        if(this.isPlay) {
            this.$watch('$store.state.audioControlState.playIndex', {
                handler: (newValue, oldValue) => {
                    //playInde会直接获得，但是list获得的时间靠后，需要等到下一个周期在去设置
                    this.$nextTick(() => {
                        let spanHeight = this.basicStyle.spanHeight;
                        if(this.list.length > this.basicStyle.height / spanHeight && newValue.num >= 5 && newValue.num < this.list.length - this.basicStyle.height / spanHeight) {
                            this.listMoveNum = newValue.num - 5;
                        }
                        else if(this.list.length > this.basicStyle.height / spanHeight && newValue.num >= this.list.length - this.basicStyle.height / spanHeight) {
                            this.listMoveNum = this.list.length - this.basicStyle.height / spanHeight;
                        }
                        else {
                            this.listMoveNum = 0;
                        }
                        if(!isNaN(oldValue.num)) {
                            this.list[oldValue.num].isChose = false;
                        }
                        this.list[newValue.num].isChose = true;
                    })

                },
            })
        };
    },
    watch: {
        list: {
            handler(newValue) {
                //滚动按钮的最小高度为10%，以移动2条歌曲滚动1%，最高容纳190，大于190的直接10%
                if(this.list.length > 10 && this.list.length <= 190) {
                    let height = 100 - (this.list.length - this.basicStyle.height / this.basicStyle.spanHeight) / 2;
                    this.scrollButtonStyle.height = height + '%';
                }
                else if(this.list.length > 190) {
                    this.scrollButtonStyle.height = '10%'
                }
                else {
                    this.scrollButtonStyle.height = '100%';
                    this.scrollIsShow = false;
                }
                //滚动条剩下的高度除以列表显示出来剩余的条数，就得到滚动一条需要滚动的百分数
                this.basicScrollDistance = (100 - parseFloat(this.scrollButtonStyle.height)) / (this.list.length - this.basicStyle.height / this.basicStyle.spanHeight);
            }
        },
        //等会处理
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
                else if(newValue >= this.list.length - this.basicStyle.height / spanHeight) {
                    if(this.list.length > this.basicStyle.height / spanHeight) {
                        this.listStyle.top = -(this.list.length - this.basicStyle.height / spanHeight) * spanHeight + 'px';
                        this.scrollButtonStyle.top = 100 - parseFloat(this.scrollButtonStyle.height) + '%'
                    }
                    else {
                        this.listStyle.top = '0%'
                    }
                    //this.listMoveNum = this.list.length - this.basicStyle.height / spanHeight;

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
        toPlayMusic(e) {
            e.preventDefault();
            let index;
            let getDivEle = (ele) => {
                if(ele.className.split(' ')[0] === 'list-div') {
                    return ele
                }
                else {
                    return getDivEle(ele.parentElement);
                }
            }
            let divEle = getDivEle(e.target);
            let arr = Array.from(e.currentTarget.children);
            index = arr.findIndex((ele) => ele === divEle);
            this.$store.commit('setAudioIsPaused', false);
            this.$store.commit('changePlayIndex', index);
        },
        toNowMusic() {
            let newValue = this.$store.state.audioControlState.playIndex.num;
            let spanHeight = this.basicStyle.spanHeight;
            if(this.list.length > this.basicStyle.height / spanHeight && newValue >= 5 && newValue < this.list.length - this.basicStyle.height / spanHeight) {
                this.listMoveNum = newValue - 5;
            }
            else if(this.list.length > this.basicStyle.height / spanHeight && newValue > this.list.length - this.basicStyle.height / spanHeight) {
                this.listMoveNum = this.list.length - this.basicStyle.height / spanHeight;
            }
            else {
                this.listMoveNum = 0;
            }
        }
    },
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
        .list-contain-space {
            width: 492px;
            position: absolute;
            
            .list-div {
                width: 100%;
                color: rgb(180, 180, 180);
                border-radius: 2px;
                cursor: default;
                display: flex;
                align-items: center;
                .music-index {
                    width: 20px;
                    text-align: center;
                    margin-left: 5px;
                }
                svg {
                    margin-left: 5px;
                    margin-right: 5px;
                    width: 15px;
                    fill: #66ccff;
                }
                .music-name {
                    width: 250px;
                    flex-grow: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .music-artist {
                    width: 150px;
                    margin-left: 10px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .music-duration-time {
                    width: 60px;
                    margin-right: 10px;
                }

            }
            .list-div.chose-style {
                background: linear-gradient(90deg,@mikuColor,rgb(255,255,255));
                span:nth-child(3) {
                    font-size: 16px !important;
                    color: rgb(100, 100, 100);
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
            background: linear-gradient(white, @mikuColor, white);
            .list-scroll-button {
                position: absolute;
                width: 8px;
                background-color: #66ccff;
                border-radius: 4px;
            }
        }
    }
</style>
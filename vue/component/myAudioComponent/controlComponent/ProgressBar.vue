<template>
    <div class="progress-bar" ref="progressBar" @click="clickToChangeCurrentTime">
        <div
            class="basic-track progress-track"
        >
        </div>
        <div 
            v-for="trackArr in tracksArr" 
            :key="trackArr" 
            class="progress-track" 
            :style="[tracksStyleObj[trackArr]]"
        >
        </div>
        <div
            class="current-track progress-track"
            :style="[currentTrackProgress]"
        >
        </div>
        <div 
            class="progress-button"
            :style="[progressButtonPosition, progressButtonWidth]"
            @mousedown="beginDrag"
        >
        </div>
    </div>
</template>

<script>
/*组件概述
    1. 父元素对进度条的位置的设置，使用nowProgress[Number](0~100)
    2. 组件内部除了进度条轨道以外的轨道，使用tracksObj[Object]，每个轨道有轨道名，轨道名对应一个对象，包括
        progress[Number](0~100),设置轨道进度
        zIndex[Number]，设置轨道层级
        color[String]，设置轨道颜色
*/
export default {
    props: {
        //额外进度条
        tracksObj: {
            type: Object,
        },
        //用于标识进度条的方向，X,-X,Y,-Y
        progressDirection: {
            type: String,
            default: 'X'
        },
        //标识进度条进度
        nowPrecent: {
            type: Number,
            default: 0
        },
        //改变进度按钮的大小
        buttonWidth: {
            type: Number,
        }
    },
    data() {
        return {
            //用于标识按钮的进度
            progressButtonPosition: {
                left: `${this.nowPrecent}%`,
            },
            //用于标识进度条的进度
            currentTrackProgress: {
                width: `${this.nowPrecent}%`,
            }
        }
    },
    computed: {
        //根据progress来生产styleObj以此来控制轨道样式
        //虽然可以直接在遍历过程中直接在style上生成样式，不过感觉不太好维护
        tracksStyleObj() {
            let trackStyle = {};
            if(this.tracksObj) {
                for (const key in this.tracksObj) {
                    trackStyle[key] = {
                        width: `${this.tracksObj[key].progress}%`,
                        backgroundColor: `${this.tracksObj[key].color}`,
                    }
                }   
            }
            return trackStyle
        },
        //生成需要的轨道数组
        tracksArr() {
            if(this.tracksObj) {
                return Object.keys(this.tracksObj).sort((fist, second) => {
                       return this.tracksObj[fist].zIndex - this.tracksObj[second].zIndex
                    });
            }
            else {
                return []
            }
        },
        progressButtonWidth() {
            if(this.buttonWidth) {
                return {
                    width: `${this.buttonWidth}%`
                }
            }
        }
    },
    watch: {
        //通过计算属性生成的数据无法在方法中更改后触发重渲染，所以在这里监听nowPrecent来更改data中的数据
        //以便于在方法中更改data的数据触发重渲染
        //还未验证，计算属性通过props生成样式，随后在方法里更改props是否会触发重渲染
        nowPrecent(newValue) {
            this.progressButtonPosition.left = `${newValue}%`;
            this.currentTrackProgress.width = `${newValue}%`;
        }
    },
    methods: {
        //触发拖动
        beginDrag(e) {
            e.preventDefault();
            document.addEventListener('mousemove', this.ChangeProgress);
            document.addEventListener('mouseup', this.endDrag);
            document.addEventListener('mouseleave', this.endDrag);
            //发送开始移动
            this.$emit('beginDrag');
        },
        ChangeProgress(e) {
            e.preventDefault();
            let topOrLeftDir, dir, current;
            if(this.progressDirection === 'X') {
                topOrLeftDir = 'left';
                dir = 'clientX';
            }
            else {
                topOrLeftDir = 'top';
                dir = 'clientY';
            }

            let basicTrack = this.$refs.progressBar.firstElementChild;
            if(this.progressDirection.startsWith('-')) {
                current = (basicTrack.getBoundingClientRect()[topOrLeftDir] + basicTrack.offsetWidth - e[dir]) / basicTrack.offsetWidth * 100;
            }
            else {
                current = (e[dir] - basicTrack.getBoundingClientRect()[topOrLeftDir]) / basicTrack.offsetWidth * 100;
            }

            if(current >= 0 && current <= 100) {
                if(current <= 1) {
                    current = 0;
                }
                else if(current >= 99) {
                    current = 100;
                }
                this.progressButtonPosition.left = `${current}%`;
                this.currentTrackProgress.width = `${current}%`;
                this.$emit('returnPrecent', parseFloat(current), true);
            }
        },
        endDrag(e) {
            e.preventDefault();
            this.$emit('returnPrecent', parseFloat(this.progressButtonPosition.left), false);
            document.removeEventListener('mousemove', this.ChangeProgress);
            document.removeEventListener('mouseup', this.endDrag);
            document.removeEventListener('mouseleave', this.endDrag);
        },
        clickToChangeCurrentTime(e) {
            e.preventDefault();
            this.ChangeProgress(e);
            this.$emit('returnPrecent', parseFloat(this.progressButtonPosition.left), false);
        }
    },
    emits: [
        'returnPrecent',
        'beginDrag'
    ],
}
</script>

<style lang="less">
    @mikuColor: hsl(165, 100%, 60%);
    .progress-bar {
        width: 100%;
        height: 100%;
        position: relative;
        &:hover {
            .progress-track {
                height: 70%;
            }
            .progress-button {
                width: 1%;
            }
        } 
        & > .progress-track {
            height: 50%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        & > .basic-track {
            width: 100%;
            background-color: lighten(@mikuColor, 30%);
        }
        & > .current-track {
            background-color: @mikuColor;
        }
        & > .progress-button {
            width: 1%;
            height: 100%;
            position: absolute;
            transform: translateX(-50%);
            background-color: @mikuColor;
        }
    }
</style>
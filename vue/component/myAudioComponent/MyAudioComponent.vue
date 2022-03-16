<template>
    <div class="my-audio-component" ref="myAudioComponent">
        <audio 
            :src="audioSrc" 
            ref="myAudio" 
            @canplay="getAudioDurationTime"
            @timeupdate="timeUpDate"
            @ended="audioEnd"
        >
        </audio>
        <div class="big-show-spac">

        </div>
        <div class="control-space">
            <div class="audio-button-space">
                <div class="play-mode-space little-button">
                    <svg class="random-button" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M753.564731 337.471035c-45.8697 0-160.259984 113.849978-243.789399 194.548928C383.134027 654.383848 263.508509 773.284865 167.764911 773.284865l-58.892295 0c-24.068162 0-43.581588-19.526729-43.581588-43.581588s19.513426-43.581588 43.581588-43.581588l58.892295 0c60.504002 0 183.002964-121.68134 281.432741-216.784348 119.79641-115.744117 223.254713-219.029482 304.368102-219.029482l56.209186 0-59.641355-57.828057c-17.033955-16.993023-17.060561-42.902112-0.057305-59.927881 17.002232-17.030885 44.596707-17.064654 61.631686-0.065492l134.207631 133.874033c8.192589 8.172123 12.794397 19.238157 12.794397 30.803563 0 11.564383-4.601808 22.604834-12.794397 30.776957L811.706943 461.72599c-8.505721 8.486278-19.646456 12.522198-30.78719 12.522198-11.166317 0-22.333658-4.676509-30.844495-13.199627-17.003256-17.025769-16.975627-45.432749 0.057305-62.425771l59.641355-61.151755L753.564731 337.471035zM811.706943 561.66105c-17.034978-16.999163-44.629453-16.972557-61.631686 0.058328-17.003256 17.024745-16.975627 46.257533 0.057305 63.250556l59.641355 61.150732-56.209186 0c-35.793204 0-95.590102-52.946886-154.87637-108.373243-17.576307-16.435321-45.161572-16.3422-61.594847 1.226944-16.444531 17.568121-15.523555 46.393633 2.053776 62.823837 90.322122 84.458577 151.246703 131.484613 214.417441 131.484613l56.209186 0-59.641355 57.824987c-17.033955 16.993023-17.060561 43.736107-0.057305 60.761875 8.511861 8.523117 19.678178 12.369725 30.844495 12.369725 11.140735 0 22.281469-4.453429 30.78719-12.939707L945.914574 757.311055c8.192589-8.173147 12.794397-19.315928 12.794397-30.881334 0-11.564383-4.601808-22.682605-12.794397-30.855752L811.706943 561.66105zM108.871593 337.471035l58.892295 0c45.932122 0 114.40154 58.455343 168.915108 107.942431 8.352225 7.576559 18.832927 12.140505 29.29214 12.140505 11.852956 0 23.673166-4.394077 32.270984-13.857613 16.182564-17.807574 14.859429-46.823422-2.958378-62.998823-85.247546-77.381391-156.561755-130.388652-227.519854-130.388652l-58.892295 0c-24.068162 0-43.581588 19.526729-43.581588 43.581588S84.804455 337.471035 108.871593 337.471035z" p-id="1810"></path>
                    </svg>
                </div>
                <div class="previous-music-space little-button">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3171">
                        <path d="M930.248779 51.421136c-17.382902-8.393157-38.056758-6.107091-53.191456 5.929036l-522.479679 415.249469c-12.010545 9.54847-19.016099 24.054859-19.016099 39.402405 0 15.347546 7.005554 29.853935 19.016099 39.402405l522.479679 415.249469c9.081843 7.219425 20.154016 10.929934 31.323403 10.929934 7.43432 0 14.917758-1.645476 21.86703-5.000897 17.400299-8.399297 28.460192-26.01449 28.460192-45.331441L958.707948 96.752578C958.708971 77.435627 947.649078 59.820434 930.248779 51.421136zM858.042247 822.953078 466.790332 512.002047l391.251915-310.951031L858.042247 822.953078zM178.540326 117.206422 178.540326 916.731928c0 31.274284-25.350364 56.624648-56.624648 56.624648-31.275307 0-56.624648-25.350364-56.624648-56.624648L65.291029 117.206422c0-31.273261 25.350364-56.624648 56.624648-56.624648C153.189961 60.581774 178.540326 85.933161 178.540326 117.206422z" p-id="3172"></path>
                    </svg>
                </div>
                <div class="play-button-space" @click="toPlay">
                    <svg class="play-button play-and-pause-button" viewBox = "0 0 1024 1024">
                        <path d="M795.372929 474.025107 288.297079 75.610048c-14.530948-11.425214-34.32169-13.541411-50.945299-5.458315-16.630772 8.082072-27.183106 24.948205-27.183106 43.434232l0 796.830117c0 18.486026 10.552334 35.353183 27.183106 43.434232 6.701632 3.260254 13.924127 4.858658 21.103644 4.858658 10.622942 0 21.169135-3.502777 29.841655-10.316973l507.074827-398.415059c11.654434-9.160637 18.457374-23.156396 18.457374-37.975916S807.027363 483.185744 795.372929 474.025107zM306.755476 811.054073 306.755476 212.948997l380.612601 299.052027L306.755476 811.054073z" p-id="2440"></path>
                    </svg>
                    <svg class="pause-button play-and-pause-button" :style="[pauseButtonStyle]" viewBox = "0 0 1024 1024">
                        <path d="M359.178429 124.06769l0 775.863596c0 32.459273-26.318412 58.777685-58.777685 58.777685s-58.777685-26.318412-58.777685-58.777685L241.62306 124.06769c0-32.459273 26.318412-58.777685 58.777685-58.777685S359.178429 91.608417 359.178429 124.06769zM723.599256 65.290005c-32.459273 0-58.777685 26.318412-58.777685 58.777685l0 775.863596c0 32.459273 26.318412 58.777685 58.777685 58.777685s58.777685-26.318412 58.777685-58.777685L782.37694 124.06769C782.37694 91.608417 756.058528 65.290005 723.599256 65.290005z" p-id="2926"></path>
                    </svg>
                </div>
                <div class="next-music-space little-button">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M683.816181 471.854675 147.889235 50.679239c-15.374152-12.084223-36.276205-14.32117-53.862745-5.776563C76.451206 53.446259 65.290005 71.276347 65.290005 90.819448l0 842.364173c0 19.543102 11.161201 37.373189 28.735461 45.916772 7.091512 3.447519 14.719236 5.135974 22.310122 5.135974 11.236925 0 22.378683-3.707438 31.552623-10.912537l535.926946-421.188738c12.31549-9.67843 19.506263-24.478508 19.506263-40.140209C703.32142 496.328066 696.130647 481.533105 683.816181 471.854675zM167.395498 828.131007l0-632.259968 402.25041 316.123844L167.395498 828.131007zM958.708971 111.565958l0 810.942533c0 31.720446-25.712615 57.434084-57.434084 57.434084-31.721469 0-57.434084-25.713638-57.434084-57.434084L843.840804 111.565958c0-31.721469 25.712615-57.434084 57.434084-57.434084C932.996356 54.131875 958.708971 79.844489 958.708971 111.565958z" p-id="1618"></path>
                    </svg>
                </div>
                <div class="volume-button-space little-button" @mouseenter="showVolumeBar" @mouseleave="hiddenVolumeBar">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M431.207929 106.919125c-14.536065-5.991458-30.570249-2.454912-41.684378 8.683776L198.703551 308.032562l-94.77862 0c-21.468964 0-38.633902 17.024745-38.633902 38.486546l0 331.002716c0 21.460778 17.164938 38.485523 38.633902 38.485523l94.77862 0 191.521988 192.429661c7.446599 7.467065 17.411555 11.530614 27.557636 11.530614 4.992711 0 8.626471-0.915859 13.424754-2.89391 14.545274-6.005784 22.63144-20.143783 22.63144-35.874045L453.839369 142.839219C453.838346 127.108956 445.753203 112.924909 431.207929 106.919125zM376.128473 787.108708 241.016239 649.917116c-7.299243-7.320733-15.827477-11.618619-26.163893-11.618619l-71.852468 0L142.999878 385.742435l71.852468 0c10.336416 0 18.86465-4.297886 26.163893-11.618619l135.112234-137.191592L376.128473 787.108708zM581.9 676.526147c-7.67889 8.590656-18.318204 12.96529-29.000498 12.96529-9.221012 0-18.47477-3.25923-25.891693-9.886161-16.011672-14.302751-17.388019-38.870286-3.080152-54.870702 97.04729-108.533902 10.117428-213.893508-0.113587-225.548966-14.113439-16.081257-12.632715-40.605813 3.388167-54.78986 16.020882-14.189164 40.431851-12.817933 54.697763 3.1262C632.777761 404.416749 698.252984 546.403554 581.9 676.526147zM699.338712 780.485871c-7.677866 8.591679-18.318204 12.96529-29.000498 12.96529-9.219989 0-18.478863-3.25923-25.891693-9.885138-16.010649-14.302751-17.388019-38.871309-3.079128-54.871725 191.540408-214.210733 7.91118-424.49811 0-433.345616-14.307867-16.000416-12.93152-40.568974 3.079128-54.871725 15.997346-14.302751 40.575114-12.927427 54.892191 3.079128C701.739389 246.240217 936.651606 515.090385 699.338712 780.485871zM821.955354 858.351286c-7.67889 8.590656-18.318204 12.96529-29.000498 12.96529-9.221012 0-18.47477-3.25923-25.891693-9.886161-16.011672-14.302751-17.388019-38.870286-3.080152-54.870702 109.224634-122.153084 142.595672-257.939677 99.177813-403.597081-32.952506-110.559025-98.518804-184.728258-99.177813-185.468109-14.307867-16.000416-12.93152-40.564881 3.080152-54.871725 15.992229-14.306844 40.568974-12.930497 54.892191 3.079128C825.049832 169.162748 1128.098893 515.981684 821.955354 858.351286z" p-id="2200"></path>
                    </svg>
                    <div class="volume-bar-space" v-show="volumeBarIsShow">
                        <ProgressBar 
                            :buttonWidth="5"
                            :progressDirection="'-Y'"
                            :nowPrecent="50"
                            @returnPrecent="changeVolume"
                        >
                        </ProgressBar>
                        <!-- 数字变为1为和3位的时候位置会发生改变 -->
                        <!-- <div class="volume-number">{{volumeNumber}}</div>  -->
                    </div>
                    
                </div>
            </div>
            <div class="audio-progress-space">
                <div class="now-time my-audio-time">
                    {{nowTime}}
                </div>
                <div class="progress-bar-space">
                    <ProgressBar 
                        :nowPrecent="nowPrecent"
                        @returnPrecent="changeCurrentTime"
                        @beginDrag="stopSetPrecent"
                        >
                    </ProgressBar>
                </div>
                <div class="duration-time my-audio-time">
                    {{durationTime}}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import ProgressBar from './ProgressBar.vue'

export default {
    components: {
        ProgressBar,
    },
    props: {
        audioSrc: {
            type: String,
        }
    },
    data() {
        return {
            //歌曲持续时间
            durationTime: '00:00',
            //每秒改变一次，用于确定歌曲现在的时间
            nowPlaySecond: 0,
            //用于接收setInterval
            nowPlayTimeInterval: null,
            pauseButtonStyle: {
                opacity: 0,
                zIndex: -1,
            },
            //用于确定进度条百分比
            nowPrecent: 0,
            //用于在拖动进度条的时候，不会改变nowPrecent
            canSetPrecent: true,
            //音量条是否出现
            volumeBarIsShow: false,
            //音量数字
            // volumeNumber: 12,
        }
    },
    mounted () {
        this.$refs.myAudio.volume = 0.5;
        this.$store.commit('getMyAudioEle', this.$refs.myAudio);
    },
    computed: {
        // componentWidth() {
        //     return {
        //         //不设置高度，由内部元素自动撑开，组件的宽度以后进行自适应
        //         //width宽度的设置以后改成100%，自动占满父元素
        //         width: `${this.width}px`,
        //     }
        // },
        nowTime() {
            const audioSecond = parseInt(this.nowPlaySecond % 60).toString().length < 2 ? `0${parseInt(this.nowPlaySecond % 60)}` : parseInt(this.nowPlaySecond % 60);
            const audioMinute = parseInt(this.nowPlaySecond / 60).toString().length < 2 ? `0${parseInt(this.nowPlaySecond / 60)}` : parseInt(this.nowPlaySecond / 60);
            return `${audioMinute}:${audioSecond}`
        }
    },
    methods: {
        toPlay: function() {
            const audio = this.$refs.myAudio;
            if(audio.paused) {
                audio.play();
                this.pauseButtonStyle.opacity = 1;
                this.pauseButtonStyle.zIndex = 1;
                this.nowPlayTimeInterval = setInterval(() => {
                    this.nowPlaySecond++
                }, 1000)
            }
            else {
                audio.pause();
                this.pauseButtonStyle.opacity = 1;
                this.pauseButtonStyle.zIndex = -1;
                clearInterval(this.nowPlayTimeInterval);
            }
            
        },
        // toPlay(e) {
        //     const audio = this.$refs.myAudio;
        //     if(audio.paused) {
        //         audio.play();
        //     }
        //     else {
        //         audio.pause();
        //     }
        // },
        //audio触发canplay时候获取歌的秒数
        getAudioDurationTime(e) {
            const audioSecond = parseInt(e.target.duration % 60).toString().length < 2 ? `0${parseInt(e.target.duration % 60)}` : parseInt(e.target.duration % 60);
            const audioMinute = parseInt(e.target.duration / 60).toString().length < 2 ? `0${parseInt(e.target.duration / 60)}` : parseInt(e.target.duration / 60);
            this.durationTime = `${audioMinute}:${audioSecond}`;
        },
        changeCurrentTime(value, inDrag) {
            let audio = this.$refs.myAudio;
            if(!inDrag) {
                this.canSetPrecent = true;
                audio.currentTime = audio.duration * value / 100;
            }
            this.nowPlaySecond = parseInt(audio.duration * value / 100);
        },
        stopSetPrecent(e) {
            this.canSetPrecent = false;
        },
        timeUpDate(e) {
            if(this.canSetPrecent) {
                let nowPrecent = e.target.currentTime / e.target.duration * 100;
                this.nowPrecent = nowPrecent;
                // let audio = this.$refs.myAudio;
                // const audioSecond = parseInt(audio.currentTime % 60).toString().length < 2 ? `0${parseInt(audio.currentTime % 60)}` : parseInt(audio.currentTime % 60);
                // const audioMinute = parseInt(audio.currentTime / 60).toString().length < 2 ? `0${parseInt(audio.currentTime / 60)}` : parseInt(audio.currentTime / 60);
                // this.nowTime = `${audioMinute}:${audioSecond}`;
            }
        },
        audioEnd(e) {
            this.nowPlaySecond = 0;
            this.nowPrecent = 0;
            //暂时设置停止播放
            this.pauseButtonStyle.zIndex = -1;
            this.pauseButtonStyle.opacity = 0;
            clearInterval(this.nowPlayTimeInterval);
        },
        changeVolume(value) {
            const audio = this.$refs.myAudio;
            audio.volume = parseInt(value) / 100;
            // if(parseInt(value).toString().length != 2) {
            //     this.volumeNumber = parseInt(value).toString().length > 2 ? 'Max' : 'm';
            // }
            // else {
            //     this.volumeNumber = parseInt(value);
            // }
            
        },
        showVolumeBar(e) {
            this.volumeBarIsShow = true;
        },
        hiddenVolumeBar() {
            this.volumeBarIsShow = false;
        }
    },
}
</script>

<style lang="less">
    @myborder: 1px red solid;
    @mikuColor: rgb(51, 255, 204);
    .control-space {
        width: 300px;
        box-shadow: 1px 1px 2px fade(@mikuColor, 30%), -1px -1px 2px fade(@mikuColor, 30%), -1px 1px 2px fade(@mikuColor, 30%), 1px -1px 2px fade(@mikuColor, 30%);
    }
    .audio-button-space {
        width: 300px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
            fill: fadeout(@mikuColor, 50%);
            width: 100%;
            transition: transform 0.15s ease-in-out;
        }
        svg:hover {
            fill: @mikuColor;
            transform: scale(1.2);
        }
        & > .play-button-space {
            width: 9%;
            height: 27px;
            font-size: 0;
            position: relative;
            & > .play-and-pause-button {
                position: absolute;
                background: white;
                transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
            }
        }
        & > .little-button {
            width: 7%;
            height: 21px;
        }
        & > .next-music-space {
            margin-left: 18px;
        }
        & > .previous-music-space {
            margin-right: 18px;
        }
        & > .play-mode-space {
            margin-right: 30px;
        }
        & > .volume-button-space {
            margin-left: 30px;
            position: relative;
            > .volume-bar-space {
                width: 100px;
                height: 8px;
                padding: 5px 5px 5px 5px;
                display: flex;
                align-items: center;
                position: absolute;
                top: -5px;
                left: 0;
                transform-origin: left top;
                transform: rotate(-90deg);
                border-radius: 4px;
                box-shadow: -1px 0px 2px 1px rgba(57, 197, 187, 0.502);
                background: fadeout(@mikuColor, 50);
                // > .volume-number {
                //     font-size: 10px;
                //     line-height: 10px;
                //     position: absolute;
                //     left: 108px;
                //     transform: rotate(90deg);
                // }
            }
            &::after {
                content: '';
                display: block;
                position: absolute;
                width: 18px;
                height: 10px;
                left: 0;
                top: -5px;
            }

        }
        & > .volume-button-space:hover {
            svg {
                fill: @mikuColor;
                transform: scale(1.2);
            }
        }
    }
    .audio-progress-space {
        width: 300px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        & > .progress-bar-space {
            flex-grow: 1;
            height: 8px;
            display: flex;
            align-items: center;
        }
        & > .my-audio-time {
            font-size: 10px;
            margin: 0 4px;
        }
    }

</style>
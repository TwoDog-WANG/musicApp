<template>
    <audio 
        src=""
        ref="myAudio" 
        @canplay="getAudioDurationTime"
        @timeupdate="timeUpDate"
        @ended="audioEnd"
    >
    </audio>
    <div class="control-space click">
        <div class="audio-button-space">
            <div class="size-space" v-if="isMinsize">
                <div class="more-btn" @click="showOrHiddenSizeBtn">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M513.4 463.2c-27.5 0-50 22.5-50 50s22.5 50 50 50 50-22.5 50-50-22.5-50-50-50z m-244 0c-27.5 0-50 22.5-50 50s22.5 50 50 50 50-22.5 50-50-22.5-50-50-50z m483.9 0c-27.5 0-50 22.5-50 50s22.5 50 50 50 50-22.5 50-50-22.5-50-50-50z" p-id="2034"></path>
                    </svg>
                </div>
                <div class="size-btn">
                    <transition name="hidden">
                        <ChangeWindowSizeBtn v-show="showSizeBtn" @closeSizeBtn="closeSizeBtn"></ChangeWindowSizeBtn>
                    </transition>
                </div>
            </div>
            <div 
                class="play-mode-space little-button" 
                :title="playModeStateObj.title[playMode]"
                @click="changePlayMode"
            >
                <svg :class="['random-button', {'show-button': playModeStateObj.styleArr[0]}, {'hidden-button': !playModeStateObj.styleArr[0]}]" viewBox="0 0 1024 1024"  version="1.1" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M753.564731 337.471035c-45.8697 0-160.259984 113.849978-243.789399 194.548928C383.134027 654.383848 263.508509 773.284865 167.764911 773.284865l-58.892295 0c-24.068162 0-43.581588-19.526729-43.581588-43.581588s19.513426-43.581588 43.581588-43.581588l58.892295 0c60.504002 0 183.002964-121.68134 281.432741-216.784348 119.79641-115.744117 223.254713-219.029482 304.368102-219.029482l56.209186 0-59.641355-57.828057c-17.033955-16.993023-17.060561-42.902112-0.057305-59.927881 17.002232-17.030885 44.596707-17.064654 61.631686-0.065492l134.207631 133.874033c8.192589 8.172123 12.794397 19.238157 12.794397 30.803563 0 11.564383-4.601808 22.604834-12.794397 30.776957L811.706943 461.72599c-8.505721 8.486278-19.646456 12.522198-30.78719 12.522198-11.166317 0-22.333658-4.676509-30.844495-13.199627-17.003256-17.025769-16.975627-45.432749 0.057305-62.425771l59.641355-61.151755L753.564731 337.471035zM811.706943 561.66105c-17.034978-16.999163-44.629453-16.972557-61.631686 0.058328-17.003256 17.024745-16.975627 46.257533 0.057305 63.250556l59.641355 61.150732-56.209186 0c-35.793204 0-95.590102-52.946886-154.87637-108.373243-17.576307-16.435321-45.161572-16.3422-61.594847 1.226944-16.444531 17.568121-15.523555 46.393633 2.053776 62.823837 90.322122 84.458577 151.246703 131.484613 214.417441 131.484613l56.209186 0-59.641355 57.824987c-17.033955 16.993023-17.060561 43.736107-0.057305 60.761875 8.511861 8.523117 19.678178 12.369725 30.844495 12.369725 11.140735 0 22.281469-4.453429 30.78719-12.939707L945.914574 757.311055c8.192589-8.173147 12.794397-19.315928 12.794397-30.881334 0-11.564383-4.601808-22.682605-12.794397-30.855752L811.706943 561.66105zM108.871593 337.471035l58.892295 0c45.932122 0 114.40154 58.455343 168.915108 107.942431 8.352225 7.576559 18.832927 12.140505 29.29214 12.140505 11.852956 0 23.673166-4.394077 32.270984-13.857613 16.182564-17.807574 14.859429-46.823422-2.958378-62.998823-85.247546-77.381391-156.561755-130.388652-227.519854-130.388652l-58.892295 0c-24.068162 0-43.581588 19.526729-43.581588 43.581588S84.804455 337.471035 108.871593 337.471035z" p-id="1810"></path>
                </svg>
                <svg :class="['one-music-button', {'show-button': playModeStateObj.styleArr[1]}, {'hidden-button': !playModeStateObj.styleArr[1]}]" viewBox="0 0 1024 1024"  version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path transform="rotate(90 526.336 519.587)" d="m773.59787,203.776l-0.27307,0.44373a33.62133,33.62133 0 0 0 -20.34347,-6.48533c-18.97813,0.78507 -33.72373,16.72533 -32.9728,35.77173a33.82613,33.82613 0 0 0 15.63307,26.79467l-0.1024,0.17067a375.22773,375.22773 0 0 1 166.2976,311.87626c0,207.01867 -168.448,375.46667 -375.46667,375.46667c-27.81866,0 -27.81866,0 -54.34026,-2.90133c-90.45334,-9.89867 -152.61014,-58.9824 -155.5456,-61.20107a375.33013,375.33013 0 0 1 -165.5808,-311.36427c0,-201.4208 159.5392,-365.84106 358.84373,-374.64746l-41.984,40.82346l0.8192,0.85334a33.86027,33.86027 0 0 0 -15.2576,29.21813c0.75093,18.97813 16.72533,33.75787 35.66933,33.04107a33.792,33.792 0 0 0 26.0096,-14.47254l0.3072,0.34134l128.64854,-124.99627l-128.27307,-128.4096l-0.4096,0.4096a33.6896,33.6896 0 0 0 -26.3168,-11.40053c-18.944,0.75093 -33.6896,16.72533 -32.9728,35.70346a33.8944,33.8944 0 0 0 13.03893,25.15627l45.22667,45.2608c-239.06987,6.48533 -431.65013,202.51307 -431.65013,443.11893c0,147.62667 73.1136,285.14987 193.19466,366.11414c3.072,2.56 77.55094,62.19093 188.75734,74.30826c29.42293,3.20854 31.1296,3.31094 61.78133,3.31094c244.66773,0 443.73333,-199.0656 443.73333,-443.73334a443.392,443.392 0 0 0 -196.47146,-368.57173" p-id="2558" id="svg_1"/>
                    <path d="m498.47532,320.94733a33.28,33.28 0 0 0 -17.13494,6.07574l-0.17066,-0.3072l-106.8032,69.70026l0.17066,0.27307a33.9968,33.9968 0 0 0 -15.83786,29.696c0.75093,18.944 16.72533,33.72373 35.66933,32.9728a33.10933,33.10933 0 0 0 17.1008,-6.0416l0.2048,0.27307l53.99893,-35.25974l0,249.856l0.03414,0c0,0.47787 -0.23894,0.88747 -0.2048,1.36534a34.2016,34.2016 0 1 0 68.4032,-1.36534l0.03413,0l0,-0.17066c0,-0.4096 0.2048,-0.75094 0.2048,-1.16054c0,-0.27306 -0.17067,-0.47786 -0.2048,-0.78506l0,-310.74987c0,-0.47787 0.2048,-0.88747 0.2048,-1.3312a34.4064,34.4064 0 0 0 -35.66933,-33.04107" p-id="2559" data-spm-anchor-id="a313x.7781069.0.i3" />
                </svg>
                <svg :class="['circle-music-button', {'show-button': playModeStateObj.styleArr[2]}, {'hidden-button': !playModeStateObj.styleArr[2]}]" viewBox="0 0 1024 1024"  version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path transform="rotate(90 526.336 519.587)" d="m773.59787,203.776l-0.27307,0.44373a33.62133,33.62133 0 0 0 -20.34347,-6.48533c-18.97813,0.78507 -33.72373,16.72533 -32.9728,35.77173a33.82613,33.82613 0 0 0 15.63307,26.79467l-0.1024,0.17067a375.22773,375.22773 0 0 1 166.2976,311.87626c0,207.01867 -168.448,375.46667 -375.46667,375.46667c-27.81866,0 -27.81866,0 -54.34026,-2.90133c-90.45334,-9.89867 -152.61014,-58.9824 -155.5456,-61.20107a375.33013,375.33013 0 0 1 -165.5808,-311.36427c0,-201.4208 159.5392,-365.84106 358.84373,-374.64746l-41.984,40.82346l0.8192,0.85334a33.86027,33.86027 0 0 0 -15.2576,29.21813c0.75093,18.97813 16.72533,33.75787 35.66933,33.04107a33.792,33.792 0 0 0 26.0096,-14.47254l0.3072,0.34134l128.64854,-124.99627l-128.27307,-128.4096l-0.4096,0.4096a33.6896,33.6896 0 0 0 -26.3168,-11.40053c-18.944,0.75093 -33.6896,16.72533 -32.9728,35.70346a33.8944,33.8944 0 0 0 13.03893,25.15627l45.22667,45.2608c-239.06987,6.48533 -431.65013,202.51307 -431.65013,443.11893c0,147.62667 73.1136,285.14987 193.19466,366.11414c3.072,2.56 77.55094,62.19093 188.75734,74.30826c29.42293,3.20854 31.1296,3.31094 61.78133,3.31094c244.66773,0 443.73333,-199.0656 443.73333,-443.73334a443.392,443.392 0 0 0 -196.47146,-368.57173" p-id="2558" id="svg_1"/>   
                </svg>
            </div>
            <div class="previous-music-space little-button" @click="changePlayIndex">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3171">
                    <path d="M930.248779 51.421136c-17.382902-8.393157-38.056758-6.107091-53.191456 5.929036l-522.479679 415.249469c-12.010545 9.54847-19.016099 24.054859-19.016099 39.402405 0 15.347546 7.005554 29.853935 19.016099 39.402405l522.479679 415.249469c9.081843 7.219425 20.154016 10.929934 31.323403 10.929934 7.43432 0 14.917758-1.645476 21.86703-5.000897 17.400299-8.399297 28.460192-26.01449 28.460192-45.331441L958.707948 96.752578C958.708971 77.435627 947.649078 59.820434 930.248779 51.421136zM858.042247 822.953078 466.790332 512.002047l391.251915-310.951031L858.042247 822.953078zM178.540326 117.206422 178.540326 916.731928c0 31.274284-25.350364 56.624648-56.624648 56.624648-31.275307 0-56.624648-25.350364-56.624648-56.624648L65.291029 117.206422c0-31.273261 25.350364-56.624648 56.624648-56.624648C153.189961 60.581774 178.540326 85.933161 178.540326 117.206422z" p-id="3172"></path>
                </svg>
            </div>
            <div class="play-button-space" @click="toPlay">
                <svg :class="[{'show-button': playButtonISShow}, {'hidden-button': !playButtonISShow}]" viewBox = "0 0 1024 1024">
                    <path d="M795.372929 474.025107 288.297079 75.610048c-14.530948-11.425214-34.32169-13.541411-50.945299-5.458315-16.630772 8.082072-27.183106 24.948205-27.183106 43.434232l0 796.830117c0 18.486026 10.552334 35.353183 27.183106 43.434232 6.701632 3.260254 13.924127 4.858658 21.103644 4.858658 10.622942 0 21.169135-3.502777 29.841655-10.316973l507.074827-398.415059c11.654434-9.160637 18.457374-23.156396 18.457374-37.975916S807.027363 483.185744 795.372929 474.025107zM306.755476 811.054073 306.755476 212.948997l380.612601 299.052027L306.755476 811.054073z" p-id="2440"></path>
                </svg>
                <svg :class="[{'show-button': !playButtonISShow}, {'hidden-button': playButtonISShow}]" viewBox = "0 0 1024 1024">
                    <path d="M359.178429 124.06769l0 775.863596c0 32.459273-26.318412 58.777685-58.777685 58.777685s-58.777685-26.318412-58.777685-58.777685L241.62306 124.06769c0-32.459273 26.318412-58.777685 58.777685-58.777685S359.178429 91.608417 359.178429 124.06769zM723.599256 65.290005c-32.459273 0-58.777685 26.318412-58.777685 58.777685l0 775.863596c0 32.459273 26.318412 58.777685 58.777685 58.777685s58.777685-26.318412 58.777685-58.777685L782.37694 124.06769C782.37694 91.608417 756.058528 65.290005 723.599256 65.290005z" p-id="2926"></path>
                </svg>
            </div>
            <div class="next-music-space little-button" @click="changePlayIndex">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M683.816181 471.854675 147.889235 50.679239c-15.374152-12.084223-36.276205-14.32117-53.862745-5.776563C76.451206 53.446259 65.290005 71.276347 65.290005 90.819448l0 842.364173c0 19.543102 11.161201 37.373189 28.735461 45.916772 7.091512 3.447519 14.719236 5.135974 22.310122 5.135974 11.236925 0 22.378683-3.707438 31.552623-10.912537l535.926946-421.188738c12.31549-9.67843 19.506263-24.478508 19.506263-40.140209C703.32142 496.328066 696.130647 481.533105 683.816181 471.854675zM167.395498 828.131007l0-632.259968 402.25041 316.123844L167.395498 828.131007zM958.708971 111.565958l0 810.942533c0 31.720446-25.712615 57.434084-57.434084 57.434084-31.721469 0-57.434084-25.713638-57.434084-57.434084L843.840804 111.565958c0-31.721469 25.712615-57.434084 57.434084-57.434084C932.996356 54.131875 958.708971 79.844489 958.708971 111.565958z" p-id="1618"></path>
                </svg>
            </div>
            <div class="volume-button-space little-button" @mouseenter="changeVolumeShow" @mouseleave="changeVolumeShow">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M431.207929 106.919125c-14.536065-5.991458-30.570249-2.454912-41.684378 8.683776L198.703551 308.032562l-94.77862 0c-21.468964 0-38.633902 17.024745-38.633902 38.486546l0 331.002716c0 21.460778 17.164938 38.485523 38.633902 38.485523l94.77862 0 191.521988 192.429661c7.446599 7.467065 17.411555 11.530614 27.557636 11.530614 4.992711 0 8.626471-0.915859 13.424754-2.89391 14.545274-6.005784 22.63144-20.143783 22.63144-35.874045L453.839369 142.839219C453.838346 127.108956 445.753203 112.924909 431.207929 106.919125zM376.128473 787.108708 241.016239 649.917116c-7.299243-7.320733-15.827477-11.618619-26.163893-11.618619l-71.852468 0L142.999878 385.742435l71.852468 0c10.336416 0 18.86465-4.297886 26.163893-11.618619l135.112234-137.191592L376.128473 787.108708zM581.9 676.526147c-7.67889 8.590656-18.318204 12.96529-29.000498 12.96529-9.221012 0-18.47477-3.25923-25.891693-9.886161-16.011672-14.302751-17.388019-38.870286-3.080152-54.870702 97.04729-108.533902 10.117428-213.893508-0.113587-225.548966-14.113439-16.081257-12.632715-40.605813 3.388167-54.78986 16.020882-14.189164 40.431851-12.817933 54.697763 3.1262C632.777761 404.416749 698.252984 546.403554 581.9 676.526147zM699.338712 780.485871c-7.677866 8.591679-18.318204 12.96529-29.000498 12.96529-9.219989 0-18.478863-3.25923-25.891693-9.885138-16.010649-14.302751-17.388019-38.871309-3.079128-54.871725 191.540408-214.210733 7.91118-424.49811 0-433.345616-14.307867-16.000416-12.93152-40.568974 3.079128-54.871725 15.997346-14.302751 40.575114-12.927427 54.892191 3.079128C701.739389 246.240217 936.651606 515.090385 699.338712 780.485871zM821.955354 858.351286c-7.67889 8.590656-18.318204 12.96529-29.000498 12.96529-9.221012 0-18.47477-3.25923-25.891693-9.886161-16.011672-14.302751-17.388019-38.870286-3.080152-54.870702 109.224634-122.153084 142.595672-257.939677 99.177813-403.597081-32.952506-110.559025-98.518804-184.728258-99.177813-185.468109-14.307867-16.000416-12.93152-40.564881 3.080152-54.871725 15.992229-14.306844 40.568974-12.930497 54.892191 3.079128C825.049832 169.162748 1128.098893 515.981684 821.955354 858.351286z" p-id="2200"></path>
                </svg>
                <div class="volume-bar-space" v-show="volumeBarIsShow">
                    <ProgressBar 
                        :buttonWidth="5"
                        :nowPrecent= "nowVolume"
                        @returnPrecent="changeVolume"
                    >
                    </ProgressBar>
                    <!-- 数字变为1为和3位的时候位置会发生改变 -->
                    <!-- <div class="volume-number">{{volumeNumber}}</div>  -->
                </div>
                
            </div>
        </div>
        <div class="audio-progress-space" v-if="!isMinsize">
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
        <div class="audio-name-space" v-show="isMinsize">
            <span>{{audioName.slice(0, -5)}}</span>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, reactive, ref, watch, getCurrentInstance } from 'vue';
    import { useStore } from 'vuex';

    import ProgressBar from './ProgressBar.vue';
    import ChangeWindowSizeBtn from '../ChangeWindowSizeButton.vue';

    const store = useStore();

    const myAudio = ref(null);

    onMounted(() => {
        // 挂载的时候改变音量，抓取audio元素
        myAudio.value.volume = 0.5;
        store.commit('setMyAudioEle', myAudio.value);
    })

    // 音量条是否出现
    let volumeBarIsShow = ref(true);
    // 音量条改变触发
    function changeVolume(value) {
        myAudio.value.volume = parseInt(value) / 100;
    }
    function changeVolumeShow() {
        // volumeBarIsShow.value = !volumeBarIsShow.value;
    }

    // 记录播放时间
    let nowPlaySecond = ref(0);
    // 显示展示时间
    const nowTime = computed(() => {
        let audioSecond = parseInt(nowPlaySecond.value % 60).toString().length < 2 ? `0${parseInt(nowPlaySecond.value % 60)}` : parseInt(nowPlaySecond.value % 60);
        let audioMinute = parseInt(nowPlaySecond.value / 60).toString().length < 2 ? `0${parseInt(nowPlaySecond.value / 60)}` : parseInt(nowPlaySecond.value / 60);
        return `${audioMinute}:${audioSecond}`
    })
    // 总时长
    const durationTime = ref('');
    // audio的canplay事件触发
    function getAudioDurationTime(e) {
        const audioSecond = parseInt(myAudio.value.duration % 60).toString().length < 2 ? `0${parseInt(myAudio.value.duration % 60)}` : parseInt(myAudio.value.duration % 60);
        const audioMinute = parseInt(myAudio.value.duration / 60).toString().length < 2 ? `0${parseInt(myAudio.value.duration / 60)}` : parseInt(myAudio.value.duration / 60);
        durationTime.value = audioMinute + ':' + audioSecond;
    }

    // 控制播放按钮显示
    let playButtonISShow = ref(true);
    // 用于控制播放时间，1s一跳
    let nowPlayTimeInterval = null;
    // 点击播放按钮后，如果暂停，播放，开始计时，如果播放，暂停，停止计时
    function toPlay() {
        if(myAudio.value.paused) {
            myAudio.value.play();
            playButtonISShow.value = false;
            nowPlayTimeInterval = setInterval(() => {
                nowPlaySecond.value++
            }, 1000)
        }
        else {
            myAudio.value.pause();
            playButtonISShow.value = true;
            clearInterval(nowPlayTimeInterval);
        }
    }
    function audioEnd(e) {
        e.preventDefault();
    }


    // 用于防止currentTime事件与进度条事件共同改变进度条
    let canSetPrecent = true;
    // 进度条开始拖动后触发，此时currentTime事件无法改变进度条
    function stopSetPrecent(e) {
        canSetPrecent = false;
    }
    // 给与进度条百分比进度
    let nowPrecent = ref(0);
    // currentTime事件触发
    function timeUpDate(e) {
        // 播放到结尾后，手动下一首
        if(e.target.currentTime === e.target.duration) {
            changePlayIndex(null, true);
            return
        }
        // 是否可以设置进度条百分比
        if(canSetPrecent) {
            // 给出进度条的百分比
            nowPrecent.value = e.target.currentTime / e.target.duration * 100;
        }
    }
    // 进度条组件的拖动、拖动后释放、点击触发该事件，value是组件进度的百分比，inDrag是是否在拖动状态
    function changeCurrentTime(value, inDrag) {
        // 点击及拖动后释放，且到达最后时，下一首
        if(!inDrag && value === 100) {
            // 改变playIndex的值
            changePlayIndex();
            canSetPrecent = true;
        }
        // 没有到最后
        else if(!inDrag) {
            canSetPrecent = true;
            // 设置audio的currentTime及显示时间，不过currentTime是小数，nowPlaySecond是整数，有误差，最大值为1s
            myAudio.value.currentTime = myAudio.value.duration * value / 100;
            nowPlaySecond.value = parseInt(myAudio.value.duration * value / 100);
        }
        else {
            // 拖动转态下改变显示的时间
            nowPlaySecond.value = parseInt(myAudio.value.duration * value / 100);
        }
    }

    // 用于标识播放模式，顺序、单曲、随机
    const playMode = ref(0);
    // 标识模式按钮展示的样式
    const playModeStateObj = reactive({
            styleArr: [true, false, false],
            title: ['随机', '单曲', '循环']
    })
    watch(playMode, (newValue, oldValue) => {
        if(oldValue) {
            playModeStateObj.styleArr[newValue] = true;
            playModeStateObj.styleArr[oldValue] = false;
        }
        else {
            playModeStateObj.styleArr.map((value, index, arr) => {
                arr[index] = false;
            })
            playModeStateObj.styleArr[newValue] = true;
        }
        },
        {immediate: true}
    )
    // 播放模式按钮点击触发
    function changePlayMode() {
        if(playMode.value < playModeStateObj.styleArr.length - 1) {
            playMode.value++;
        }
        else{
            playMode.value = 0;
        }
    }

    let audioSrc = '';
    // 用于触发监听，平时直接从store内取值即可
    const playIndex = computed(() => {
        return store.state.audioControlState.playIndex
    })
    // 父组件在create时会异步的改变playIndex的值，触发该事件
    watch(playIndex, () => {
        let isSortList = store.state.audioControlState.isSortList;
        // list组件的重新排序会改变playIndex的值，非重排才改变播放状态
        if(!isSortList) {
            // 改变audioSrc
            setAudioSrc();
        }
        else {
            store.commit('changeIsSortList', false);
        }
    })
    // 点击上一首和下一首按钮会传入e，播放到最后会传入isAudioEnd = true，进度条拉到最后无传入
    function changePlayIndex(e, isAudioEnd = false) {
        if(isAudioEnd) {
            //播放到结束位置时，paused为真，所以需要手动置假
            store.commit('setAudioIsPaused', false);
        }
        else {
            //暂停为真，播放为假
            store.commit('setAudioIsPaused', myAudio.value.paused);
        }
        // 单曲
        if(playMode.value === 1) {
            // 直接用src给src赋值，重置状态
            myAudio.value.setAttribute('src', audioSrc);
            resetAudioPlayState();
        }
        // 循环
        else if(playMode.value === 2) {
            const audioList = store.state.playList;
            let playIndex = store.state.audioControlState.playIndex.num;
            let nowPlayIndex;
            // 对应上一首按钮
            if(e && ( (e.currentTarget && e.currentTarget.className.split(' ')[0] === 'previous-music-space') || e === 'preMusic') ) {
                nowPlayIndex = playIndex > 0 ? playIndex - 1 : audioList.length - 1;
            }
            // 对应下一首、播放到最后、拖到最后
            else {
                nowPlayIndex = playIndex < audioList.length - 1 ? playIndex + 1 : 0;
            }
            // 触发监听，从而改变src及重置播放状态
            store.commit('changePlayIndex', nowPlayIndex);
        }
        // 随机
        // 另一套方案是通过生成一个无重复的随机播放列表，取代原播放列表
        else if(playMode.value === 0) {
            let index = createRandomIndex(e);
            store.commit('changePlayIndex', index);
        }
    }
    const createRandomIndex = function() {
        let randomIndex = {
            indexArr: [],
            pointer: 0,
        }
        return (e) => {
            const audioListLength = store.state.playList.length;
            if(e && ( (e.currentTarget && e.currentTarget.className.split(' ')[0] === 'previous-music-space') || e === 'preMusic') ) {
                // 上一首，如果此时指到indexArr的第一个，则随机生成一个index插入到indexArr的最前面
                if(randomIndex.pointer === 0) {
                    randomIndex.indexArr.unshift( parseInt(Math.random() * audioListLength) );
                }
                // 否则指向当前pointer的上一个index
                else {
                    randomIndex.pointer--;
                }
            }
            else {
                if(randomIndex.pointer >= randomIndex.indexArr.length - 1) {
                    randomIndex.indexArr.push( parseInt(Math.random() * audioListLength) );
                    randomIndex.pointer = randomIndex.indexArr.length - 1;
                }
                else {
                    randomIndex.pointer++;
                }
            }
            return randomIndex.indexArr[randomIndex.pointer]
        }
    }();
    let audioName = ref('');
    function setAudioSrc() {
        let playIndex = store.state.audioControlState.playIndex.num;
        let audioList = store.state.playList;
        audioName.value = audioList[playIndex].musicName.join("");
        if(window.getAudio) {
            window.getAudio(audioName.value)
            .then((res) => {
                if(audioSrc) {
                    URL.revokeObjectURL(audioSrc);
                }
                audioSrc = res;
                myAudio.value.setAttribute('src', res);
                resetAudioPlayState();
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else {
            //axios get src
        }
    }
    // 重置播放状态
    function resetAudioPlayState() {
        // 获得重置前的播放状态
        const audioIsPaused = store.state.audioControlState.audioIsPaused;
        nowPlaySecond.value = 0;
        nowPrecent.value = 0;
        clearInterval(nowPlayTimeInterval);
        if(audioIsPaused) {
            playButtonISShow.value = true;
        }
        else {
            nowPlayTimeInterval = setInterval(() => {
                nowPlaySecond.value++
            }, 1000);
            playButtonISShow.value = false;
            myAudio.value.play();
        }
    }

    // 控制播放快捷键
    const nowVolume = ref(50);
    function addOrSubVolume(arg) {
        if(arg === '+') {
            myAudio.value.volume = myAudio.value.volume + 0.1 < 1 ? myAudio.value.volume + 0.1 : 1;
            nowVolume.value = myAudio.value.volume * 100;
        }
        else if(arg === '-') {
            myAudio.value.volume = myAudio.value.volume - 0.1 > 0 ? myAudio.value.volume - 0.1 : 0;
            nowVolume.value = myAudio.value.volume * 100;
        }
    }
    onMounted(() => {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    addOrSubVolume('+');
                    break;
                case 'ArrowDown':
                    addOrSubVolume('-');
                    break;
                case 'ArrowLeft':
                    changePlayIndex('preMusic');
                    break;
                case 'ArrowRight':
                    changePlayIndex();
                    break;
                case ' ':
                    toPlay();
                    break;
                case 'c':
                    if(e.altKey) {
                        changePlayMode()
                    }
                default:
                    break;
            }
        })
    })

    // 全局快捷键
    onMounted(() => {
        if(window.changeMusic) {
            const componentData = {
                addOrSubVolume,
                changePlayIndex,
                changePlayMode,
                toPlay,
            }
            window.changeMusic(componentData);
        }
    })

    let isMinsize = computed(() => {
        return store.state.isMinsize
    })

    // 窗口大小控制
    let showSizeBtn = ref(false);
    function showOrHiddenSizeBtn() {
        showSizeBtn.value = !showSizeBtn.value;
    }
    function closeSizeBtn() {
        showSizeBtn.value = false;
    }
</script>

<style lang="less">
    @myborder: 1px red solid;
    @mikuColor: rgb(51, 255, 204);

    .show-button {
        opacity: 1;
        z-index: 1;
    }
    .hidden-button {
        opacity: 0;
        z-index: 0;
    }

    .control-space {
        width: 500px;
        box-shadow: 5px 5px 10px rgb(230, 230, 230);
        // box-shadow: 1px 1px 2px fade(@mikuColor, 30%), -1px -1px 2px fade(@mikuColor, 30%), -1px 1px 2px fade(@mikuColor, 30%), 1px -1px 2px fade(@mikuColor, 30%);
    }
    .audio-button-space {
        width: 500px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .size-space {
            height: 40px;
            position: absolute;
            left: 10px;
            display: flex;
            align-items: center;
            & > .more-btn:hover {
                background-color: #66ccff74;
            }
            .more-btn {
                width: 30px;
                height: 30px;
                svg {
                    width: 100%;
                    fill: @mikuColor;
                }
            }
            .size-btn {
                // border-left: 1px solid;
                // border-image: linear-gradient(white, @mikuColor, white) 1;
                height: 30px;
                overflow: hidden;
                position: relative;
                .hidden-enter-active,
                .hidden-leave-active {
                    transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
                }
                .hidden-leave-from,
                .hidden-enter-to {
                    opacity: 1;
                    transform: translateX(0%);
                }
                .hidden-leave-to,
                .hidden-enter-from {
                    opacity: 0;
                    transform: translateX(-100%);
                }
            }
        }
        & > div > svg {
            position: absolute;
            fill: fadeout(@mikuColor, 50%);
            width: 100%;
            transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
        }
        & > div > svg:hover {
            fill: @mikuColor;
        }
        & > .play-button-space {
            width: 27PX;
            height: 27px;
            font-size: 0;
            position: relative;
        }
        & > .little-button {
            width: 21PX;
            height: 21px;
        }
        & > .next-music-space {
            position: relative;
            margin-left: 18px;
        }
        & > .previous-music-space {
            position: relative;
            margin-right: 18px;
        }
        & > .play-mode-space {
            margin-right: 30px;
            position: relative;
            svg {
                position: absolute;
                top: 0;
                left: 0;
                background: white;
            }
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
                top: 2px;
                left: 30px;
                // transform-origin: left top;
                // transform: rotate(-90deg);
                border-radius: 4px;
                background: fadeout(@mikuColor, 80);
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
        width: 500px;
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
            font-size: 12px;
            margin: 0 8px;
        }
    }
    .audio-name-space {
        -webkit-app-region: drag;
        width: 500px;
        padding: 10px 0px;
        border-top: 1px solid;
        border-image: linear-gradient(90deg, white, rgb(225, 225, 225), white) 1;
        display: flex;
        justify-content: center;
    }
</style>
<script setup lang="ts">
import AudioApi from '@/service/audio';
import { onMounted, ref, watch } from 'vue'
import { language } from '@/tmui/tool/lib/language';



const showWin = ref(false)
const recorderManager = uni.getRecorderManager();
let audioContext = uni.createInnerAudioContext()
const updateSign = ref(false)
let timer: any = null

onMounted(() => {
   recorderManager.onStop(function (res) {
      console.log('recorder stop' + JSON.stringify(res));
      (audioContext as UniApp.InnerAudioContext).src = res.tempFilePath;
      if (updateSign.value) {
         AudioApi.upLoadVoice((audioContext as UniApp.InnerAudioContext).src)
         updateSign.value = false
      }
      clearTimeout(timer)
   });

   recorderManager.onStart(function () {
      timer = setTimeout(async () => {
         updateSign.value = true
         recorderManager.stop()
         showWin.value = false
         // AudioApi.upLoadVoice((audioContext as UniApp.InnerAudioContext).src)
      }, 30 * 1000)
   })
})




function startMP3() {
   if (audioContext) {
      if (audioContext.paused) {
         audioContext.play()
         // iconColor.value = AudioType.play
      } else {
         audioContext.stop()
         // iconColor.value = AudioType.pause
      }
   }
}

function startRecord() {
   showWin.value = true
   recorderManager.start({
      format: 'wav'
   });
}

function endRecord() {
   showWin.value = false
   updateSign.value = true
   recorderManager.stop();
   // while (!updateSign.value) { console.log('等待上传'); }
   // uni.hideLoading()
   // console.log(audioContext.src);
   // AudioApi.upLoadVoice((audioContext as UniApp.InnerAudioContext).src)
}

function cancelRecord() {
   showWin.value = false
   recorderManager.stop();
}

function playVoice() {
   if (audioContext) {
      audioContext.play()
   }
}

</script>

<template>
   <div>
      <tm-button :shadow="10" :round="10" icon="tmicon-ios-mic" @click="startRecord" :size="'small'"></tm-button>
      <tm-overlay v-model:show="showWin" contentAnimation>
         <view @click.stop="">
            <tm-sheet :width="500" :height="650" :round="10">
               <!-- <img src="" alt=""> -->
               <div class="microphone mx-auto w-3/5 pt-20 ">
                  <div class="bar "></div>
                  <div class="bar "></div>
                  <div class="bar "></div>
                  <div class="bar "></div>
                  <div class="bar "></div>
                  <div class="bar "></div>
               </div>
               <img src="/static/icons/micro.svg" class="w-1/2 mx-auto img-height">
               <text class="text-center text-xl">Please speak now</text>
               <tm-sheet :margin="[0, 0]">
                  <view class=" flex justify-between w-auto">
                     <tm-button :width="180" @click="endRecord">Finish</tm-button>
                     <tm-button :width="180" outlined @click="cancelRecord">Cancel</tm-button>
                  </view>
               </tm-sheet>
            </tm-sheet>
         </view>
      </tm-overlay>
   </div>
</template>

<style lang="scss" scoped>
$bar-count: 6;

body {
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;
   margin: 0;
   background-color: #f0f0f0;
}

.microphone {
   display: flex;
   align-items: flex-end;
   height: 130rpx;
   background-color: rgb(18, 150, 219);
   border-radius: 10px;
   padding: 10px;

   @for $i from 1 through $bar-count {
      $delay: $i * 0.1s;

      .bar:nth-child(#{$i}) {
         width: 15px;
         background-color: #fff;
         margin: 0 5px;
         border-radius: 5px;
         animation: wave 1s infinite alternate;
         animation-delay: $delay;
      }
   }
}

.img-height {
   height: 400rpx;
}

@keyframes wave {
   0% {
      height: 20rpx;
   }

   50% {
      height: 100rpx;
   }

   100% {
      height: 20rpx;
   }
}
</style>
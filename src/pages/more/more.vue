<template>
   <tm-app ref="app">
      <Header />
      <!-- <image class="logo" src="/static/logo.png" /> -->
      <tm-button @click="click">more</tm-button>
      <!-- <view class="w-32 h-32 bg-blue-500"></view> -->
      <tm-icon name="tmicon-ios-volume-high" :font-size="50" @click="startMP3" :color="iconColor"></tm-icon>
      <button @tap="startRecord">开始录音</button>
      <button @tap="endRecord">停止录音</button>
      <button @tap="playVoice">播放录音</button>
   </tm-app>
   <Footer :active-number="3" />
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
import audioApi from '@/service/audio'
import { onMounted } from 'vue'
import { AudioType } from '@/global/extraConfig'
import AudioApi from '@/service/audio'

let audioContext: UniApp.InnerAudioContext | null = null
const recorderManager = uni.getRecorderManager();
const iconColor = ref(AudioType.pause)

function startRecord() {
   recorderManager.start({
      format: 'wav'
   });
}

function endRecord() {
   recorderManager.stop();

}

function playVoice() {
   if (audioContext) {
      audioContext.play()
   }

}

function click() {
   if (uni.getLocale() === 'en') {
      uni.setLocale('zh-Hans')
   } else {
      uni.setLocale('en')
   }
}

function startMP3() {
   if (audioContext) {
      if (audioContext.paused) {
         audioContext.play()
         iconColor.value = AudioType.play
      } else {
         audioContext.stop()
         iconColor.value = AudioType.pause
      }
   }
}

onMounted(() => {
   // audioContext.value = uni.createInnerAudioContext()
   const res = audioApi.getSingleAudio('test1.wav');
   audioContext = uni.createInnerAudioContext()
   audioContext.src = res;
   audioContext.onEnded(() => {
      iconColor.value = AudioType.pause
   })

   recorderManager.onStop(function (res) {
      console.log('recorder stop' + JSON.stringify(res));
      (audioContext as UniApp.InnerAudioContext).src = res.tempFilePath;
      AudioApi.upLoadVoice(res.tempFilePath)
   });
})

</script>


<style scoped>
.home {
   color: red
}
</style>
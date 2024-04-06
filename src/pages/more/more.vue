<template>
   <tm-app ref="app">
      <Header />
      <!-- <image class="logo" src="/static/logo.png" /> -->
      <tm-button @click="click">more</tm-button>
      <view class="w-32 h-32 bg-blue-500"></view>
      <tm-icon name="tmicon-ios-volume-high" :font-size="50" @click="startMP3" :color="iconColor"></tm-icon>
   </tm-app>
   <Footer :active-number="3" />
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { language } from '@/tmui/tool/lib/language'
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
import audioApi from '@/service/audio'
import { onMounted } from 'vue'
import { AudioType } from '@/global/extraConfig'

let audioContext: UniApp.InnerAudioContext | null = null
const iconColor = ref(AudioType.pause)


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
})

</script>


<style scoped>
.home {
   color: red
}
</style>
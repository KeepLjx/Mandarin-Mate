<template>
   <tm-app ref="app" bgStyle="background: #f8f8f8">
      <Header />
      <view class="mt-3 ml-3" @click="goBack">
         <img src="/static/icons/arrow.svg" alt="" class=" rounded-xl w-8 h-8 bg-blue-500" />
      </view>
      <tm-sheet :padding="[0]" :height="1000" :style="'display: flex; flex-direction: column;gap: 20rpx;'">
         <view class="outline-box h-1/4 flex flex-col justify-around  rounded-xl">
            <tm-skeleton :height="30" model="card" v-if="showWin"></tm-skeleton>
            <view v-if="!showWin" class="flex flex-col justify-around gap-3">
               <text class="inline-block text-center font-bold text-5xl flex-grow">{{ wordsList[wordIdx].content
                  }}</text>
               <tm-icon name="tmicon-ios-volume-high" :font-size="60" :color="iconColor" @click="playSound"></tm-icon>
            </view>
         </view>
         <view class="outline-box h-1/2  rounded-xl   ">
            <scroll-view scroll-y>
               <tm-skeleton :height="40" model="card" v-if="showWin"></tm-skeleton>
               <view v-if="!showWin" class="flex flex-col gap-3">
                  <text class="inline-block italic font-bold bg-cyan-700 text-white p-1">Example</text>
                  <text class="inline-block text-center">{{ wordsList[wordIdx].example }}</text>
               </view>
            </scroll-view>
         </view>
         <view class="outline-box h-1/4    rounded-xl  ">
            <tm-skeleton :height="30" model="card" v-if="showWin"></tm-skeleton>
            <view v-if="!showWin" class=" flex flex-col gap-2">
               <text class="inline-block italic font-bold  bg-cyan-700 text-white p-1">Spells</text>
               <view class="mx-auto flex  gap-12">
                  <text class=" inline-block w-1/4" style="font-size: 60rpx;"
                     v-for="(item, index) in dealPinYin(wordsList[wordIdx].wordsSpell)" :key="item">{{
                        item }}
                  </text>
               </view>
            </view>
         </view>
      </tm-sheet>
      <view class=" mx-auto">
         <panel class="flex flex-row gap-3 h-30 bg-cyan-400 bg-opacity-35  p-5 rounded-md shadow-Effect">
            <tm-button :shadow="10" label="Last " @click="switchLast"></tm-button>
            <view class="my-auto">
               <Microphone />
            </view>
            <tm-button :shadow="10" label="Next " @click="switchNext"></tm-button>
         </panel>
      </view>
      <tm-notification :placement="'top'" ref="msg" :offset="[32, 220]" :color="'grey'"> </tm-notification>
   </tm-app>
   <!-- <Footer :active-number="3" /> -->
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, reactive } from 'vue'
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
import Microphone from '@/components/microphone/index.vue'
import { onMounted, onBeforeMount } from 'vue'
import { AudioType, type WordSList } from '@/global/extraConfig'
import { WordBookApi } from '@/service/wordsBook'
import { dealPinYin } from '@/utils/dealPinYin'
import loginConfig from '../login/loginConfig'
import tmNotification from '@/tmui/components/tm-notification/tm-notification.vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ossurl } from '@/service/baseurl'

const msg = ref<InstanceType<typeof tmNotification> | null>(null)
const iconColor = ref(AudioType.pause)
const wordsList = ref<WordSList[]>([])
const wordIdx = ref(0)
const pinYinList = ref<any[]>([])
const showWin = ref(true)
let audioContext = uni.createInnerAudioContext()

function playSound() {
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

const switchLast = () => {
   if (wordIdx.value > 0) {
      wordIdx.value = wordIdx.value - 1
      changeWord()
   }
   else {
      msg.value?.show({ label: 'Now is the first', duration: 1000 })
   }
}

const switchNext = () => {
   if (wordIdx.value < wordsList.value.length - 1) {
      wordIdx.value = wordIdx.value + 1
      changeWord()
   }
   else {
      msg.value?.show({ label: 'Now is the last', duration: 1000 })
   }
}

const changeVoice = (index: number) => {
   if (audioContext) {
      pinYinList.value = dealPinYin(wordsList.value[index].wordsSpell)
      audioContext.src = ossurl + wordsList.value[index].voicePath
   }
}

const goBack = () => {
   uni.navigateBack()
}

const changeWord = () => {
   showWin.value = true
   changeVoice(wordIdx.value)
   showWin.value = false
}


onBeforeMount(async () => {
   // audioContext.value = uni.createInnerAudioContext()
   uni.showLoading({
      title: 'Initializing the dictionary...',
   })
   const res = await WordBookApi.getBookInfo(uni.getStorageSync('bookId'))

   if (res.code === loginConfig.login_statusCode.SUCCESS) {
      wordsList.value = res.data.wordsInfo
      // console.log(dealPinYin(wordsList.value[0].wordsSpell));
      changeVoice(0)
      showWin.value = false
      uni.hideLoading()
      uni.showToast({
         title: 'Initialization succeeded',
         icon: 'success',
      })
   }

   audioContext.onEnded(() => {
      iconColor.value = AudioType.pause
   })

})

</script>


<style scoped>
.outline-box {
   width: 90%;
   background-color: #f0f0f0;
   border: 3px solid #246cd8;
   /* 好看的阴影 */
   box-shadow: 0 0 10px #3e74c6;
   transition: all 0.3s ease;
   margin: 10rpx auto;
}

.shadow-Effect {
   box-shadow: 0 0 10px #80a1d3;
}
</style>
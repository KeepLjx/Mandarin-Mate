<template>
  <tm-app ref="app">
    <Header />
    <!-- <image class="logo" src="/static/logo.png" /> -->
    <view class=" w-screen h-10 box-border px-3 ">
      <view class="float-left my-auto pt-2">
        <text class=" font-bold text-lg">{{ language('index.tab.home') }}</text>
      </view>
      <view class=" float-right size-10  pt-2">
        <tm-icon name="tmicon-outdent" :font-size="50" color="black"></tm-icon>
      </view>
    </view>
    <tm-sheet :padding="[0]">
      <tm-input suffix="tmicon-picture-fill" prefix="tmicon-search" showClear :border="2"></tm-input>
    </tm-sheet>
    <tm-sheet :height="1000" :padding="[0]" :margin="[32, 100, 32, 32]">
      <view
        class=" size-40  shadow-2xl shadow-slate-400 bg-slate-200  rounded-3xl   mx-auto mb-28  flex flex-col gap-2 p-4">
        <text class="text text-center text-lg text-slate-400  font-bold block ">{{
          language('index.learning.title')
        }}</text>
        <text class="text text-center text-lg  text-slate-500 font-bold block">PINYIN</text>
        <text class="text text-center text-lg  text-slate-700 font-bold block">{{ language('index.task') }} 1</text>
        <text class="text text-center text-lg  text-slate-700 font-bold block">{{ language('index.start') }} ▶</text>
      </view>
      <view class=" size-40  shadow-2xl shadow-slate-400 bg-slate-200  rounded-3xl   mx-auto flex flex-col gap-4 p-4">
        <text class="text text-center text-lg  text-slate-400 font-bold block">{{ language('index.remaining.title')
          }}</text>
        <text class="text text-center text-lg  text-slate-700 font-bold block">50</text>
        <text class="text text-center text-lg  text-slate-700 font-bold block">{{ language('index.start') }} ▶</text>
      </view>
    </tm-sheet>
    <tm-notification :placement="'top'" ref="msg" :offset="[32, 220]" :color="'red'" label="登录成功"></tm-notification>
  </tm-app>
  <Footer :active-number="0" />
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue'
import { language } from '@/tmui/tool/lib/language'
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
import { NotificationType } from '@/global/extraConfig'
import tmNotification from '@/tmui/components/tm-notification/tm-notification.vue'

const msg = ref<InstanceType<typeof tmNotification> | null>(null)
function click() {
  if (uni.getLocale() === 'en') {
    uni.setLocale('zh-Hans')
  } else {
    uni.setLocale('en')
  }
}

onShow(() => {
  uni.hideTabBar()
})

onMounted(() => {
  msg.value?.show({
    color: NotificationType.SUCCESS,
    label: '登录成功'
  })
})
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>

<template>
   <tm-app ref="app">
      <Header />
      <!-- <image class="logo" src="/static/logo.png" /> -->

      <tm-button @click="click">ctb</tm-button>
      <view class="w-32 h-32 bg-blue-500"></view>
   </tm-app>
   <Footer :active-number="4" />
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { language } from '@/tmui/tool/lib/language'
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'


function click() {
   if (uni.getLocale() === 'en') {
      uni.setLocale('zh-Hans')
   } else {
      uni.setLocale('en')
   }
}

</script>


<style scoped>
.home {
   color: red
}
</style>
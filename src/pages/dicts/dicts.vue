<template>
   <tm-app ref="app">
      <Header />
      <!-- <image class="logo" src="/static/logo.png" /> -->
      <view class="w-32 h-32 bg-blue-500"></view>
      <qiunDataCharts type="column" :chartData="chartsDataColumn1" :canvas2d="true" />
   </tm-app>
   <Footer :active-number="1" />
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { language } from '@/tmui/tool/lib/language'
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
import qiunDataCharts from '@/components/qiun-data-charts/qiun-data-charts.vue';

const chartsDataColumn1 = {
   categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
   series: [
      {
         name: "目标值",
         data: [35, 36, 31, 33, 13, 34],
      },
      {
         name: "完成量",
         data: [18, 27, 21, 24, 6, 28],
      },
   ],
}


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
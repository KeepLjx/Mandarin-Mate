<template>
   <tm-app ref="app">
      <Header />
      <tm-sheet :padding="[1]">
         <nav class=" h-10 screen  flex justify-between z-40 fixed bg-white">
            <view>
               <text class=" font-bold text-lg ">Dictionaries</text>
            </view>
            <view class="flex  gap-2">
               <tm-icon name="tmicon-cog" :font-size="40"></tm-icon>
            </view>
         </nav>

         <scroll-view class=" pt-10" scroll-y>
            <view class=" mb-10" v-for="val in dictList" :key='val.dictLevel'>
               <view class="mb-4">
                  <text class=" font-bold text-xl">{{ val.dictLevel }}</text>
               </view>
               <view class=" flex h-36 mb-4" v-for="dict in val.dictList" :key="dict.name">
                  <img class="w-2/6 mr-4 bg-slate-500" :src="dict.cover" alt="">
                  <view>
                     <text class=" leading-6">{{ dict.name }}</text>
                  </view>
               </view>
            </view>
         </scroll-view>
      </tm-sheet>
   </tm-app>
   <Footer :active-number="1" />
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onBeforeMount } from 'vue'
import { language } from '@/tmui/tool/lib/language'
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
import qiunDataCharts from '@/components/qiun-data-charts/qiun-data-charts.vue';
import type { dictType } from './dictsConfig';
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
   uni.hideTabBar()
})

const dictList = ref<dictType[]>([
   {
      dictLevel: 'PinYin',
      dictList: [{
         cover: '',
         name: '都原本'
      }]
   },
   {
      dictLevel: 'Primary',
      dictList: [
         {
            cover: '',
            name: '都远被'
         },
         {
            cover: '',
            name: '都原本'
         }]
   }
])

// const chartsDataColumn1 = {
//    categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
//    series: [
//       {
//          name: "目标值",
//          data: [35, 36, 31, 33, 13, 34],
//       },
//       {
//          name: "完成量",
//          data: [18, 27, 21, 24, 6, 28],
//       },
//    ],
// }


</script>


<style scoped>
.screen {
   width: 90vw;
}
</style>
<template>
   <tm-app ref="app">
      <Header />

      <tm-sheet :padding="[0]">
         <nav class="pt-5 screen  flex justify-between z-40 fixed bg-white top-20" style="">
            <view>
               <text class=" font-bold text-lg ">Dictionaries</text>
            </view>
            <view class="flex  gap-2">
               <tm-icon name="tmicon-cog" :font-size="40"></tm-icon>
            </view>
         </nav>
         <tm-sheet :padding="[1]" :margin="[0]">
            <scroll-view class=" pt-10 " scroll-y>
               <view class=" mb-10" v-for="val in dictList" :key='val.bookLevel'>
                  <view class="mb-4">
                     <text class=" font-bold text-xl">{{ val.bookLevel }}</text>
                  </view>
                  <view class=" flex h-36 mb-4" v-for="dict in val.books" :key="dict.bookName"
                     @click="chooseBook(dict)">
                     <img class="w-2/6 mr-4 bg-slate-500" :src="dict.bookImg" alt="">
                     <view class="w-4/6">
                        <text class=" leading-6">{{ dict.bookName }}</text>
                        <br />
                        <text class=" text-slate-400">{{ dict.bookIntro }}</text>
                     </view>
                  </view>
               </view>
            </scroll-view>
         </tm-sheet>
      </tm-sheet>
   </tm-app>
   <tm-modal title="choose book" :content="'Your will choose book is 《' + choosebook?.bookName + '》'"
      v-model:show="showWin" @ok="questChangeBook" :_style="'text-align:center'"></tm-modal>
   <tm-notification :placement="'top'" ref="msg" :offset="[32, 220]"></tm-notification>
   <Footer :active-number="1" />
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onBeforeMount } from 'vue'
import { language } from '@/tmui/tool/lib/language'
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
import qiunDataCharts from '@/components/qiun-data-charts/qiun-data-charts.vue';
import { bookImgList, type dictType, type dictionary } from './dictsConfig';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { WordBookApi } from '@/service/wordsBook';
import loginConfig from '../login/loginConfig';
import tmNotification from '@/tmui/components/tm-notification/tm-notification.vue';
import { ossurl } from '@/service/baseurl';

onShow(() => {
   uni.hideTabBar()
})


const msg = ref<InstanceType<typeof tmNotification> | null>(null)
const dictList = ref<dictType[]>([])
const showWin = ref(false)
const choosebook = ref<dictionary>()

onLoad(async () => {
   const booksList = await WordBookApi.getWordBookList()
   let i = 0
   booksList.data.bookInfo.forEach((val: dictType) => {
      val.books.forEach((val: dictionary) => {
         val.bookImg = ossurl + bookImgList[i++]
      })
   })
   dictList.value = booksList.data.bookInfo
})

const chooseBook = (book: dictionary) => {
   if (uni.getStorageSync('bookId') === book.bookId) {
      msg.value?.show({
         label: 'You have already chosen this book',
      })
   }
   else {
      choosebook.value = book
      showWin.value = true
   }

}

const questChangeBook = async () => {
   if (!uni.getStorageSync('bookId')) {
      try {
         const res = await WordBookApi.chooseBook((choosebook.value as dictionary).bookId)
         if (res.code === loginConfig.login_statusCode.SUCCESS) {
            msg.value?.show({
               label: 'change book success',
            })
            uni.setStorageSync('bookId', (choosebook.value as dictionary).bookId)
         }
         showWin.value = false
      }
      catch {
         msg.value?.show({
            label: 'change Failed',
         })
      }
      return
   }
   if (choosebook.value) {
      try {
         const res = await WordBookApi.switchBook(uni.getStorageSync('bookId'), choosebook.value.bookId)
         if (res.code === loginConfig.login_statusCode.SUCCESS) {
            msg.value?.show({
               label: 'change book success',
            })
            uni.setStorageSync('booId', choosebook.value.bookId)
         }
         showWin.value = false
      }
      catch {
         msg.value?.show({
            label: 'change Failed',
         })
      }
   }

}

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
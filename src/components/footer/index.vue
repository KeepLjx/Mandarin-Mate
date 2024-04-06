<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { language } from '@/tmui/tool/lib/language';
const acc = ref(0)
const props = defineProps({
   activeNumber: {
      type: Number,
      default: 0
   }
})
function laodingfun(val: any) {
   return new Promise((res) => {
      setTimeout(function () {
         console.log('选中了：', val)
         res(true)
      }, 2000)
   })
}


</script>

<template>
   <tm-tabbar :auto-select="false" :active="props.activeNumber" :follow-theme="true" showSafe>
      <tm-tabbar-item url="/pages/index/index" :follow-theme="true" :text="language('index.tab.home')"
         icon="tmicon-md-home" open-type="switchTab"></tm-tabbar-item>
      <tm-tabbar-item url="/pages/dicts/dicts" :text="language('index.tab.dict')" icon="tmicon-ios-bookmarks"
         :follow-theme="true" open-type="switchTab"></tm-tabbar-item>
      <tm-tabbar-item :shadow="2" :beforeClick="laodingfun" :data="'中间项'" btn-top fontColor="white" activeColor="white"
         color="blue" open-type="switchTab" linear="top" linearDeep="accent" icon="tmicon-plus" :follow-theme="true"
         customIcon>
      </tm-tabbar-item>
      <tm-tabbar-item url="/pages/more/more" :text="language('index.tab.more')" unicon="tmicon-like"
         icon="tmicon-collection-fill" :follow-theme="true" open-type="switchTab"></tm-tabbar-item>
      <tm-tabbar-item url="/pages/centre/centre" :text="language('index.tab.centre')" unicon="tmicon-account"
         icon="tmicon-userplus-fill" :follow-theme="true" open-type="switchTab"></tm-tabbar-item>
   </tm-tabbar>
</template>

<style scoped>
.home {
   color: red
}
</style>
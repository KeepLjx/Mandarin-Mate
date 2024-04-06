<script setup lang="ts">
import { ref, defineProps } from 'vue'
import qiunLoading from '../qiun-loading/qiun-loading.vue';
const props = defineProps({
   tip: String
})
const load = ref(true)
</script>

<template>
   <tm-overlay v-model:show="load" contentAnimation transparent :overlay-click="false">
      <view>
         <qiun-loading :loadingType="2"></qiun-loading>
      </view>
   </tm-overlay>
</template>

<style scoped>
.home {
   color: red
}
</style>
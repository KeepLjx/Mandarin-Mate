<template>
   <tm-app ref="app">
      <Header />
      <tm-sheet :padding="[1]">
         <nav class=" h-10 flex  justify-between">
            <view>
               <text class=" font-bold text-lg">个人中心</text>
            </view>
            <view class=" flex  gap-2">
               <tm-icon name="tmicon-md-more" :font-size="40"></tm-icon>
               <tm-icon name="tmicon-tongzhifill" :font-size="40"></tm-icon>
            </view>
         </nav>
         <view class=" flex gap-4 justify-evenly bg-slate-200 rounded-e-sm shadow-current p-2">
            <view @click="uploadImage"> <tm-avatar :size="150" :round="26" :img="avatarUrl"></tm-avatar> </view>
            <view class=" flex flex-col justify-center  w-1/3 gap-2">
               <text class=" font-bold text-center ">{{ nickName }}</text>
               <text class=" text-center">UID: {{ UID }}</text>
            </view>
            <view class=" flex items-center">
               <tm-icon name="tmicon-qrcode"></tm-icon>
            </view>
         </view>
         <view class=" mt-8">
            <tm-cell :margin="[0, 0]" bottom-border :border="2" :titleFontSize="30" title="My favorite"> </tm-cell>
            <tm-cell :margin="[0, 0]" bottom-border :border="2" :titleFontSize="30" title="My Notebook"> </tm-cell>
            <tm-cell :margin="[0, 0]" bottom-border :border="2" :titleFontSize="30" title="Message Manage"> </tm-cell>
            <tm-cell :margin="[0, 0]" bottom-border :border="2" :titleFontSize="30" title="Privacy and Security">
            </tm-cell>
            <tm-cell :margin="[0, 0]" bottom-border :border="2" :titleFontSize="30" title="Settings"></tm-cell>
         </view>
      </tm-sheet>
   </tm-app>
   <tm-notification :placement="'top'" ref="msg" :offset="[32, 220]"></tm-notification>
   <Footer :active-number="4" />
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onBeforeMount } from 'vue'
import { language } from '@/tmui/tool/lib/language'
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
import { uploadFilePaths, uploadUrl } from '@/service/baseurl'
import tmNotification from '@/tmui/components/tm-notification/tm-notification.vue'

const msg = ref<InstanceType<typeof tmNotification> | null>(null)
const avatarUrl = ref('')
const nickName = ref('')
const UID = ref('')


onBeforeMount(() => {
   avatarUrl.value = uni.getStorageSync('avatar').avatarUrl || ''
   nickName.value = uni.getStorageSync('userInfo').nickName || ''
   UID.value = uni.getStorageSync('UID') || ''
})

function uploadImage() {
   uni.chooseImage({
      count: 1,
      crop: {
         width: 200,
         height: 200,
         quality: 100
      },
      success: (res) => {
         const tempFilePaths = res.tempFilePaths
         uni.uploadFile({
            url: uploadUrl,
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
               'path': `${uni.getStorageSync('UID')}/avatar`,
            },
            success: (res) => {
               if (res.statusCode === 200) {
                  const data = JSON.parse(res.data)
                  uni.setStorageSync('avatar', { avatarUrl: data.data })
                  avatarUrl.value = data.data
                  msg.value?.show({
                     label: 'upload success',
                  })
               }
            }
         })
      },
      fail: (err) => {
         console.log(err);
      }
   })
}

</script>


<style scoped></style>
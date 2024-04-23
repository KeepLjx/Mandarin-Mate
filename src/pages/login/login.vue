<script setup lang="ts">
import stores from '@/store';
import { onMounted, ref, onBeforeMount } from 'vue';
import Header from '@/components/header/index.vue';
import { language } from '@/tmui/tool/lib/language';
import Loading from '@/components/loading/index.vue';
import LoginApi from '@/service/login';
import { reactive } from 'vue';
import tmForm from '@/tmui/components/tm-form/tm-form.vue';
import tmNotification from '@/tmui/components/tm-notification/tm-notification.vue'
import statusCode from './loginConfig'
import { NotificationType } from '@/global/extraConfig'

const msg = ref<InstanceType<typeof tmNotification> | null>(null)
const form = ref<InstanceType<typeof tmForm> | null>(null)
const show = ref(false)
const getAgain = ref(true)
const countdown = ref(60)
const user = reactive({
   userMail: '',
   userPassword: '',
   code: '',
   reUserPassword: ''
})
const tabsTitle = ref([
   { key: 'login', title: language('login.title.login'), },
   { key: 'sign up', title: language('login.title.signUp'), },
])
const loading = ref(false)
const isSignUp = ref(false)
const title = ref(language('login.title.login'))
const rules = {
   userMail: [
      { required: true, message: '不能为空', validator: (val: string) => !uni.$tm.u.isEmpty(val) },
      { required: true, message: '不符合邮箱写法', validator: (val: string) => uni.$tm.u.isEmail(val) },
   ],
   userPassword: [
      { required: true, message: '不能为空', validator: (val: string) => !uni.$tm.u.isEmpty(val) },
      { required: true, message: '必须同时包含数字和字母，且在6-20位之间', validator: (val: string) => uni.$tm.u.isPasswordOfOther(val, 6, 20, 2) },
   ],
   reUserPassword: [
      { required: true, message: '不能为空', validator: (val: string) => !uni.$tm.u.isEmpty(val) },
      { required: true, message: '必须同时包含数字和字母，且在6-20位之间', validator: (val: string) => uni.$tm.u.isPasswordOfOther(val, 6, 20, 2) },
      { required: true, message: '与原密码不一致', validator: (val: string) => val === user.userPassword }
   ],
   code: [
      { required: true, message: '不能为空', validator: (val: string) => !uni.$tm.u.isEmpty(val) },
      { required: true, message: '验证码应为6位数字', validator: (val: string) => uni.$tm.u.isPasswordOfNumber(val, 6, 6) },
   ]
}

onBeforeMount(async () => {
   let langEnv = uni.getStorageSync('language')
   if (langEnv) {
      uni.setLocale(langEnv)
   } else {
      uni.setLocale('en')
      uni.setStorageSync('language', 'en')
   }

   let token = uni.getStorageSync('token')

   if (token) {
      uni.showLoading({
         title: '登录中',
         mask: true
      })
      try {
         if (!uni.getStorageSync('userInfo')) {
            uni.getUserInfo({
               provider: 'weixin',
               success: (res) => {
                  uni.setStorageSync('userInfo', { nickName: res.userInfo.nickName, avatarUrl: res.userInfo.avatarUrl })
               }
            })
         }
         let res = await LoginApi.getUserInfo(token)
         switch (res.code) {
            case statusCode.login_statusCode.SUCCESS:
               uni.setStorageSync('UID', res.data.userInfo.userId)
               uni.switchTab({
                  url: '/pages/index/index'
               })
               break;
            default:
               uni.hideLoading()
               break;
         }
      }
      catch (err) {
         uni.showToast({
            title: "出错了，请稍后再试试吧",
            icon: 'none'
         })
      }
      finally {
         uni.hideLoading()
      }
   }


});

function ok() {
   show.value = false
}



function tabschange(e: string) {
   if (e === "sign up") {
      title.value = language('login.title.signUp')
      isSignUp.value = true
   } else {
      title.value = language('login.title.login')
      isSignUp.value = false
   }
}

function translate() {
   let langEnv = uni.getStorageSync('language')
   if (langEnv === 'en') {
      uni.setLocale('zh-Hans')
      uni.setStorageSync('language', 'zh-Hans')
   } else {
      uni.setLocale('en')
      uni.setStorageSync('language', 'en')
   }
   tabsTitle.value = [
      { key: 'login', title: language('login.title.login'), },
      { key: 'sign up', title: language('login.title.signUp'), },
   ]
   title.value = language('login.title.login')
}


async function login(params: any) {
   loading.value = true
   if (!isSignUp.value) {
      if (!params.result[0].validator || !params.result[1].validator) {
         loading.value = false
         return msg.value?.show({
            label: '请检查表单是否输入正确'
         })
      }
      try {
         let res = await LoginApi.loginMail(user.userMail, user.userPassword)
         switch (res.code) {
            case statusCode.login_statusCode.SUCCESS:
               uni.setStorageSync('token', res.data.token)
               loading.value = false
               uni.switchTab({
                  url: '/pages/index/index'
               })
               break;
            case statusCode.login_statusCode.NOTFOUND:
               loading.value = false
               return msg.value?.show({
                  label: '用户不存在，请先注册'
               })
            case statusCode.login_statusCode.PASSWORD_ERROR:
               loading.value = false
               return msg.value?.show({
                  label: '密码错误'
               })
            default:
               loading.value = false
               return msg.value?.show({
                  label: '登录失败'
               })
         }
      } catch (error) {
         loading.value = false
         uni.showToast({
            title: "出错了，请稍后再试试吧",
            icon: 'none'
         })
      }
   }
   else {
      if (!params.isPass) {
         loading.value = false
         return msg.value?.show({
            label: '请检查表单是否输入正确'
         })
      }
      try {
         let res = await LoginApi.registerMail(user.userMail, user.userPassword, user.code)
         switch (res.code) {
            case statusCode.register_statusCode.SUCCESS:
               uni.setStorageSync('token', res.data.token)
               loading.value = false
               uni.switchTab({
                  url: '/pages/index/index'
               })
               break;
            default:
               loading.value = false
               msg.value?.show({
                  label: '注册失败'
               })
               break;
         }
      } catch (error) {
         loading.value = false
         uni.showToast({
            title: "出错了，请稍后再试试吧",
            icon: 'none'
         })
      }

   }
}

async function login_weiChat() {
   loading.value = true
   uni.login({
      provider: 'weixin',
      onlyAuthorize: true,
      success: async (res) => {
         try {
            let resp = await LoginApi.login_weiXin(res.code)
            uni.setStorageSync('token', resp.data.token)
            loading.value = false
            uni.switchTab({
               url: '/pages/index/index'
            })
         }
         catch (err) {
            loading.value = false
            uni.showToast({
               title: "出错了，请稍后再试试吧",
               icon: 'none'
            })
         }
      },
      fail: (err) => {
         console.log(err);
      }
   })
}

async function getCapcha() {
   loading.value = true
   try {
      let res = await LoginApi.getCode(user.userMail)
      switch (res.code) {
         case statusCode.register_statusCode.SUCCESS:
            getAgain.value = false
            let timer = setInterval(() => {
               countdown.value--
               if (countdown.value === 0) {
                  getAgain.value = true
                  clearInterval(timer)
               }
            }, 1000)
            loading.value = false
            break;

         case statusCode.register_statusCode.REPEAT:
            loading.value = false
            msg.value?.show({
               label: '请勿重复获取验证码'
            })
            break;
         default:
            break;
      }
   } catch (error) {
      loading.value = false
      uni.showToast({
         title: "出错了，请稍后再试试吧",
         icon: 'none'
      })
   }
}

</script>

<template>
   <tm-app>
      <Header />
      <view class=" w-screen bg-blue-600 backWall">
      </view>
      <view class="form-area rounded-md shadow-lg w-5/6 z-10 mx-auto">
         <image src="../../static/icons/logo.svg" class=" w-24 h-24 z-999 mx-auto -mt-16  " mode="scaleToFill" />
         <tm-sheet>
            <image src="../../static/icons/translation.svg" alt="" class=" w-4 h-4" @click="translate" />
            <tm-tabs @change="tabschange" showTabsLineAni :list="tabsTitle" :item-width="220" :item-font-size="36"
               :_style="'margin-left:20rpx;'"></tm-tabs>
         </tm-sheet>
         <tm-form :margin="[0]" :model-value="user" @submit="login" ref="form" :label-width="160">
            <scroll-view scroll-y style="height: 600rpx;">

               <tm-form-item :label="language('login.title.eMail')" :font-size="18" :margin="[0, 12]"
                  :_style="'font-size:12px'" field="userMail" :rules="rules.userMail">
                  <tm-input :placeholder="language('login.title.placeholderEMail')" prefix="tmicon-user-fill"
                     :font-size="25" v-model.lazy="user.userMail" />
               </tm-form-item>

               <tm-form-item :label="language('login.title.password')" :font-size="18" :_style="'font-size:12px;'"
                  :margin="[0, 12]" field="userPassword" :rules="rules.userPassword">
                  <tm-input :placeholder="language('login.title.placeholderPassword')" type="safe-password"
                     prefix="tmicon-lock-fill" :font-size="25" v-model.lazy="user.userPassword" />
               </tm-form-item>

               <tm-form-item :label="language('login.title.rePassword')" :font-size="18" :_style="'font-size:12px;'"
                  :margin="[0, 12]" v-show="isSignUp" field="reUserPassword" :rules="rules.reUserPassword">
                  <tm-input :placeholder="language('login.title.placeholderPassword')" type="safe-password"
                     prefix="tmicon-lock-fill" :font-size="25" v-model.lazy="user.reUserPassword" />
               </tm-form-item>

               <tm-form-item :font-size="18" :label-width="130" :_style="'font-size:12px;'" :margin="[0, 12]"
                  v-show="isSignUp" field="code" :rules="rules.code">
                  <template v-slot:label>
                     <tm-button :size="'small'" @click="getCapcha" :disabled="!getAgain">
                        {{ getAgain ? language('login.title.identity') : `${countdown}s` }}
                     </tm-button>
                  </template>
                  <tm-codeinput :border="2" :round="3" @click="show = true" :value="user.code" :font-size="32"
                     :size="50" :count="6"></tm-codeinput>
               </tm-form-item>

               <tm-form-item :margin="[0, 12]">
                  <tm-button type="primary" form-type="submit" :_style="'margin:auto;'" :round="20" :width="450">{{
                     title
                  }}</tm-button>
                  <tm-text :label="language('login.title.forgotPassword')" color="primary" :font-size="24"
                     :_style="'display:inline-block;margin:20rpx auto'"></tm-text>
               </tm-form-item>

            </scroll-view>
         </tm-form>

         <view>
            <te-sheet>
               <tm-text :label="language('login.title.moreWayToLogin')" :font-size="24"
                  :_style="'display:inline-block;margin:20rpx auto'"></tm-text>
               <view class=" bg-slate-400 rounded-full  mx-auto w-0">
                  <tm-icon name="tmicon-weixin" color="#1afa29" :font-size="40" @click="login_weiChat"></tm-icon>
               </view>
            </te-sheet>
         </view>
         <tm-keyboard @success="ok" :maxLength="6" v-model:show="show" v-model="user.code"></tm-keyboard>
      </view>
      <Loading :tip="language('login.title.tip')" v-if="loading" />
      <tm-notification :placement="'top'" ref="msg" :offset="[32, 220]"
         :color="NotificationType.ERROR"></tm-notification>
   </tm-app>

</template>

<style scoped lang="scss">
.backWall {
   height: 500rpx;
}

.form-area {
   height: 1100rpx;
   margin-top: -300rpx;
   background-color: white;
}
</style>
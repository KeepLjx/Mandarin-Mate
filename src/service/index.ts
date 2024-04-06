/*
 网络请求封装函数
 */
import { baseurl } from '@/service/baseurl'

interface RequestParams {
   url: string
   method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
   data?: object | string
   header?: object
   isImage?: boolean,
   isAudio?: boolean
}

interface RequestResponse {
   success: boolean
   code: number
   message: string
   data: DataStructure
}

interface DataStructure {
   [key: string]: any
}

export default function preRequest(params: RequestParams): Promise<RequestResponse> {
   return new Promise((resolve, reject) => {
      // uni.showLoading({
      //    mask: true,
      //    title: '获取数据中'
      // })
      // let imageType
      // if (params.isImage) {
      //    imageType = { 'content-type': 'multipart/form-data' }
      // } else {
      //    imageType = {}
      // }

      uni.request({
         url: `${baseurl}` + params.url,
         method: params.method,
         data: params.data,
         header: params.header ?? { 'content-type': 'application/json' },
         // header: params.header ?? { Authorization: 'Bearer ' + uni.getStorageSync('token'), ...imageType },
         success(res) {
            if (res.statusCode === 200) {
               console.log(res)
               // uni.hideLoading()
               resolve(res.data as RequestResponse)
            } else {
               // uni.hideLoading()
               uni.showToast({
                  title: '获取失败',
                  icon: 'error',
                  duration: 1500
               })
               reject(`网络请求错误,${res.statusCode}`)
            }
         },
         fail(err) {
            // uni.hideLoading()
            uni.showToast({
               title: '请求失败',
               icon: 'error',
               duration: 1500
            })
            reject(`网络请求失败,${err}`)
         }
      })
   })
}
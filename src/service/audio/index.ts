import { uploadfile } from "@/tmui/components/tm-upload/upload";
import preRequest from "..";
import { ossurl, baseurl } from "../baseurl";

class AudioApi {
   public static rootUrl: string = ossurl + '/audios/'
   constructor() { }

   static getSingleAudio(filePath: string): string {
      return this.rootUrl + filePath
   }

   static async upLoadVoice(file: string) {
      let uploadTask = uni.uploadFile({
         filePath: file,
         url: baseurl + '/user/practiceVoice',
         header: { token: uni.getStorageSync('token') },
         name: 'readVoice',
         success: (res) => {
            console.log('success');
            console.log(res);
         },
         fail: (err) => {
            console.log(err);
         },
         complete: () => {
            console.log('complete');

         }
      })

      uploadTask.onProgressUpdate((res) => {
         console.log('上传进度' + res.progress);
         console.log('已经上传的数据长度' + res.totalBytesSent);
         console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
      })
   }

}

export default AudioApi
import preRequest from "..";
import type { baseurl, uploadFilePaths } from "../baseurl";
class DocumentApi {
   constructor() { }

   static async uploadFile(path: uploadFilePaths, tmpPath: string, UID: string) {
      uni.showLoading({
         title: '上传中...',
         mask: true
      })

      return new Promise((resolve, reject) => {
         uni.getFileSystemManager().getFileInfo({
            filePath: tmpPath,
            success: async () => {
               let file = new File([tmpPath], `${path}/${UID}/${tmpPath.replace(/http:\/\/tmp\//, '')}`, { type: 'image/png' })
               console.log(file);
               const res = await preRequest({
                  method: 'POST',
                  url: '/common/upload',
                  header: { "Content-Type": 'multipart/form-data' },
                  data: {
                     file,
                     path
                  }
               })
               resolve(res)
            },
            fail: (err) => {
               reject(err)
            },
            complete: () => {
               uni.hideLoading()
            }
         })
      })

   }



}


export default DocumentApi
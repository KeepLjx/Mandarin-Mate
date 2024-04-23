import preRequest from "..";
class WordBookApi {
   constructor() { }


   static async getWordBookList() {
      const res = await preRequest({
         url: '/book',
         method: 'GET',
      })

      return res

   }

   static async chooseBook(bookId: number) {
      const res = await preRequest({
         url: '/book/schedule' + `?bookId=${bookId}`,
         method: 'GET',
         header: { token: uni.getStorageSync('token') }
      })

      return res
   }

   static async switchBook(bookId: number, scheduleId: number) {
      const res = await preRequest({
         url: '/book/switchBookSchedule' + `?bookId=${bookId}&switchBookId=${scheduleId}`,
         method: 'GET',
         header: { token: uni.getStorageSync('token') }
      })

      return res
   }


   static async getBookSchedule() {
      const res = await preRequest({
         url: '/book/getSchedule',
         method: 'GET',
         header: { token: uni.getStorageSync('token') }
      })

      return res
   }

   static async resetSchedule(bookId: number) {
      const res = await preRequest({
         url: '/book/resetSchedule' + `?bookId=${bookId}`,
         method: 'GET',
         header: { token: uni.getStorageSync('token') }

      })

      return res
   }

   static async getBookInfo(bookId: number) {
      const res = await preRequest({
         url: '/book/getBookWordsInfo' + `?bookId=${bookId}`,
         method: 'GET',
         header: { token: uni.getStorageSync('token') }
      })

      return res
   }

}
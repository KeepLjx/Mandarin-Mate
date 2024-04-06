import preRequest from "..";
class LoginApi {
   constructor() { }

   static async login_weiXin(code: string) {
      // do something
      const res = await preRequest({
         url: '/user/weChatLogin',
         method: 'POST',
         data: {
            code
         }
      })

      return res
   }

   static async loginMail(userMail: string, password: string) {
      // do something
      const res = await preRequest({
         url: '/user/login',
         method: 'POST',
         data: {
            userMail,
            password
         }
      })

      return res
   }

   static async registerMail(userMail: string, password: string, registerCode: string) {
      // do something
      const res = await preRequest({
         url: '/user/register',
         method: 'POST',
         data: {
            nickName: '普通用户',
            userMail,
            password,
            registerCode
         }
      })

      return res
   }

   static async getCode(userMail: string) {
      // do something
      const res = await preRequest({
         url: '/user/userMail' + `?userMail=${userMail}`,
         method: 'GET',
      })

      return res
   }

   static async getUserInfo(token: string) {
      const res = await preRequest({
         url: '/user',
         method: 'GET',
         header: {
            token
         }
      })

      return res
   }
}

export default LoginApi

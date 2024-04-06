import { defineStore } from "pinia";

export const useUserInfoStore = defineStore('userInfo', {
   state: () => ({
      userName: '',
      id: '',
      email: '',
      langEnv: 'en'
   }),
   actions: {
      setLangEnv(env: string) {
         this.langEnv = env;
      },
      setUserInfo({ userName = '', id = '', email = '' }: { userName: string, id: string, email: string }) {
         this.userName = userName ? userName : this.userName;
         this.id = id ? id : this.id;
         this.email = email ? email : this.email;
      }
   }
});
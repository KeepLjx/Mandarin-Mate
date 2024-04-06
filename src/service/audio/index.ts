import preRequest from "..";
import { ossurl } from "../baseurl";

class AudioApi {
   public static rootUrl: string = ossurl + '/audios/'
   constructor() { }

   static getSingleAudio(filePath: string): string {
      return this.rootUrl + filePath
   }

}

export default AudioApi
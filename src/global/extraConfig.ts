export enum NotificationType {
   INFO = 'primary',
   SUCCESS = 'green',
   WARNING = 'yellow',
   ERROR = 'red',
}

export enum AudioType {
   play = 'primary',
   pause = 'black',
}

export type WordSList = {
   [key: string]: any,
   bookId: number,
   example: string,
   content: string,
   typeTag: string,
   voicePath: string,
   wordsId: number,
   wordsSpell: string,
}




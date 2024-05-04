/**
 * @returns(dictType[])
 */
export interface dictType {
   bookLevel: string, // 级别
   books: dictionary[] // 书籍列表
}

export type dictionary = {
   bookImg: string,  // 封面
   bookName: string,   // 名称
   bookId: number,   // 书籍id
   bookLevel: number, // 级别
   bookIntro: string, // 简介
}

export const bookImgList = [
   '/books/cover/Basic_Pinyin.jpg',
   '/books/cover/Simple_words.jpg',
   '/books/cover/Complex_words.jpg',
   '/books/cover/Simple_sentence.jpg',
   '/books/cover/Complex_sentence.jpg',
   '/books/cover/Simple_article.jpg',
   '/books/cover/Complex_article.jpg',
]



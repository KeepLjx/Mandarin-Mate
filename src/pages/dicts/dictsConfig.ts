/**
 * @returns(dictType[])
 */
export interface dictType {
   dictLevel: string, // 级别
   dictList: dictionary[] // 书籍列表
}

type dictionary = {
   cover: string,  // 封面
   name: string,   // 名称
   bookId: number   // 书籍id
}



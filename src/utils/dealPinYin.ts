export function dealPinYin(sequence: string) {
   const pinyinArray = sequence.slice(1, sequence.length - 1).split(',')
   const pinyinArrayEscaped = JSON.parse('[' + pinyinArray.map(char => '"\\u' + char.substring(2) + '"') + ']')
   return pinyinArrayEscaped
}
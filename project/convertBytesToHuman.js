/*
 * Функция `convertBytesToHuman` должна принимать
 * аргумент `bytes` только числового типа.
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

 function convertBytesToHuman(bytes) {
  // your solution goes here
  if(typeof(bytes) == 'number' && bytes >= 0){
    let i = -1
    const byteUnits = [' KB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB']
    do {
      bytes /= 1024
      i++
  } while (bytes > 1024)
    return Math.max(bytes,0.1).toFixed(2) + byteUnits[i]
  }
    return false
}

module.exports = convertBytesToHuman

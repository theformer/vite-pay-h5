/**
 * 动态引入图片地址
 * @param url
 * @param prefix
 */
export const getAssetsImageUrl = (url: string, prefix = 'images') => {
  return new URL(`../assets/${prefix}/${url}`, import.meta.url).href
}
export const $deepcopy = function (obj: any) {
  if (!(typeof obj == 'object')) {
    return
  }
  for (var key in obj) {
    if (
      obj.hasOwnProperty.call('key') && // eslint-disable-line no-unused-vars
      (obj[key] === null ||
        obj[key] === undefined ||
        obj[key] === '' ||
        obj[key] === 'null' ||
        obj[key] === 'NULL' ||
        obj[key] === 'undefined')
    ) {
      delete obj[key]
    }
  }
  return JSON.parse(JSON.stringify(obj))
}
export const getDetaios = function (data) {
  data = JSON.parse(data)
  for (var i in data) {
    if (data[i] == null && i != 'token') {
      return true
    }
  }
  return false
}
export const createHash = function (hashLength: number) {
  if (!hashLength || typeof Number(hashLength) != 'number') {
    return
  }
  var ar = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ]
  var hs = []
  var hl = Number(hashLength)
  var al = ar.length
  for (var i = 0; i < hl; i++) {
    hs.push(ar[Math.floor(Math.random() * al)])
  }

  return hs.join('')
}

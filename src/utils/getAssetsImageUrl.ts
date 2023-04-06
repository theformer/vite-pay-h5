import pako from 'pako'
import md5 from 'js-md5'

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
export const unzip = function (binData: any) {
  return pako.ungzip(binData, {
    to: 'string'
  })
  //return pako.inflate(binData, { to: 'string' })
}
export const XorDec = function (msg, key) {
  const ml = (msg + '').length
  const kl = (key + '').length
  let pwd = ''
  for (let i = 0; i < ml; i++) {
    pwd += String.fromCharCode(msg[i].charCodeAt() ^ key[i % kl].charCodeAt())
  }
  return pwd
}
export const enc = function (decData: string) {
  const XorEncData = XorDec(decData, md5(localStorage.getItem('hash')))
  return zip(XorEncData)
}
export const zip = function (str: string | ArrayBuffer) {
  const binaryString = pako.gzip(str, {
    to: 'string'
  })
  return binaryString
}

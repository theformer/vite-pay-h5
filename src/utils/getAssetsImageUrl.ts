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

/**
 * 判断校验登录
 */
import { getDetaios } from '@/utils'

async function useAuthLogin() {
  const token = localStorage.getItem('token') || null
  const user = await getDetaios(localStorage.getItem('user') || null)
  return new Promise((resolve, reject) => {
    /*if (!token || user) {
      if (!token) {
        router.push('/login')
        reject('未登录')
      } else {
        emitter.emit('why', { flag: true })
        reject('未完善信息')
      }
    }*/
    resolve(token)
  })
}

export default useAuthLogin

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast } from 'vant'
import 'vant/es/toast/style'
import { RequestCancel } from './requestCancel'
import { responseConfig } from '@/utils'
interface requestConfig extends AxiosRequestConfig {
  loading?: boolean
}
const defaultConfig = {
  loadingTime: 100
}
class VAxios {
  private instance: AxiosInstance
  private loadingCount = 0
  private readonly loading: boolean
  constructor(options: requestConfig) {
    this.instance = axios.create(options)
    this.loading = options.loading ?? true
    this.setupInterceptors()
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<unknown, T>(config)
        .then((response) => {
          resolve(response)
        })
        .catch((error: unknown) => {
          reject(error)
        })
    })
  }

  private setupInterceptors() {
    const requestCancel = new RequestCancel()
    this.instance.interceptors.request.use(
      (config) => {
        // 如果有token 就携带tokon
        const token = window.localStorage.getItem('token') || ''
        if (token) {
          config.headers = {
            ...config.headers,
            token
          }
        }
        requestCancel.addPending(config)
        // loading
        this.loading && this.addLoadingCount()
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse<responseConfig>) => {
        requestCancel.removePending(response.config)
        console.log(response.data, '我杀发秘籍哦值')
        if (response.data.code == 0) {
          this.loading && this.removeLoadingCount()
          return response.data
        } else {
          console.log(response.data, '3333333')
          if (response.data.code == 503) {
            localStorage.removeItem('token')
            // Toast({
            //   message: '登录已过期,请重新登录',
            //   duration: 3000
            // })
            // router.push({
            //   path: '/login'
            // })
          } else {
            Toast({
              message: response.data.msg ?? '网络错误，请稍后再试',
              duration: 3000
            })
          }
          throw new Error(response.data.msg)
        }
      },
      (error) => {
        // 提示信息
        this.loading && this.removeLoadingCount()
        return Promise.reject(error)
      }
    )
  }

  addLoadingCount() {
    this.loadingCount++
    if (this.loadingCount === 1) {
      Toast.loading({
        message: '加载中...'
      })
    }
  }

  removeLoadingCount() {
    Promise.resolve().then(() => {
      this.loadingCount--
      if (this.loadingCount === 0) {
        setTimeout(() => {
          Toast.clear()
        }, defaultConfig.loadingTime)
      }
    })
  }
}

export default VAxios

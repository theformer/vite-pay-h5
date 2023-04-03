import VAxios from './request'
import { AxiosRequestConfig } from 'axios'

export interface responseConfig<T = unknown> {
  data: T
  code: number
  msg: string
  succ: boolean
  tc?: number
}

const vAxios = new VAxios({
  baseURL: process.env.VITE_BASE_URL,
  timeout: 10 * 1000
})

function request<T>(config: AxiosRequestConfig) {
  return vAxios.request<responseConfig<T>>(config)
}

function get<T>(url: string, params?: unknown) {
  return request<T>({
    url,
    method: 'get',
    params
  })
}

function post(url: string, data?: unknown) {
  return request<responseConfig>({
    url,
    method: 'post',
    data
  })
}
export default request
export { get, post }

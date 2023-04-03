import { ITemplateQuery } from '@/api/types/home'
import request from '../utils/request'

export const getTemplate = (data?: ITemplateQuery) => {
  return request({
    url: '/template',
    method: 'get',
    data: data
  })
}
//首页
export const getIndexList = (data?: ITemplateQuery) => {
  return request({
    url: '/api/index',
    method: 'get',
    data: data
  })
}
//搜索
export const getSearchList = (data?: any) => {
  return request({
    url: '/api/search',
    method: 'get',
    params: data
  })
}

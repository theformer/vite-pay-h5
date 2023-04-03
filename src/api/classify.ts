import request from '@/utils/request'
import { IArticleClassify, IClassifyList, IExpertDetail, IFileCount } from '@/api/types/classify'
// 学术综述列表
export const getArticleClassify = (data?: unknown) => {
  return request<IClassifyList>({
    url: '/api/articleClassify',
    method: 'get',
    params: data
  })
}
// 学术报告列表
export const getReportClassify = (data?: unknown) => {
  return request<IClassifyList>({
    url: '/api/reporterClassify',
    method: 'get',
    params: data
  })
}
// 学术专家列表
export const getExertClassify = (data?: unknown) => {
  return request<IClassifyList>({
    url: '/api/guestsClassify',
    method: 'get',
    params: data
  })
}
// 学术专家详情页面
export const getExertDetail = (data: { id: number }) => {
  return request<IExpertDetail>({
    url: '/api/guests',
    method: 'get',
    params: data
  })
}
// 学术综述详情页面
export const getOverviewDetail = (data: { id: number }) => {
  return request<IArticleClassify>({
    url: '/api/article',
    method: 'get',
    params: data
  })
}
// 学术报告详情页面
export const getReportDetail = (data: { id: number }) => {
  return request({
    url: '/api/reporter',
    method: 'get',
    params: data
  })
}
// 查询多少份文件
export const getFileCount = (data?: { annual?: number; meetingId?: string | number }) => {
  return request<IFileCount>({
    url: '/api/countTotal',
    method: 'get',
    params: data
  })
}

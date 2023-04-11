import request from '@/utils/request'
import { ComplaintCreate, ComplaintVideo, ConfigNode, QueryVideo, UserInfo } from '@/api/types/test'

export const updateUserInfo = (data: Partial<UserInfo>) => {
  return request({
    url: '/api/v1/node/register',
    method: 'post',
    data
  })
}
//读取节点配置
export const getConfigNode = (data: Partial<ConfigNode>) => {
  return request({
    url: '/api/v1/config/node/get',
    method: 'post',
    data
  })
}
//查找节点信息
export const getQueryNode = (data: Partial<ConfigNode>) => {
  return request({
    url: '/api/v1/node/query',
    method: 'post',
    data
  })
}
//查找节点视频
export const getQueryVideo = (data: Partial<QueryVideo>) => {
  return request({
    url: '/api/v1/node/queryVideo',
    method: 'post',
    data
  })
}
//查询投诉
export const getComplaintVideo = (data: Partial<ComplaintVideo>) => {
  return request({
    url: '/api/v1/complaint/node/query',
    method: 'post',
    data
  })
}
//创建投诉
export const getComplaintCreate = (data: Partial<ComplaintCreate>) => {
  return request({
    url: '/api/v1/complaint/create',
    method: 'post',
    data
  })
}

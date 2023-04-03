// 浏览记录-学术综述
import request from '@/utils/request'
import { ICommonPage } from '@/api/types/common'
import { IAdvice, IHistoryOverview, IUpdateUserInfo, IUserInfo } from '@/api/types/my'

export const getHistoryOverviewList = (data?: ICommonPage) => {
  return request<IHistoryOverview[]>({
    url: '/api/records1',
    method: 'get',
    params: data
  })
}
export const getUserInfo = () => {
  return request<IUserInfo>({
    url: '/api/userInfo',
    method: 'get'
  })
}
export const updateUserInfo = (data: Partial<IUpdateUserInfo>) => {
  return request({
    url: '/api/updateUser',
    method: 'post',
    data
  })
}
export const addMessage = (data: IAdvice) => {
  return request({
    url: '/api/addMessage',
    method: 'post',
    data
  })
}

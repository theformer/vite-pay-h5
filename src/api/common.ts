import request from '@/utils/request'
import { IMeeting } from '@/api/types/common'

export const getMeetingList = (data?: any) => {
  return request<IMeeting[]>({
    url: '/api/meeting',
    method: 'get',
    params: data
  })
}
export const getMeetingById = (data: { id: number }) => {
  return request<IMeeting[]>({
    url: '/api/meetingById',
    method: 'get',
    params: data
  })
}
//获取公告栏滚动条
// export const getRegister = (data: { id: number }) => {
//   return request<IMeeting[]>({
//     url: '/api/v1/node/register',
//     method: 'get',
//     params: data
//   })
// }

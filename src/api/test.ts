import request from '@/utils/request'
import { UserInfo } from '@/api/types/test'

export const updateUserInfo = (data: Partial<UserInfo>) => {
  return request({
    url: '/api/v1/node/register',
    method: 'post',
    data
  })
}

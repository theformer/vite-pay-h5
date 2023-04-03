import request from '../utils/request'
//获取验证按
export const getValidCode = (data?: unknown) => {
  return request({
    url: '/api/getValidCode',
    method: 'get',
    params: data
  })
}
//登入
export const h5Login = (data?: unknown) => {
  return request({
    url: '/api/h5Login',
    method: 'post',
    data
  })
}
//注册
export const register = (data?: unknown) => {
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}
//获取用户信息
export const getUserInfo = (data?: unknown) => {
  return request({
    url: '/api/userInfo',
    method: 'get',
    params: data
  })
}
//完善用户信息
export const updateUser = (data?: unknown) => {
  return request({
    url: '/api/updateUser',
    method: 'post',
    data
  })
}
//修改密码
export const updatePwd = (data?: unknown) => {
  return request({
    url: '/api/updatePwd',
    method: 'post',
    data
  })
}
//用户文档
export const getDocument = (data?: unknown) => {
  return request({
    url: '/api/document',
    method: 'get',
    params: data
  })
}

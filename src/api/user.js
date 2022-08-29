import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/token/',
    method: 'post',
    data
  })
}

export function refreshToken(data){
  return request ({
    url: '/token/refresh',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

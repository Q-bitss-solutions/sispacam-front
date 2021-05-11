import request from '@/utils/request'

export function login(data) {
  console.log('data')
  console.log(data)
  return request({
    url: '/check_user_pass/',
    method: 'post',
    data
  })
}

export function refreshToken(data){
  return request ({
    url: '/refreshToken',
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

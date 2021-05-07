import request from '@/utils/request'

export function getObras() {
    return request({
      url: '/api/v1/camino/',
      method: 'get'
    })
}
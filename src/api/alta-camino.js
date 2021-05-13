import request from '@/utils/request'



const querystring = require('querystring');


export function getEdos() {
    return request({
      url: '/estado/',
      method: 'get'
    })
}

export function getupdate(clave) {
    return request({
      url: '/camino/' + clave + '/' ,
      method: 'get',
    })
}

export function getMunicipios(cve_edo){
    return request({
        url: '/municipio/',
        method: 'get',
        params: {
            cve_agee:cve_edo
        }
    })    
}

export function generarId(data){
    return request({
        url: '/camino/',
        method: 'post',
        data  
    })  
}


export function getLocalidades(icveEdo, icveMun){
    return request({
        url: '/localidad/',
        method: 'get',
        params: {
            cve_agee: icveEdo,
            cve_agem: icveMun                                    
        }
    })
}

export function test(data){
    return request({
        url: '/posts',
        method: 'get',
        params: data
    })    
}

export function CaminoPut(data, clave){
    return request({
       url: '/camino/' + clave + '/update/',
       method: 'put',
       params: data

    })
}
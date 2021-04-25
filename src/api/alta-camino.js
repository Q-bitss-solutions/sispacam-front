import request from '@/utils/request'



const querystring = require('querystring');


export function getEdos() {
    return request({
      url: '/api/v1/estado/',
      method: 'get'
    })
}

export function getMunicipios(cve_edo){
    return request({
        url: '/api/v1/municipio/',
        method: 'get',
        params: {
            cve_agee:cve_edo
        }
    })    
}

export function generarId(data){
    return request({
        url: '/api/v1/camino/',
        method: 'post',
        data  
    })  
}




export function getLocalidades(icveEdo, icveMun){
    return request({
        url: '/api/v1/localidad/',
        method: 'get',
        params: {
            cve_agee: icveEdo,
            cve_agem: icveMun                                    
        }
    })
}
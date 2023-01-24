import request from '@/utils/request'

export function getEdos() {
    return request({
      url: '/estado/',
      method: 'get'
    })
}

export function getMunicipios(cve_edo){
    return request({
        url: '/municipio/',
        method: 'get',
        params: {
            estado:cve_edo
        }
    })    
}

export function getLocalidades(id_municipio){
    return request({
        url: '/localidades/',
        method: 'get',
        params: {
            municipio:id_municipio,                                   
        }
    })
}
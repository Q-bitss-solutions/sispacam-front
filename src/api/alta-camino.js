import request from '@/utils/request'



const querystring = require('querystring');

export function guardaRodamiento(data){
    //alert(JSON.stringify(data))
    return request({
        url: '/rodamientos/',
        method: 'post',
        data: data
    })
}
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
        data:data
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
       url: '/caminos/' + clave + '/update/',
       method: 'patch',
       data: data

    })
}

export function CreateBeneficiarioCamino(idCamino, data){
    return request({
        url: '/beneficiarios/',
        method:'post',
        data:data
    })
}

export function listBeneficiariosCamino(idCamino){
    return request({
        url:'/beneficiariosCamino/',
        method:'get',

    })
}
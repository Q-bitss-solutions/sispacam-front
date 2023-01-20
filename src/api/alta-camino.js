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
            estado:cve_edo
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

export function altaCamino(data){
    return request({
        url:'/caminos/',
        method:'post',
        data:data
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
        // url: '/beneficiariosCamino/',
        url:`/camino/${idCamino}/beneficiarios`,
        method:'post',
        data:data
    })
}

export function listBeneficiariosCamino(idCamino){
    return request({
        // Openshift
        url:`/camino/${idCamino}/beneficiarios`,
        // Json server mock
        // url:'/beneficiariosCamino/',
        method:'get',

    })
}

export function deleteBeneficiariosCamino(id){
    return request({
        url:`/camino/${idCamino}/beneficiarios`,
        method:'delete'
    })
}

export function listMetricasBeneficiario(idCamino){
    return request({
        url:`/camino/${idCamino}/metricas`,
        method:'get'
    })
}
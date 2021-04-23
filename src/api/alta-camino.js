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

export function generarId(iso,cve_edo,ciit,tipoCamino,nombreCamino,fLongitdTotal,fLongitdTotalAPavimentar,ubicacionCamino,caracteristicasCamino,beneficiosCamino){
    return request({
        url: '/api/v1/camino/',
        method: 'post',
        params: {
            iso:iso,
            cve_agee:cve_edo,
            estrategia_gobierno:ciit,
            tipoCamino:tipoCamino,
            nombre_camino:nombreCamino,
            longitud:fLongitdTotal,
            longitud_pavimentar:fLongitdTotalAPavimentar,
            ubicacion:ubicacionCamino,
            caracteristicas:caracteristicasCamino,
            beneficios:beneficiosCamino
        }
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
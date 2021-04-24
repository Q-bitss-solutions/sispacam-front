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

export function generarId(iso,cve_edo,ciit, tipoCamino,nombreCamino,
                            fLongitdTotal, fLongitdTotalAPavimentar,
                            ubicacionCamino, caracteristicasCamino,
                            beneficiosCamino){
const data = {
    'cve_agee': cve_edo.toString(),
    'estrategia_gobierno':'ciit',
    'tipo_camino': tipoCamino.toString(),
    'nombre_camino': nombreCamino,
    'longitud': fLongitdTotal.toString(),
    'longitud_pavimentar':fLongitdTotalAPavimentar.toString() ,
    'ubicacion': ubicacionCamino.toString(),
    'caracteristicas': caracteristicasCamino.toString(),
    'beneficios': beneficiosCamino.toString(),
    'iso': iso.toString()       
}                             
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
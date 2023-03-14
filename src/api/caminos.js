import request from '@/utils/request'

const ENDPOINT_CAMINO = '/caminos/'

export function getListaCaminos (params) {
  return request({
    url: ENDPOINT_CAMINO,
    method: 'get',
    params:params
  })
}

export function altaCamino(data){
  return request({
      url:ENDPOINT_CAMINO,
      method:'post',
      data:data
  })
}

export function getDetalleCamino(clave) {
  return request({
    url: ENDPOINT_CAMINO + clave ,
    method: 'get',
  })
}

export function editarCamino(clave,data){
  return request({
    url:ENDPOINT_CAMINO + clave,
    method:'patch',
    data:data,
  })
}



// A PARTIR DE AQUI ES CÓDIGO VIEJO
export function getCvepres(fecha) {
  return request({
    url: `/getCvepres/${fecha}/`,
    method: 'get'
  })
}

export function getSpago(fecha) {
    return request({
      url: `/getSpago/${fecha}/`,
      method: 'get'
    })
  }

  export function getMescons(fecha,mes,name) {
    let req=''
    if(name){
        req += 'name='+name  
    }
    if(mes){
        if(name){
            req += '&f_elab='+mes
        }else{
            req += 'f_elab='+mes 
        }
    }
    let url=''
    if(name || mes){
        url=`/getMescons/${fecha}/${req}/`
    }else{
        url = `/getMescons/${fecha}/`
    }  
    return request({
      url: url,
      method: 'get'
    })
  }

export function fetchRoadStatus() {
  return request({
    url: '/caminos/estatus/',
    method: 'GET',
  })
}
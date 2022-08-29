import request from '@/utils/request'

export function getObras() {
    return request({
      url: '/api/v1/camino/',
      method: 'get'
    })
}

export function getObraByClave(clave) {
  return request({
    url: `/camino/${clave}/`,
    method: 'get'
  })
}

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

export function getAllObras(){
  return request({
    url: '/camino/list/1/',
    method: 'get'
  })
}

export function getObraByParmas (params) {
  let req = 'cve_agee='+params.cve_agee
  req += params.caminos_originales?'&caminos_originales='+params.caminos_originales:''
  req += params.ciit?'&ciit='+params.ciit:''
  req += params.tren_maya?'&tren_maya='+params.tren_maya:''
  req += params.tipo_camino!=''?'&tipo_camino='+params.tipo_camino:''
  req += params.nombre_camino!=''?'&nombre_camino='+params.nombre_camino:''
  req += params.municipio!=''?'&municipio='+params.municipio:''
  req += params.marginacion!=''?'&marginacion='+params.marginacion:''
  req += params.poblacion_indigena!=''?'&poblacion_indigena='+params.poblacion_indigena:''

  return request({
    url: '/camino/list/params/'+req+'/410/',
    method: 'get'
  })
}

export function cancelarObra(clave, data) {
  return request({
    url: '/camino/status/'+ clave + '/',
    method: 'put',
    data:data,
    headers: { "Content-Type": "multipart/form-data" } 
  })
}

export function asignarUsuario(claveObra, usuario) {
  return request({
    url: '/camino/asignar/' + claveObra + '/' + usuario + '/',
    method: 'delete'
  })
}

export function getCaminoByClave(claveObra) {
    return request({
        url:'/camino/' + claveObra + '/',
        method: 'get'
    })
}

export function getObrasByUsuario(idUsuario){
  return request({
    url:'/camino/assig/' + idUsuario + '/',
    method: 'get'
  })
}

export function getResidentes(system, group) {
    return request({
        url: '/system_group_users/' + system + '/' +  group + '/',
        method: 'get'
    })
  }

export function reactivarObra(data){
  return request({
    url:'/justificar/',
    method:'post',
    data:data,
    headers: { "Content-Type": "multipart/form-data" } 
  })
}
import request from '@/utils/request'

export function getObras() {
    return request({
      url: '/api/v1/camino/',
      method: 'get'
    })
}


export function getObraByClave(clave) {
  return request({
    url: '/camino/list/'+clave+'/1/',
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
  console.log(params)
  console.log(typeof(params))
  console.log(params)
  let req = 'cve_agee='+params.cve_agee
  req += params.caminos_originales?'&caminos_originales='+params.caminos_originales:''
  req += params.ciit?'&ciit='+params.ciit:''
  req += params.tren_maya?'&tren_maya='+params.tren_maya:''
  req += params.tipo_camino!=''?'&tipo_camino='+params.tipo_camino:''
  req += params.nombre_camino!=''?'&nombre_camino='+params.nombre_camino:''
  req += params.municipio!=''?'&municipio='+params.municipio:''
  req += params.marginacion!=''?'&marginacion='+params.marginacion:''
  req += params.poblacion_indigena!=''?'&poblacion_indigena='+params.poblacion_indigena:''

  console.log(req)
  return request({
    url: '/camino/list/params/'+req+'/1/',
    method: 'get'
  })
}


export function cancelarObra(clave) {
  return request({
    url: '/camino/status/'+ clave + '/',
    method: 'delete'
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

export function getconvenio(id_camino) {
  return request({
    url:'/convenio/' + id_camino + '/',
    method: 'get'
  })
}



export function getObrasByUsuario(idUsuario){
  return request({
    url:'/camino/assig/' + idUsuario + '/',
    method: 'get'
  })
}

export function generarConvenio(data){
 console.log("recibe")
 console.log(data)
 
  const d={"anio":"2019","tramo":"tramo","monto":"1","origen":"1","meta":"1"}

  return request({

      url: '/convenio/' + '1' + '/',
      method: 'post',
      data:data,
      headers: { "Content-Type": "multipart/form-data" } 
  })  
}

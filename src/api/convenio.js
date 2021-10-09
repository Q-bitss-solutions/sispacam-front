import request from '@/utils/request'

export function getconvenio(id_camino) {
  return request({
    url:'/convenio/' + id_camino + '/',
    method: 'get'
  })
}
  
export function getlistaConvenio(clave) {
  return request({
    url: '/convenio/' +clave+ '/list/',
    method: 'get'
  })
}
  
export function updateConvenio(data,convenio_id ){
  return request({
    url:`/convenio/${convenio_id}/update/`,
    method:'patch',
    data
  })
}

export function generarConvenio(data, id_camino){
  return request({
      url:  `/convenio/${id_camino}/ `,
      method: 'post',
      data:data,
      headers: { "Content-Type": "multipart/form-data" } 
  })  
}
  
export function updateEstatus(clave, status) {
  return request({
    url: '/convenio/estatus/'+ clave + '/',
    method: 'patch',
    data:{
      estatus:status
    }
  })
}

export function getConvenios(id_camino){
  return request({
      url:  `/convenio/listado`,
      method: 'post',
      data:{
        id:id_camino
      },
  })  
}

export function createModificatorio(data){
  return request({
      url:  `/modificatorio/crear`,
      method: 'post',
      data:data,
      headers: { "Content-Type": "multipart/form-data" } 
  })  
}

export function getConvenioById(id_convenio){
  return request({
      url:  `/convenio/detalles`,
      method: 'post',
      data:{
        id:id_convenio
      }
  })  
}

export function bajaConvenio(id_convenio){
  return request({
      url:  `/convenio/bajar`,
      method: 'post',
      data:{
        id:id_convenio
      },
  })  
}

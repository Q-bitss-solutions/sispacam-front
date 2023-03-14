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
  console.log('data')
  console.log(data.get('avances'))
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

export function getConveniosGet(id_camino){
  return request({
      url:  `/convenio/${id_camino}/list/`,
      method: 'get',
  })
}

export function createModificatorio(data){
  return request({
      url:  `/modificatorio/crear`,
      method: 'post',
      data:data,      
      headers: { 
        'Accept': 'application/json',
        "Content-Type": "multipart/form-data"
      } 
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

export function searchBeneficiario(text){
  return request({
    url:`/beneficiary/search_by_bm/${text}/`,
    method: 'get',
  })
}

export function getCatMeses(){
  return request({
    url:'/mes/listado',
    method: 'get',
  })
}
export function updateBebeniciarioSia(beneficiario){
  console.log(beneficiario)
  return request({
    url:`/beneficiary/${beneficiario.id}/update/`,
    method: 'patch',
    data: {
      calle:beneficiario.calle,
      next:beneficiario.next,
      colonia:beneficiario.colonia,
      curp:beneficiario.curp,
      cp:beneficiario.cp,
      nombre_pm:beneficiario.nombre,
      primera_pm:beneficiario.papellido,
      segundoa_pm:beneficiario.sapellido
    }
  })
}

export function getEdadAndGenero(curp){
  return request({
    url:`/curp/${curp}/`,
    method: 'get'
  })

}

export function getAvanceConvenio(id_convenio){
  return request({
    url:'/convenio/avance',
    method: 'post',
    data:{
      id:id_convenio,
    }
  })
}

export function getBeneficiario(id_beneficiario){
  return request({
    url:`/beneficiary/datails/${id_beneficiario}/`,
    method: 'get'
  })
}

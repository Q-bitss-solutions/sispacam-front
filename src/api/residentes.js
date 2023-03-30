import request from '@/utils/request'

const ENDPOINT_RESIDENTE = '/residentes/'
const ENDPOINT_ASIGNACION = '/convenio/'

export function getListaResidentes() {
  return request({
    url: ENDPOINT_RESIDENTE,
    method: 'get',
  })
}

export function getDropdownResidentes() {
	return request({
	  url: ENDPOINT_RESIDENTE+'dropdown/',
	  method: 'get',
	})
  }
  

export function getResidentesAsignadosByConvenio(id_convenio){
  return request({
      url:ENDPOINT_ASIGNACION+id_convenio+ENDPOINT_RESIDENTE,
      method:'get',
  })
}

export function agregaAsignacionAConvenio(id_convenio, data){
	return request({
		url:ENDPOINT_ASIGNACION+id_convenio+ENDPOINT_RESIDENTE,
		method:'post',
		data:data
	})
}

export function updateAsignacionById(id_convenio, id_asignacion, data){
	return request({
		url:ENDPOINT_ASIGNACION+id_convenio+ENDPOINT_RESIDENTE+id_asignacion,
		method:'patch',
		data:data
	})
}

export function fetchAssignments(params) {
	return request({
    url: `residentes/asignaciones/`,
    method: 'get',
		params,
  })
}

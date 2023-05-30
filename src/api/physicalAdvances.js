import request from '@/utils/request'
import { mapPhysicalAdvancePayload } from '@/utils/payloadMappers'

export function storePhysicalAdvanceToAssignment({ assignmentId, physicalAdvance }){
	return request({
		url: `/asignaciones/${assignmentId}/avance-fisico/`,
		method: 'POST',
		data: mapPhysicalAdvancePayload(physicalAdvance)
	})
}

export function fetchPhysicalAdvanceById(physicalAdvanceId){
	return request({
		url: `/avance-fisico/${physicalAdvanceId}/`,
		method: 'GET',
	})
}

export function putPhysicalAdvance({ physicalAdvance, physicalAdvanceId }){
	return request({
		url: `/avance-fisico/${physicalAdvanceId}/`,
		method: 'PUT',
		data: mapPhysicalAdvancePayload(physicalAdvance)
	})
}

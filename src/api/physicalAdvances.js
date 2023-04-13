import request from '@/utils/request'
import { mapPhysicalAdvancePayload } from '@/utils/payloadMappers'

export function storePhysicalAdvanceToAssignment({ assignmentId, physicalAdvance }){
	return request({
		url: `/avance-fisico/${assignmentId}/`,
		method: 'POST',
		data: mapPhysicalAdvancePayload(physicalAdvance)
	})
}

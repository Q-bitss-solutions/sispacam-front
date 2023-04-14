import request from '@/utils/request'

export function fetchAssignmentById(assignmentId){
	return request({
		url: `/residentes/asignaciones/${assignmentId}/`,
		method: 'GET',
	})
}

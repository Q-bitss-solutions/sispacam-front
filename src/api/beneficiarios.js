import request from '@/utils/request'

const ENDPOINT_CAMINO = '/caminos/'

export function createBeneficiarioCamino(idCamino, data){
    return request({
        // url: '/beneficiariosCamino/',
        url:`${ENDPOINT_CAMINO}${idCamino}/beneficiarios`,
        method:'post',
        data:data
    })
}

export function listBeneficiariosCamino(idCamino){
    return request({
        // Openshift
        url:`${ENDPOINT_CAMINO}${idCamino}/beneficiarios`,
        // Json server mock
        // url:'/beneficiariosCamino/',
        method:'get',

    })
}

export function deleteBeneficiariosCamino(id){
    return request({
        url:`${ENDPOINT_CAMINO}${idCamino}/beneficiarios`,
        method:'delete'
    })
}

export function listMetricasBeneficiario(idCamino){
    return request({
        url:`${ENDPOINT_CAMINO}${idCamino}/metricas`,
        method:'get'
    })
}

export function getBeneficiariosDropdown(idCamino){
    return request({
        url:`${ENDPOINT_CAMINO}${idCamino}/beneficiarios/dropdown`,
        method:'get'
    })
}

export function getRepresentatives(convenioId = null){
    return request({
        url:`representantes/?convenio_id=${convenioId}`,
        method:'get'
    })
}

export function updateRepresentative(representative){
    return request({
        url:`representantes/${representative.id}`,
        method:'PATCH',
        data: representative,
    })
}

export function storeRepresentative(representative){
    return request({
        url:`representantes/`,
        method:'POST',
        data: representative,
    })
}

export function deleteBeneficiariosCaminoLogico(id_beneficiario){
    return request({
        url:`${ENDPOINT_CAMINO}beneficiarios/${id_beneficiario}/`,
        method:'delete'
    })
}
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
import request from '@/utils/request'


export function savePresupuesto(data) {
    return request ({
        url:'/presupuesto/real/',
        method:'post',
        data:{ detalle: data}
    })
}


export function getPresupuestoBaseByAncho(id_ancho){
    return request ({
        url:'/presupuesto/base/',
        method: 'get',
        params: { ancho_camino:id_ancho }
    })
}

export function filterPresupuestoBase(data){
    return request ({
        url:'/presupuesto/clonar',
        method: 'post',
        data: data
    })
}

export function ModificarmPresupuestoBase(data){
    return request ({
        url:'/presupuesto/multiple/',
        method: 'post',
        data: {"presupuestos":[data]}
    })
}

export function getAnchoCamino(){
    return request ({
        url:'/ancho/camino',
        method: 'get'
    })
}

export function getPresupuestoRealByIdConvenio(id_convenio){

    return request ({
        url: `presupuesto/real/${id_convenio}/`,
        method: 'get',
    })
}

export function updatePresupuesto(id_convenio, data){
    return request ({
        url:`/presupuesto/real/${id_convenio}/`,
        method: 'put',
        data: { detalle: data }
    })   
}

export function updateConcepto(id_convenio, data){
    return request ({
        url:`/conceptos/base/${id_convenio}`,
        method: 'put',
        data: data
    })   
}
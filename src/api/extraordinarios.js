import request from '@/utils/request'

//catalogo
export function getAllExtraordinarios(data) {
    return request ({
        url:'/partidas/extraordinarias/list',
        method:'get',
    })
}

export function saveExtraordinarios(data) {
    return request ({
        url:'/convenio/conceptos/extraordinarios/insert',
        method:'post',
        data
    })
}

export function getExtraordinariosByIdConvenio(id) {
    return request ({
        url:`/convenio/conceptos/extraordinarios/?convenio=${id}`,
        method:'get',
    })
}

export function deleteExtraordinario(id){
    return request ({
        url: `/convenio/conceptos/extraordinarios/delete/${id}/`,
        method: 'delete',
    })
}

export function updateExtraordinario({ id, cantidad }) {
    return request ({
        url: `/convenio/conceptos/extraordinarios/update/${id}/`,
        method: 'put',
        data: {
            cantidad: cantidad
        }
    })
}

export function getExtraordinariosLibres(id) {
    return request ({
        url:'/partidas/libres',
        method:'get',
    })
}

//create or update
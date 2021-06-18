import request from '@/utils/request'

//catalogo
export function getAllExtraordinarios(data) {
    return request ({
        url:'/partidas/extraordinarias/',
        method:'get',
    })
}

export function saveExtraordinarios(data) {
    console.log('saveExtraordinarios')
    console.log(data)
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

//create or update
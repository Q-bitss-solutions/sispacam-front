import request from '@/utils/request'


export function getAllExtraordinarios(data) {
    return request ({
        url:'/partidas/extraordinarias/list',
        method:'get',
    })
}

export function getUnidadMedida(){
    return request({
        url:'/unidad/',
        method: 'GET',        
    })
}

export function getConceptos(){
    return request({
        url:'/conceptos',
        method: 'GET',        
    })
}
//edit
export function editPartida(partida){
    return request({
        url:`/partidas/extraordinarias/${partida.id}/`,
        method:'PUT',
        data:partida,
    })
}

export function createPartida(data){
    return request({
        url:'/partidas/extraordinarias/',
        method:'post',
        data:data
    })
}

export function deletePartida(id){
    return request({
        url:`/partidas/extraordinarias/${id}/`,
        method:'delete',
    })
}
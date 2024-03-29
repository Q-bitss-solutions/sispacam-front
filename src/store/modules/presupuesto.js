export default {
    namespaced: true,
    state: {
        cancel:false,
        conceptos: [
            {
                codigo:'A',
                name:'TERRACERIAS',
                presupuesto:null                
            },
            {
                codigo:'B',
                name:'OBRAS DE DRENAJE Y ESTRUCTURAS',
                presupuesto:null
            },
            {
                codigo:'C',
                name:'SUPERFICIE DE RODAMIENTO',
                presupuesto:null
            },
            {
                codigo:'D',
                name:'SEÑALAMIENTO',
                presupuesto:null
            }
        ],
        conceptosExtraordinarios: {
                codigo:'F',
                name:'PRECIOS EXTRAORDINARIOS',
                presupuesto:[]
            }
    },
    mutations: {
        setVisibleTerracerias (state, isVisible) {
            state.conceptos.terracerias.visible = isVisible
        },
        setPresupuesto (state, { presupuesto, codigo }) {              
            state.conceptos.map( ( item ) => {
                if(item.codigo == codigo){            
                    item.presupuesto = presupuesto
                }
            })
        },
        setPresupuestoExtraOrdinario (state, { presupuesto }) {              
            state.conceptosExtraordinarios.presupuesto = presupuesto
        },        
        cancel (state, cancel ) {
            state.cancel = cancel
        }
    },
    getters: {
        getPresupuestoByName:  (state) => true
    }
}
<template>
<Modal 
    v-model="isShowModal" 
    title="Partidas Extraordinarias" 
    :modal-class="`modal1 ${modal_xl}`"
    wrapper-class="modal-wrapper"
    :enable-close="enableClose"
    @before-open="beforeOpen"
>
    <div class="modal-body">
        <div class="row">
            <div class="col-md-12">
                <grid 
                    :auto-width="true"
                    :width="width"
                    :cols="cols" 
                    :rows="rows"            
                    :search="true"   
                    :language="language" 
                    :class-names="className"
                >
                </grid>
            </div>
        </div>   

        <div class="row">
            <div class="col-md-12 text-right">
            <hr />
            <button @click="closeModal" type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>         
    </div> 
</Modal>

</template>

<script>
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import {Grid  } from 'gridjs-vue'
import { h } from "gridjs";
import bodyScroll from 'body-scroll-freezer'
import { getAllExtraordinarios }  from '@/api/extraordinarios'


export default {
    name:'modalExtraordinarios',
    components: {
        'Modal': VueModal,
        Grid
    },
    props: {
        showModal:{
            type: Boolean,
            default: false
        },
        loadedExtraordinarios: {
            type:Array,
            default:[]
        }
    },
    data() {
        return {
            width:'100%',
            enableClose: false,
            modal_xl:'modal-xl',
            language: {
                'search': {
                    'placeholder': 'Buscar...'
                },
                'pagination': {
                    'previous': '⬅️',
                    'next': '➡️',
                    'showing': 'Mostrando de',
                    'results': () => 'Resultados',
                    of: 'de',
                    to: 'a',                
                },
                loading: 'Crgandoa...',
                noRecordsFound: 'No hay conceptos para agregar',
                error: 'Ocurrio un error al obtener los datos',
            },
            pagination: {
                limit: 20
            },
            cols: [
                { 
                    id:'id',
                    name: 'ID',
                    hidden: true
                },
                {
                    id:'descripcion',
                    name:'Concepto',
                }, 
                {
                    data: (row) => row.unidad_medida.id,
                    //id:'unidad_medida.codigo',
                    name:'id_unidad',
                    hidden: true
                },                   
                {
                    data: (row) => row.unidad_medida.codigo,
                    //id:'unidad_medida.codigo',
                    name:'Unidad',
                },    
                {
                    id:'importe',
                    name:'Precio Unitario',
                    formatter: (_, row) => `$${(Number(row.cells[4].data)).toLocaleString(
                        'en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}
                            )}`
                },                                               
                {
                    name: 'Acciones',
                    formatter: (cell, row) => {
                        return h('button', {
                            className: 'btn btn-primary btn-sm',
                            onClick: ()  => this.addExtraordinario(row)
                        }, 'Agregar');
                        }
                },                                
            ],
            rows: [
            ],
            className: {
                td: 'my-td-class',
                table: '' 
            },                                 
        }
    },
    methods:{
        //modal methods
        beforeOpen() {
            bodyScroll.freeze()
            this.populate()
            console.log('beforeOpen')
        },  
        beforeClose() {
            bodyScroll.unfreeze()
        },
        closeModal(){
            bodyScroll.unfreeze()
            this.$emit('update:showModal', false)
        },
        addExtraordinario(data){
            console.log('data')
            console.log(data.cells[0].data)
            const concept = {
                id:data.cells[0].data,
                concepto:data.cells[1].data,
                unidad:data.cells[2].data,
                cantidad_total:0.000001,                
                precio_unitario:data.cells[4].data,
                importe_total:0.0001,
                pp:0.00

            }
            this.beforeClose()
            this.$emit('addExtraordinario', concept)
            this.$emit('update:showModal', false)
        },
        async populate(){
            let ids = []
            this.loadedExtraordinarios.map( i => ids.push(i.id))
            console.log('ids')
            console.log(ids)
            let { results } = await getAllExtraordinarios()
            console.log('data')
            console.log(results)
            results = results.filter( el => !ids.includes(el.id) )
            console.log(results)
            this.rows = results
        }
    },    
    computed:{
        isShowModal() {
             return  this.showModal         
        }
    },
    mounted() {
        bodyScroll.init()               
    },    
}
</script>

<style>
.modal-wrapper {
  display: flex;
  align-items: center;
}
.modal-wrapper .vm {
  top: auto;
}

.modal1 {
  min-width: 300px;
}
@media (min-width: 480px) {
  .modal1.modal-sm {
    max-width: 300px;
  }
}
@media (min-width: 992px) {
  .modal1.modal-lg,
  .modal1.modal-xl {
    max-width: 800px;
  }
}
@media (min-width: 1200px) {
  .modal1.modal-xl {
    max-width: 1140px;
  }
}
.modal1-footer {
  padding: 15px 0px 0px 0px;
  border-top: 1px solid #e5e5e5;
  margin-left: -14px;
  margin-right: -14px;
}
.gridjs-td {
    font-size: 14px;
}

.vm-titlebar {
    background-color: #393C3E;
    color: #fff;
    text-align: center;    
}

.vm-title {
    font-size: 20px !important;
}

td.gridjs-td {background-color:  transparent !important;}
tr.gridjs-tr:hover {background-color:#f5f5f5;}
</style>
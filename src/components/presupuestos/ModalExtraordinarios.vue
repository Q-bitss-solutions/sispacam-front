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
                        :pagination="pagination"
                        height="250px"
                        :fixedHeader="fixedHeader"
                    >
                    </grid>
                </div>
            </div>   

            <div class="row">
                <div class="col-md-6 text-left">
                <hr />
                <button @click="showAdminCatalogo" type="button" class="btn btn-default">Administrar Catalogo</button>
                </div>            
                <div class="col-md-6 text-right">
                <hr />
                <button @click="closeModal" type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>         
        </div> 
        <adminExtraordinarios
            @reloadGrid="populate"
            ref="modalAdmPartidas"
        />
    </Modal>
</template>

<script>
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import {Grid  } from 'gridjs-vue'
import { Loading } from 'element-ui';
import { h } from "gridjs";
import bodyScroll from 'body-scroll-freezer'
import adminExtraordinarios from '@/components/Modals/AdminPartidas'
import { getAllExtraordinarios }  from '@/api/catalogo_pe'


export default {
    name:'modalExtraordinarios',
    components: {
        'Modal': VueModal,
        adminExtraordinarios,
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
            pagination: {
                limit: 5
            },
            fixedHeader:true,
            showSecondModal: false,
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
                loading: 'Cargando...',
                noRecordsFound: 'No hay conceptos para agregar',
                error: 'Ocurrio un error al obtener los datos',
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
        },  
        beforeClose() {
            bodyScroll.unfreeze()
        },
        closeModal(){
            bodyScroll.unfreeze()
            this.$emit('update:showModal', false)
        },
        addExtraordinario(data){
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
            let loadingInstance = Loading.service({ fullscreen: true, lock: true });
            let ids = []
            this.loadedExtraordinarios.map( i => ids.push(i.id))
            let { results } = await getAllExtraordinarios().finally(_=>{
                loadingInstance.close();        
            })
            results = results.filter( el => !ids.includes(el.id) )
            this.rows = results
        },
        showAdminCatalogo(){
            this.$refs.modalAdmPartidas.showAdminCatalogo(this.loadedExtraordinarios)
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
    font-size: 13px;
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

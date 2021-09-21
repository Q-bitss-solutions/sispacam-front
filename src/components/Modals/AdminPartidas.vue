<template>
    <div>
        <Modal 
            title="Administración catalogo Partidas Extraordinarias" 
            :modal-class="`modal2 ${modal_xl}`"
            wrapper-class="modal-wrapper"
            :enable-close="false"
            @before-open="beforeOpen"      
            @before-close="beforeClose"      
            v-model="showAdminModalPartidas" 
        >
            <div>
                <div>
                    <div class="col-md-12">
                        <grid 
                            :auto-width="true"
                            :width="width"
                            :cols="cols" 
                            :rows="rows"            
                            :search="true"   
                            :language="language" 
                            :class-names="className"
                            fixedHeader
                            :pagination="pagination"
                            height="250px"

                        >
                        </grid>
                    </div>
                </div>   
                <div class="row"> 
                    <div class="col-md-6 text-left">
                        <hr />
                        <button @click="openModalNewElement" type="button" class="btn btn-default" data-dismiss="modal">Nueva Partida</button>
                    </div>                        
                    <div class="col-md-6 text-right">
                        <hr />
                        <button @click="closeModal" type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>     
            </div>
        </Modal>
        <!--EDIT FORM-->
        <Modal
            title="Edición Partida" 
            :enable-close="false"
            v-model="showAdminModalEdit" 
        >
            <form>
                <div class="form-group">
                    <label for="concepto">Concepto:</label>
                    <textarea 
                        id="concepto" 
                        rows="6" 
                        maxlength="500"
                        style="font-size: 12px;"
                        class="form-control text-justify" 
                        placeholder="Capturar el Concepto" 
                        v-model="formEditPartida.descripcion" 
                    />
                    <div class="row col-md-12">
                        <small v-if="!$v.formEditPartida.descripcion.required" class="form-text form-text-error">
                             Este campo es obligatorio
                        </small>
                    </div>                  
                </div>
                <div class="form-group">
                    <label for="unidad">Unidad:</label>
                    <select 
                        id="unidad" 
                        class="form-control" 
                        v-model="formEditPartida.unidad_medida"
                    >
                        <option v-for="(unidad, index) in unidad_medida" :key="index" :value="unidad.id">
                            {{ unidad.codigo }}
                        </option>
                    </select>
                    <div class="row col-md-12">
                        <small v-if="!$v.formEditPartida.unidad_medida.required" class="form-text form-text-error">
                             Este campo es obligatorio
                        </small>
                    </div>                     
                </div>  
                <div class="form-group">
                    <label for="precio">Precio Unitario:</label>
                    <br>    
                    <vue-numeric 
                        currency="$"
                        name="precio"
                        id="unitario"
                        v-bind:precision="2" 
                        separator="," 
                        currency-symbol-position="preffix" 
                        v-model="formEditPartida.importe"
                    >
                    </vue-numeric> 
                    <div class="row col-md-12">
                        <small v-if="!$v.formEditPartida.importe.minValue" 
                            class="form-text form-text-error">
                             Este campo es obligatorio
                        </small>
                    </div>                                       
                </div>                          
                <div class="row modal-footer">
                    <div class="col-md-6">
                        <div class="float-left">
                            <button class="btn btn-default active" type="button" @click="showAdminModalEdit = false">Cancelar</button>
                        </div>
                    </div>                    
                    <div class="col-md-6">
                        <div class="float-right">
                            <button class="btn btn-primary active" type="button" @click="saveEdit">Guardar</button>
                        </div>
                    </div>
                </div>                
            </form>

        </Modal>
        <!--NEW FORM-->
        <Modal
            title="Creación Partida"       
            v-model="showAdminModalNew" 
            @before-open="beforeOpenNew"   
        >
            
            <form>
                <div class="form-group">
                    <label for="concepto">Concepto:</label>
                    <textarea 
                        id="concepto" 
                        rows="6" 
                        maxlength="500"
                        style="font-size: 12px;"
                        class="form-control text-justify" 
                        placeholder="Capturar el Concepto" 
                        v-model="formNewPartida.descripcion" 
                    />
                    <div class="row col-md-12">
                        <small v-if="!$v.formNewPartida.descripcion.required" class="form-text form-text-error">
                             Este campo es obligatorio
                        </small>
                    </div>                  
                </div>
                <div class="form-group">
                    <label for="unidad">Unidad:</label>
                    <select 
                        id="unidad" 
                        class="form-control" 
                        v-model="formNewPartida.unidad_medida"
                    >
                        <option value="">Seleccionar... </option>
                        <option v-for="(unidad, index) in unidad_medida" :key="index" :value="unidad.id">
                            {{ unidad.codigo }}
                        </option>
                    </select>
                    <div class="row col-md-12">
                        <small v-if="!$v.formNewPartida.unidad_medida.required" class="form-text form-text-error">
                             Este campo es obligatorio
                        </small>
                    </div>                     
                </div>  
                <div class="form-group">
                    <label for="precio">Precio Unitario:</label>
                    <br>    
                    <vue-numeric 
                        currency="$"
                        name="precio"
                        id="unitario"
                        v-bind:precision="2" 
                        separator="," 
                        currency-symbol-position="preffix" 
                        v-model="formNewPartida.importe"
                    >
                    </vue-numeric> 
                    <div class="row col-md-12">
                        <small v-if="!$v.formNewPartida.importe.minValue" 
                            class="form-text form-text-error">
                             Este campo es obligatorio
                        </small>
                    </div>                                       
                </div>                          
                <div class="row modal-footer">
                    <div class="col-md-6">
                        <div class="float-left">
                            <button class="btn btn-default active" type="button" @click="showAdminModalNew = false">Cancelar</button>
                        </div>
                    </div>                    
                    <div class="col-md-6">
                        <div class="float-right">
                            <button class="btn btn-primary active" type="button" @click="saveNew">Guardar</button>
                        </div>
                    </div>
                </div>                
            </form>            


        </Modal>
     
    </div>
</template>

<script>

import Vue from 'vue'
import { h } from "gridjs";
import {Grid  } from 'gridjs-vue'
import Vuelidate from 'vuelidate'
import { Loading } from 'element-ui';
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import bodyScroll from 'body-scroll-freezer'
import { required, minValue } from 'vuelidate/lib/validators'
import { getExtraordinariosLibres }  from '@/api/extraordinarios'
import { getUnidadMedida, editPartida, createPartida, deletePartida }  from '@/api/catalogo_pe'


Vue.use(Vuelidate)

    export default {
        name:'adminExtraordinarios',
        components: {
            'Modal': VueModal,
            Grid
        },
        data(){
            return {
                loadedExtraordinarios:[],
                showAdminModalPartidas:false,
                showAdminModalEdit:false,
                showAdminModalNew:false,                
                dialogVisible: false,
                unidad_medida:null,
                fixedHeader:true,
                formNewPartida:{
                    descripcion:'',
                    unidad_medida:null,
                    importe:0,
                    cantidad:0.00,
                },
                formEditPartida:{
                    id:null,
                    descripcion:'',
                    cantidad:0.00,
                    unidad_medida:null,
                    importe:0
                },  
                width:'95%',
                modal_lg:'modal-lg',   
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
                    loading: 'Cargando...',
                    noRecordsFound: 'No hay Partidas Extraordinarias libres',
                    error: 'Ocurrio un error al obtener los datos',
                },
                pagination: {
                    limit: 5
                },
                cols: [
                    { 
                        id:'id',
                        name: 'id',
                        hidden: true
                    },
                    {
                        width:'290px',
                        id:'descripcion',
                        name:'Concepto'
                    }, 
                    {
                        data: (row) => row.unidad_medida['id'],
                        //id:'unidad_medida.codigo',
                        name:'id_unidad',
                        hidden: true
                    },                   
                    {
                        width:'112px',
                        data: (row) => row.unidad_medida['codigo'],
                        //id:'unidad_medida.codigo',
                        name:'Unidad'
                    },    
                    {
                        width:'112px',
                        id:'importe',
                        name:'Precio Unitario',
                        formatter: (_, row) => `$${(Number(row.cells[4].data)).toLocaleString(
                            undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}
                                )}`
                    },                                               
                    {
                        name: 'Editar',
                        formatter: (cell, row) => {
                            return h('button', {
                                className: 'btn btn-primary btn-sm glyphicon glyphicon-edit',
                                onClick: ()  => this.editar(row)
                            }, '');
                        }

                    },  
                    {
                        name: 'Eliminar',
                        formatter: (cell, row) => {
                            return h('button', {
                                className: 'btn btn-primary btn-sm glyphicon glyphicon-remove-circle',
                                onClick: ()  => this.confirmDelete(row)
                            }, '');
                        }
                        
                    },                                                   
                ], 
                rows: [
                ],
                className: {
                    td: 'admin-td-class text-justify',
                    table: '' 
                },                                                
            }
        },
        validations: {
            formNewPartida:{
                descripcion: { required },
                unidad_medida: { required },   
                importe:{
                    required,
                    minValue:minValue(0.01)
                }                                  
            },
            formEditPartida:{
                descripcion: { required },
                unidad_medida: { 
                    required,
                    minValue:minValue(1)
                },  
                importe:{
                    required,
                    minValue:minValue(0.01)
                }                 
            }                    
        },          
        methods: {
            showAdminCatalogo(partidasCargadas){   
                this.loadedExtraordinarios = partidasCargadas  
                this.populate()  
                this.showAdminModalPartidas = true
            },  
            closeModal(){
                bodyScroll.unfreeze()
                this.showAdminModalPartidas = false
            },            
            beforeOpenNew(){
                this.formNewPartida.unidad_medida = ''
            },
            async populate(){     
                if(loadingInstance)loadingInstance.close();
                let loadingInstance = Loading.service({ fullscreen: true, lock: true });
                this.rows = null
                let ids = []
                this.loadedExtraordinarios.map( i => ids.push(i.id))
                let results = await getExtraordinariosLibres().finally(() =>{
                    loadingInstance.close();
                })
                results = results.filter( el => !ids.includes(el.id) )
                this.rows = results
            },                    
            beforeOpen() {
                bodyScroll.freeze()

            }, 
            beforeClose() {
                bodyScroll.unfreeze()
                this.$emit("reloadGrid")
            },
            confirmDelete(element){

               this.$confirm('Se eliminará la partida, ¿Está seguro?','',{
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                    cancelButtonClass:'cancel-gob',
               })
                    .then(async _ => {
                        let loadingInstance = Loading.service({ fullscreen: true, lock: true });
                        await deletePartida(element.cells[0].data).finally(_ => {
                            loadingInstance.close();
                        })                        
                    }).finally(_ => {
                        this.showAdminModalPartidas = false
                    })
            },
            openModalNewElement(){
                this.formNewPartida.descripcion= ''
                this.formNewPartida.unidad_medida= null
                this.formNewPartida.importe= 0
                this.formNewPartida.cantidad= 0.00
                this.showAdminModalNew = true
            },
            editar(element) {
                this.formEditPartida.id = element.cells[0].data
                this.formEditPartida.descripcion = element.cells[1].data
                this.formEditPartida.unidad_medida = element.cells[2].data
                this.formEditPartida.importe = element.cells[4].data
                this.showAdminModalEdit = true
            },
            async saveEdit(){
                if(!this.$v.formEditPartida.$invalid){
                    let loadingInstance = Loading.service({ fullscreen: true, lock: true });
                    await editPartida(this.formEditPartida)
                    .then(async _=>{
                        await this.populate()
                        this.showAdminModalEdit = false
                    }).catch(_=>{
                        this.beforeOpen()
                        this.showAdminModalEdit = false
                    }).finally(()=>{
                        loadingInstance.close();
                    })                             
                }                
            },   
            async loadUM() {
                this.unidad_medida = await getUnidadMedida()
                this.formEditPartida.unidad_medida = 0
            },
            async saveNew(){
                if(!this.$v.formNewPartida.$invalid){  
                    let loadingInstance = Loading.service({ fullscreen: true, lock: true });
                    await createPartida(this.formNewPartida).then( async _ =>{
                        this.showAdminModalNew = false;
                        await this.populate()
                    }).catch(_ =>{       
                        this.showAdminModalNew = false;
                        console.log('error al crear partida')
                    }).finally( _ =>{
                        loadingInstance.close();
                    })                 
                }
            }
        },  
        filters: {
            upperCased: function (data) {
            let upper = [];
            data.split(" ").forEach((word) => {
                upper.push(word.toUpperCase());
            });
            return upper.join(" ");
            },
        },     
        watch:{
            'formEditPartida.descripcion':function (val){
                this.formEditPartida.descripcion = this.$options.filters.upperCased(val);
            },
            'formNewPartida.descripcion':function (val){
                this.formNewPartida.descripcion = this.$options.filters.upperCased(val);
            },            
            deep: true
        },           
        beforeMount() {
            this.loadUM()
            this.populate()
        }
}
</script>

<style>

.gridjs-td.admin-td-class {
    font-size: 12px;
}
.edit-text{
    font-size: 12px;
}

.float-left {
    text-align: left;
}

.modal-wrapper {
  display: flex;
  align-items: center;
}
.modal-wrapper .vm {
  top: auto;
}

.modal2 {
  min-width: 350px;
}
@media (min-width: 480px) {
  .modal2.modal-sm {
    max-width: 300px;
  }
}
@media (min-width: 992px) {
  .modal2.modal-lg,
  .modal2.modal-xl {
    max-width: 800px;
  }
}
@media (min-width: 1200px) {
  .modal2.modal-xl {
    max-width: 820px;
  }
}
.modal2-footer {
  padding: 15px 0px 0px 0px;
  border-top: 1px solid #e5e5e5;
  margin-left: -14px;
  margin-right: -14px;
}

.el-button--primary{
    color: #fff !important;
    background-color: #9D2449 !important;
    border-color: #9D2449 !important; 
}

.cancel-gob{
    color: #FFF !important;
    background-color: #6F7271 !important;
    border-color: #6F7271 !important;
}
</style>


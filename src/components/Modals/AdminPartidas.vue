<template>
    <div>
        <Modal 
            title="Administración catalogo Partidas Extraordinarias" 
            :modal-class="`modal1 ${modal_lg}`"
            wrapper-class="modal-dialog"
            :enable-close="false"
            @before-open="beforeOpen"      
            v-model="showAdminModalPartidas" 
        >
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <grid 
                            :auto-width="true"
                            width="100%"
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
                    <div class="col-md-6 text-left">
                        <hr />
                        <button @click="openModalNewElement" type="button" class="btn btn-default" data-dismiss="modal">Agregar Nueva Partida</button>
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
            title="Edición" 
            :enable-close="false"
            @before-open="beforeOpenEdit" 
            v-model="showAdminModalEdit" 
        >
            <form>
                <div class="form-group">
                    <label for="concepto">Concepto:</label>
                    <textarea 
                        id="concepto" 
                        rows="6" 
                        style="font-size: 12px;"
                        class="form-control text-justify" 
                        placeholder="Capturar el Concepto" 
                        v-model="formEditPartida.concepto" 
                    />
                    <div class="row col-md-12">
                        <small v-if="!$v.formEditPartida.concepto.required" class="form-text form-text-error">
                             Este campo es obligatorio
                        </small>
                    </div>                  
                </div>
                <div class="form-group">
                    <label for="unidad">Unidad:</label>
                    <select id="unidad" class="form-control" v-model="formEditPartida.unidad">
                        <option selected>Seleccionar...</option>
                        <option>...</option>
                    </select>
                    <div class="row col-md-12">
                        <small v-if="!$v.formEditPartida.unidad.required" class="form-text form-text-error">
                             Este campo es obligatorio
                        </small>
                    </div>                     
                </div>  
                <div class="form-group">
                    <label for="precio">Precio Unitario:</label>
                    <br>    
                    <vue-numeric 
                        name="precio"
                        id="unitario"
                        v-bind:precision="2" 
                        separator="," 
                        currency-symbol-position="suffix" 
                        v-model="formEditPartida.precio_unitario"
                    >
                    </vue-numeric> 
                    <div class="row col-md-12">
                        <small v-if="!$v.formEditPartida.precio_unitario.minValue" 
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
            title="Nuevo" 
            @before-open="beforeOpenNew"      
            v-model="showAdminModalNew" 
        >
            
        </Modal>
    </div>
</template>

<script>

import Vue from 'vue'
import { h } from "gridjs";
import {Grid  } from 'gridjs-vue'
import Vuelidate from 'vuelidate'
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import bodyScroll from 'body-scroll-freezer'
import { required, minValue } from 'vuelidate/lib/validators'
import { getAllExtraordinarios }  from '@/api/extraordinarios'

Vue.use(Vuelidate)

    export default {
        name:'adminExtraordinarios',
        components: {
            'Modal': VueModal,
            Grid
        },
        data(){
            return {
                currentEditPartida:null,
                formNewPartida:{
                    concepto:'',
                    unidad:null,
                    precio_unitario:0
                },
                formEditPartida:{
                    concepto:'',
                    uidad:null,
                    precio_unitario:0
                },               
                modal_lg:'modal-lg',           
                showAdminModalPartidas:false,
                showAdminModalEdit:false,
                showAdminModalNew:false,
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
                pagination: {
                    limit: 5
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
                            undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}
                                )}`
                    },                                               
                    {
                        name: 'Acciones',
                        formatter: (cell, row) => {
                            return h('button', {
                                className: 'btn btn-primary btn-sm',
                                onClick: ()  => this.editar(row)
                            }, 'Editar');
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
                concepto: { required },
                unidad: { required },   
                precio_unitario:{
                    required
                }                                  
            },
            formEditPartida:{
                concepto: { required },
                unidad: { 
                    required,
                    minValue:minValue(1)
                },  
                precio_unitario:{
                    required,
                    minValue:minValue(0.01)
                }                 
            }                    
        },          
        methods: {
            showAdminCatalogo(){             
                this.showAdminModalPartidas = true
            },  
            closeModal(){
                bodyScroll.unfreeze()
                this.showAdminModalPartidas = false
            },             
            async populate(){
                let ids = []
                let { results } = await getAllExtraordinarios()
                this.rows = results
            },                    
            beforeOpen() {
                bodyScroll.freeze()
                this.populate()
            }, 
            beforeClose() {
                bodyScroll.unfreeze()
            },
            openModalNewElement(){

            },
            beforeOpenEdit(){

            },
            beforeOpenNew(){

            },
            editar(element) {
                console.log('element')
                console.log(element)
                this.formEditPartida.concepto = element.cells[1].data
                this.formEditPartida.unidad = element.cells[3].data
                this.formEditPartida.precio_unitario = element.cells[4].data
                
                this.showAdminModalEdit = true
            },
            saveEdit(){
               //this.$v.$touch()
                console.log('$v')
                console.log(this.$v)                
            },           
        },  

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
</style>


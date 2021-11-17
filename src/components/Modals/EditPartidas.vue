<template>
    <div>
        <!--EDIT FORM-->
        <Modal
            title="Edición Partida" 
            :enable-close="false"
            v-model="showAdminModalEdit" 
        >
            <form>
                <div class="form-group">
                    <label for="unidad">Partida:</label>
                    <select 
                        id="unidad" 
                        class="form-control" 
                        v-model="formEditPartida.concepto"
                    >
                        <option v-for="(cons, index) in conceptos" :key="index" :value="cons.id">
                            {{ cons.descripcion }}
                        </option>
                    </select>
                    <div class="row col-md-12">
                        <small v-if="!$v.formEditPartida.concepto.required" class="form-text form-text-error">
                             Este campo es obligatorio
                        </small>
                    </div>
                </div>
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
import { getUnidadMedida, getConceptos }  from '@/api/catalogo_pe'
import {updateConcepto} from '@/api/presupuesto'

Vue.use(Vuelidate)

    export default {
        name:'adminExtraordinarios',
        components: {
            'Modal': VueModal,
            Grid
        },
        props:{catConceptos:null,fetchPresupuestoBase:null},
        data(){
            return {
                loadedExtraordinarios:[],
                showAdminModalPartidas:false,
                showAdminModalEdit:false,
                showAdminModalNew:false,
                dialogVisible: false,
                unidad_medida:null,
                fixedHeader:true,
                conceptos:[],
                formEditPartida:{
                    id:null,
                    descripcion:'',
                    cantidad:0.00,
                    unidad_medida:null,
                    concepto:0
                },  
                width:'95%',
                modal_lg:'modal-lg',
                modal_xl:'modal-xl',
                className: {
                    td: 'admin-td-class text-justify',
                    table: ''
                },
            }
        },
        validations: {
            formEditPartida:{
                descripcion: { required },
                concepto: { required },
                unidad_medida: { 
                    required,
                    minValue:minValue(1)
                }
               
            }
        },
        methods: {

            closeModal(){
                bodyScroll.unfreeze()
                this.showAdminModalPartidas = false
            },
            beforeOpenNew(){
                this.formNewPartida.unidad_medida = ''
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
            
            editar(element) {
                console.log(element)
                this.formEditPartida.id = element.partida.id
                this.formEditPartida.descripcion = element.partida.descripcion
                this.formEditPartida.unidad_medida = element.partida.unidadmedida.id
                this.formEditPartida.concepto = element.partida.concepto.id
                this.showAdminModalEdit = true
            },
            async saveEdit(){
                console.log(this.$v.formEditPartida)
                if(!this.$v.formEditPartida.$invalid){
                    let loadingInstance = Loading.service({ fullscreen: true, lock: true });
                    await updateConcepto(this.formEditPartida.id, this.formEditPartida)
                    .then(async _=>{
                       
                    }).catch(_=>{
                         console.log("error")
                    }).finally(()=>{
                      this.closeModal()
                      this.fetchPresupuestoBase()
                    loadingInstance.close();
                    })
                }
            },   
            async loadUM() {
                this.unidad_medida = await getUnidadMedida()
                this.conceptos = await getConceptos()
            },
       
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


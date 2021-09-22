<template>
    <div> 

        <button class="btn btn-primary btn-sm cancelObra" type="button" aria-label="Editar datos"
                data-toggle="modal"
                data-target="#mdlCancelarObra"
                @click="setId(data.clave)"
                :disabled="data.isCanceled"
                :title="!data.isCanceled==true?'':'Cancelar la Obra'"
                v-if="!data.isCanceled">
            <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
        </button>
        <button class="btn btn-primary btn-sm cancelObra" type="button" aria-label="Editar datos"
                data-toggle="modal"
                data-target="#mdlReactivarObra"
                :disabled="!data.isCanceled"
                :title="data.isCanceled==true?'Reactivar la Obra':''"
                v-if="data.isCanceled">
            <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        </button>
        
        <!--CANCELAR-->
        <div class="modal fade" ref="mdlCancelarObra" id="mdlCancelarObra" tabindex="-1" role="dialog" aria-labelledby="mdlCancelarObra"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Cancelación de Obra</h4>
                    </div>
                    <div class="modal-body">
                        <p>Escriba el motivo de cancelación</p>
                          <div class="form-group">
                            <textarea rows="3" maxlength="350" id="motivoCancelacion" class="form-control" value=""   
                                placeholder="Ingrese el motivo de la cancelación" v-model="motivoCancelacion">
                            </textarea>                    
                        </div>   
                        <div class="form-group">
                            <label class="control-label" for="file-01">Cargar archivo:</label>
                            <input id="file-motivo" type="file" @change="onFileSelected" accept=".pdf">
                        </div>                                             
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="cerrarCnclObra" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="CancelarObra(data.clave)">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <!--REACTIVAR-->
        <div class="modal fade" ref="mdlReactivarObra" id="mdlReactivarObra" tabindex="-1" role="dialog" aria-labelledby="mdlReactivarObra"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Reactivar Obra</h4>
                    </div>
                    <div class="modal-body text-left">
                        <p>Escriba la justificación de reactivación:</p>
                          <div class="form-group">
                            <textarea rows="3" maxlength="350" id="motivoCancelacion" class="form-control" value=""   
                                placeholder="Justificación de reactivación" v-model="formReactivar.motivoReactivacion">
                            </textarea>  
                            <small v-if="!$v.formReactivar.motivoReactivacion.required" class="form-text form-text-error">
                                Este campo es obligatorio
                            </small>                                              
                        </div>   
                        <div class="form-group text-left">
                            <label class="control-label" for="reactivacion">Cargar archivo:</label>
                            <input id="reactivacion" type="file" @change="onFileReactivacion" accept=".pdf">
                        </div>                                             
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="cerrarCnclObra" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="reactivar(data)">Guardar</button>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { Loading } from 'element-ui';
import { required } from 'vuelidate/lib/validators'
import { cancelarObra, reactivarObra } from '@/api/obras'

Vue.use(Vuelidate)

export default {
    name:'CancelaObra',
    data() { 
        return {      
            idReactivacion:null,       
            motivoCancelacion:'',
            id:null,
            data: { 
                data: {
                } 
            },
            formReactivar:{
                motivoReactivacion:null,
                file:null
            }   
        };
    },
    validations: {
        formReactivar: {
            motivoReactivacion:{
                required
            }
   
        }
    },
    methods:{
        async CancelarObra (myId){
            $(this.$refs['mdlCancelarObra']).modal('hide')
            let formData = new FormData();
            formData.append("motivoCancelacion", this.motivoCancelacion);  
            if(this.file){
                formData.append("archivo", this.file);
            }         
            const data = await cancelarObra(this.$store.state.cancel.id, formData)
            this.$parent.$parent.populate()
        },
        async reactivar(data){
            if(!this.$v.formReactivar.$invalid){ 
                let loadingInstance = Loading.service({ fullscreen: true, lock: true });
                let formData = new FormData();
                formData.append("justificacion", this.formReactivar.motivoReactivacion);  
                formData.append("direccion", 'reactivar');  
                formData.append("obra", data.id);  
                if(this.formReactivar.file){
                    formData.append("archivo", this.formReactivar.file);
                }  
                 this.$alert('La Obra se ha reactivado', '', {
                        confirmButtonText: 'Cerrar',
                    });                           
                await reactivarObra(formData)
                .then(_ => {
                    this.$alert('La Obra se ha reactivado', '', {
                        confirmButtonText: 'Cerrar',
                    });
                }).finally(_=>{
                    loadingInstance.close();
                })
            }    
        },        
        setId(clave) {
            this.$store.commit('setIdCancelacion', clave)            
        },        
        onFileSelected (event) {
            this.file = event.target.files[0];                               
        },    
        onFileReactivacion (event) {
            this.formReactivar.file = event.target.files[0];                               
        },              
    }
    
}
</script>

<style scoped>

</style>
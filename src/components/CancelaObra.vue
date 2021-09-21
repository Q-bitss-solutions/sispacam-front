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
                @click="setId(data.clave)"
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
                                placeholder="Justificación de reactivación" v-model="motivoCancelacion">
                            </textarea>                    
                        </div>   
                        <div class="form-group text-left">
                            <label class="control-label" for="reactivacion">Cargar archivo:</label>
                            <input id="reactivacion" type="file" @change="onFileSelected" accept=".pdf">
                        </div>                                             
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="cerrarCnclObra" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="reactivar(data.clave)">Guardar</button>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
import { cancelarObra, } from '@/api/obras'

export default {
    name:'CancelaObra',
    data() { 
        return {             
            motivoCancelacion:'',
            id:null,
            data: { 
                data: {

                } 
            }             
        };
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
        async reactivar(){

        },        
        setId(clave) {
            this.$store.commit('setIdCancelacion', clave)            
        },
        setIdActivacion(clave) {
            this.$store.commit('setIdReactivacion', clave)            
        },        
        onFileSelected (event) {
            this.file = event.target.files[0];                               
        },      
    }
    
}
</script>

<style scoped>

</style>
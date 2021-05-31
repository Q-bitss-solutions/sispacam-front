<template>
    <div> 
        <button class="btn btn-primary btn-sm cancelObra" type="button" aria-label="Editar datos"
                data-toggle="modal"
                data-target="#mdlCancelarObra"
                @click="setId(data.clave)"
                :disabled="data.isCanceled"
                :title="data.isCanceled==true?'El registro esta cancelado':''"
                >
            <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
        </button>
        <div class="modal fade" ref="mdlCancelarObra" id="mdlCancelarObra" tabindex="-1" role="dialog" aria-labelledby="mdlCancelarObra"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Canelación de Obra</h4>
                    </div>
                    <div class="modal-body">
                        <p>Escriba el motivo de cancelación</p>
                          <div class="form-group">
                            <textarea rows="3" maxlength="350" id="motivoCancelacion" class="form-control" value=""   
                                placeholder="Ingrese el motivo de la canelación" v-model="motivoCancelacion">
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
    </div>
</template>

<script>
import { cancelarObra } from '@/api/obras'

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
            console.log(data)
            console.log(this.$parent.$parent.populate())
            const r = this.$parent.$parent.$refs.grid.refresh
            r.refresh
        },
        setId(clave) {
            console.log(clave)
            this.$store.commit('setIdCancelacion', clave)            
        },
        onFileSelected (event) {
            this.file = event.target.files[0];                               
        },        
    }
    
}
</script>

<style scoped>

</style>
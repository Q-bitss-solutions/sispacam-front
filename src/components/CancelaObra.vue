<template>
    <div>
        <button class="btn btn-primary btn-sm cancelObra" type="button" aria-label="Editar datos"
                data-toggle="modal"
                data-target="#mdlCancelarObra"
                @click="setId(data.id)"
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
                            <input id="file-motivo" type="file">
                        </div>                                             
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="cerrarCnclObra" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="CancelarObra(data.id)">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
        CancelarObra (myId){
            $(this.$refs['mdlCancelarObra']).modal('hide')
        },
        setId(id) {
            this.$store.commit('setIdCancelacion', id)            
        }
    }
    
}
</script>

<style scoped>

</style>
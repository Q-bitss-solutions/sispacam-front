<template>
<div>

<!-- MODAL -->
<div class="modal fade" 
    id="save" tabindex="-1" 
    role="dialog" 
    aria-labelledby="addConcept"
    aria-hidden="true"
    data-keyboard="false" data-backdrop="static"
    >
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Aviso del Sistema</h4>
            </div>
            <div class="modal-body">
                <p>Se guardaron correctamente los datos del presupuesto</p>
            </div>
            <div class="modal-footer">
                <button 
                    @click="reload" 
                    type="button" 
                    class="btn btn-default" data-dismiss="modal">Cerrar
                    </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->   

<div class="modal fade" 
    refs="modal-error"
    tabindex="-1" 
    role="dialog" 
    aria-labelledby="myLargeModalLabel" 
    aria-hidden="true" 
    id="Error">
    <div class="modal-dialog alert-danger">
        <div class="modal-content">
        <div class="modal-body">
            <div class="col-md-12 text-center">
            <p><strong>ERROR</strong></p>
            <p> {{  msg_error }}</p>
            </div>
            <div class="row">
            <div class="col-md-12 text-center small-top-buffer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</div>
</div>

</template>

<script>
export default {
    name:'ModalError',    
    data () {
        return {
            msg_error:''  
        }
    },
    methods: {
        openmodal(error){
          console.log("openmodal")
          this.msg_error = error
          //$('#save').modal('show')
          $('#Error').modal('show')
        },
        reload(){
            console.log('reload')
            this.$emit('cancel')
        }        
    }
}
</script>

<style scoped>
.alert-danger {
    color: #D0021B;
}
</style>
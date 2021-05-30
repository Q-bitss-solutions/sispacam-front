<template>
    <div> 
        <button class="btn btn-primary btn-sm cancelConvenio" type="button" aria-label="Editar datos"
                data-toggle="modal"
                data-target="#mdlCancelarConvenio"
                @click="setId(data.id)"
                :disabled="data.isCanceled"
                :title="data.isCanceled==true?'El registro esta cancelado':''"
                >
            <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
        </button>
  
    </div>
</template>

<script>


export default {
    name:'CancelarConvenio',
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
        
        setId(clave) {
            console.log("setid")
            console.log(clave)
            this.$store.commit('setIdCancelacionConvenio', clave)            
        }
    }
    
}
</script>

<style scoped>

</style>
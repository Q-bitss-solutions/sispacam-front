<template>
<div>
        <button 
            v-if="!data.isCanceled"
            class="btn btn-primary btn-sm editObra" 
            type="button" 
            aria-label="Editar datos"
            @click="toAF" 
            :disabled="data.isCanceled"             
            :title="data.isCanceled==true?'El registro esta cancelado':''">
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
        </button>
        <!-- <button 
            v-if="data.isCanceled"
            class="btn btn-primary btn-sm editObra" 
            type="button" 
            aria-label="Ver"
            @click="toVer"
            :disabled="!data.isCanceled"
            :title="data.isCanceled==true?'Ver Obra':''">
            <span 
                class="glyphicon glyphicon-eye-open" 
                aria-hidden="true"></span>
        </button>   -->      
</div>
</template>

<script>
export default {
    name:'ButtonGridAF',
    data() { 
        return { 
            data: { 
                data: {

                } 
            } 
        };
    },
    methods:{
        toAF () {
            this.$store.commit('setStatusCamino', this.data.isCanceled)   
            this.$router.push('/editAF/'+this.data.clave)
        },
        
        
    },
    computed: {
        cData: function() {
            return this.data
        }     
    },
    created() {
    }      
}
</script>

<style scoped>

</style>
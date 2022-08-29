<template>
<div>
        <button 
            v-if="!data.isCanceled"
            class="btn btn-primary btn-sm editObra" 
            type="button" 
            aria-label="Editar datos"
            @click="toEdit" 
            :disabled="data.isCanceled"             
            :title="data.isCanceled==true?'El registro esta cancelado':''">
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
        </button>
        <button 
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
        </button>        
</div>
</template>

<script>
export default {
    name:'ButtonGrid',
    data() { 
        return { 
            data: { 
                data: {

                } 
            } 
        };
    },
    methods:{
        toEdit () {
            this.$store.commit('setStatusCamino', this.data.isCanceled)   
            this.$router.push('/editcamino/'+this.data.clave)
        },
        toVer(){
            this.$store.commit('setStatusCamino', this.data.isCanceled) 
            this.$router.push({
                path:'/editcamino/'+this.data.clave,
                name:'AltaCaminoEdit',
                params: { isCanceled:true, obraId:this.data.clave }
                })
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
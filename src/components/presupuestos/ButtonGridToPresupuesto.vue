<template>
<div>
        <button class="btn btn-primary btn-sm" type="button" aria-label="Presupuesto"
                @click="toPresupuesto(data)">
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
        </button>
</div>
</template>

<script>
export default {
    name:'ButtonGridToPresupuesto',
    data() { 
        return { 
            data: { 
                data: {

                } 
            } 
        }
    },
    methods:{
        toPresupuesto (data) {
            console.log('toPresupuesto')
            console.log(data)
            //:obraId/:anio/:anchoId
            console.log('this.$route.params.obraId')
            console.log(data.id)
            this.$store.commit('setIdConcevenio', data.id)  
            this.$router.push(`/presupuesto/${this.$route.params.obraId}/${data.anio}/${this.$store.state.camino.ancho}/${data.id}/${data.meta}/`)        
        }
    }     
}
</script>

<style scoped>

</style>
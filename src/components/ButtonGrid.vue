<template>
<div>
        <button class="btn btn-primary btn-sm editObra" type="button" aria-label="Editar datos"
                @click="toEdit">
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
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
            this.$router.push('/editcamino/'+this.data.id)            
        }
    },
    computed: {
        cData: function() {
            console.log(this.data)
            return this.data
        }     
    },
    created() {
    }      
}
</script>

<style scoped>

</style>
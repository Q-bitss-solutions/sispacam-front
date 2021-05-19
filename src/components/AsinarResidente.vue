<template>
    <div class="row">
        <h3>Asignación de Residente de Obra</h3>
        <hr class="red">
        <div class="row">
        <div class="form-group">
            <div class="col-md-8 form-group">
                <label class="control-label">Residente asignado:</label>
                <input class="form-control" v-model="usuario" type="text" disabled placeholder="No hay usuario asigando">
                <input class="form-control" v-model="id" type="text" v-show="false">
            </div>           
        </div>
                <div class="col-md-4 text-right">
                    <button class="btn btn-default" type="button" id="buscarObras" @click="asignar">
                    <span class="icon" style="margin-right: 8px;"></span>Asignar</button>
                </div>         
        </div>  
        <ejs-grid   ref="grid"
                    :dataSource="data" :gridLines='lines' 
                    :allowPaging='true' 
                    :allowSorting='true'
                    :pageSettings='pageSettings'
                    :rowSelected='rowSelected'
                    :allowFiltering='true'
                    >
            <e-columns>
                <e-column field='id' headerText='id' :visible='flag'></e-column>
                <e-column field='nombre' headerText='Nombre(s)' ></e-column>
                <e-column field='primerA' headerText='1° Apellido'></e-column>
                <e-column field='segundoA' headerText='2° Apellido' ></e-column>
            </e-columns>
        </ejs-grid>
    </div>
</template>

<script>
import Vue from "vue";
import { GridPlugin, Sort, Page, Filter } from '@syncfusion/ej2-vue-grids';
import { asignarUsuario, getCaminoByClave } from '@/api/obras'


Vue.use(GridPlugin);
export default {
    name:'AsinarResidente',
    data () {
        return {     
            lines: 'Both',
            data:data,
            breadcrumb: [''],
            pageSettings: { pageCount: 5, pageSize: 20  },
            count: null,
            flag: false,
            usuario:'' ,
            id:null
        }    
    },    
    props: {
        idUsr: Number 
    },
    provide: {
        grid: [Sort, Page, Filter]
    },
    methods: {
        rowSelected: function(args) {
            let selectedrowindex = this.$refs.grid.getSelectedRowIndexes();  // Get the selected row indexes.
            //alert(selectedrowindex); // To alert the selected row indexes.
            let selectedrecords = this.$refs.grid.getSelectedRecords();  // Get the selected records.
            console.log(selectedrecords)
            this.usuario = selectedrecords[0].nombre + ' ' 
            + selectedrecords[0].primerA + ' ' + selectedrecords[0].segundoA
            this.id = selectedrecords[0].id
            },        
        async asignar(){
            const response = await asignarUsuario(this.$route.params.obraId, this.id)
            alert(response.msg)
            console.log(response)
        }
    },
    async created() {
        const resp = await getCaminoByClave(this.$route.params.obraId)
        console.log('resp')
        console.log(resp)
        if(resp.usuarios){
            this.usuario = data[0].nombre +  ' ' + data[0].primerA + ' ' + data[0].segundoA
            this.id = data[0].id
        }
    }

}

const data =
[
    {
    id:2,
    nombre:'Victor',
    primerA:'DEL',
    segundoA:'RUIZ'
    }          
]

</script>

<style scoped>

</style>
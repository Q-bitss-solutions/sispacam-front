<template>
    <div class="row">
        <h3>Asignación de Residente de Obra</h3>
        <hr class="red">
        <div class="row">
        <div class="form-group">
            <div class="col-md-8 form-group">
                <label class="control-label">Residente asignado:</label>
                <input class="form-control" v-model="usuario" type="text" disabled>
            </div>
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

Vue.use(GridPlugin);
export default {
    name:'AsinarResidente',
    data () {
        return {     
            lines: 'Both',
            data:data,
            breadcrumb: ['Resultados de Búsqueda de Obras'],
            pageSettings: { pageCount: 5, pageSize: 7  },
            count: null,
            flag: false,
            usuario:'' 
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
}
    }

}

const data =
[
    {
    id:1,
    nombre:'Tony',
    primerA:'Soprano',
    segundoA:'Coppola'
    },
    {
    id:2,
    nombre:'Marco',
    primerA:'Hernadez',
    segundoA:'Salas'
    },
    {
    id:3,
    nombre:'Jose',
    primerA:'Caballero',
    segundoA:'Perez'
    },
    {
    id:4,
    nombre:'Rogelio',
    primerA:'Carmona',
    segundoA:'Aztell'
    }            
]

</script>

<style scoped>

</style>
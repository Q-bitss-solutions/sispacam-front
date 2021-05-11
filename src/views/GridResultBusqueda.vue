<template>
    <div>

    <div class="row">
        <div class="col-md-12">
          <p class="small">Se encontraron <strong>{{ count }}</strong> resultados en la búsqueda.</p>

        <ejs-grid   ref="grid"
                    :dataSource="data" :gridLines='lines' 
                    :allowPaging='true' 
                    :allowSorting='true'
                    :pageSettings='pageSettings'
                    >
            <e-columns>
                <e-column field='id' headerText='ID de la Obra'></e-column>
                <e-column field='nombre_camino' headerText='Nombre de la obra'></e-column>
                <e-column field='tipo_camino' headerText='Tipo de Obra'></e-column>
                <e-column field='ubicacion' headerText='Estrategia de Gobierno Federal' ></e-column>
                <e-column field='beneficios' headerText='Grado de Marginación' ></e-column>
                <e-column field='caracteristicas' headerText='Tipo Poblacion' ></e-column>
                <e-column field="id" :template='editTemplate' headerText='Editar Obra' textAlign='Center' :visible='flag'></e-column>
                <e-column field="id" :template='cancelTemplate' headerText='Cancelar Obra' textAlign='Center' :visible='flag'></e-column>
            </e-columns>
        </ejs-grid>
        </div>
    </div>
      <div class="row">
        <div class="col-md-12 text-right">
          <hr>
          <button class="btn btn-default" type="button" @click="$router.push('/busqueda-obras')">Regresar</button>
        </div>
      </div>        
    </div>
</template>

<script>
import Vue from "vue";
import { mapMutations } from 'vuex'
import { GridPlugin, Sort, Page } from '@syncfusion/ej2-vue-grids';
import { getObras } from '@/api/obras'
import ButtonGrid from '@/components/ButtonGrid'
import CancelaObra from '@/components/CancelaObra'


Vue.use(GridPlugin);
export default {
    name: 'GridResultObra',
    data () {
        return {     
            lines: 'Both',
            data: [],
            breadcrumb: ['Resultados de Búsqueda de Obras'],
            pageSettings: { pageCount: 5, pageSize: 7  },
            count: null,
            flag: true       
        }    
    },
    provide: {
        grid: [Sort, Page]
    },
    methods: {
        editTemplate () { 
            return { 
                template:ButtonGrid 
            }
        },
        cancelTemplate () {
            return {
                template:CancelaObra
            }
        },
        async populate () {
        console.log('changemun')
            try{
                const { results, count } = await getObras() 
                console.log('res')           
                this.count = count     
                this.data = results 
            }catch(e) {
                console.log('error-->')
                console.log(e)
            }
        },
        ...mapMutations(['setBreadcrumb']),  
        dataBound: function() {                    
        }     
    },
    mounted () {
        this.populate()
        console.log('mounted')
        this.$refs.grid.ej2Instances.defaultLocale.EmptyRecord = "No hay registros";   
        this.$refs.grid.ej2Instances.gridPager.ej2_instances[0].defaultConstants.currentPageInfo = '{0} de {1} Paginas' 
    },
    created() {
        this.setBreadcrumb(this.breadcrumb)
        console.log('Params: ', this.$route.params)
        this.populate()
    }
}    
</script>

<style scoped>
</style>
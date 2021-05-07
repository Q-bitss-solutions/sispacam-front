<template>
    <div>
        <ejs-grid   ref="grid"
                    :dataSource="data" :gridLines='lines' :allowPaging='true' 
                    :allowSorting='true'
                    :pageSettings='pageSettings'
                    :dataBound="dataBound"
                    locale='de-DE'
                    >
            <e-columns>
                <e-column field='id' headerText='id_obra' width='150'></e-column>
                <e-column field='nombre_camino' headerText='Nombre' width='170'></e-column>
                <e-column field='tipo_camino' headerText='tipo_de_obra' width='170'></e-column>
                <e-column field='ubicacion' headerText='estrategia' width='120'></e-column>
                <e-column field='beneficios' headerText='Grado Marginación' width='120'></e-column>
                <e-column field='caracteristicas' headerText='Tipo Poblacion' width='120'></e-column>
            </e-columns>
        </ejs-grid>
    </div>
</template>

<script>
import Vue from "vue";
import { mapMutations } from 'vuex'
import { GridPlugin, Sort, Page } from '@syncfusion/ej2-vue-grids';
import { getObras } from '@/api/obras'


Vue.use(GridPlugin);
export default {
    name: 'GridResultObra',
    data () {
        return {     
            locale: 'ar',
            lines: true,
            data: [],
            breadcrumb: ['Resultados de Búsqueda de Obras'],
            pageSettings: { pageCount: 5, pageSize: 7  }
        }
    },
    provide: {
        grid: [Sort, Page]
    },
    methods: {
        async populate () {
        console.log('changemun')
            try{
                const { results } = await getObras() 
                console.log('res')           
                console.log(results)      
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
        console.log(this.$route.params)
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
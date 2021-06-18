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
                    :allowTextWrap='true'
                    >
            <e-columns>
                <e-column field='clave' headerText='ID de la Obra'></e-column>
                <e-column field='nombre_camino' headerText='Nombre de la obra'></e-column>
                <e-column field='tipo_camino' headerText='Tipo de Obra'></e-column>
                <e-column field='estrategia' headerText='Estrategia de Gobierno Federal' ></e-column>
                <e-column field='marginacion' headerText='Grado de Marginación' ></e-column>
                <e-column field='poblacion_indigena' headerText='Tipo Poblacion' ></e-column>
                <e-column field="clave" :template='editTemplate' headerText='Editar Obra' textAlign='Center' :visible='flagEdicion'></e-column>
                <e-column field="clave" :template='cancelTemplate' headerText='Cancelar Obra' textAlign='Center' :visible='flag'></e-column>
            </e-columns>
        </ejs-grid>
        </div>
    </div>
      <div class="row" v-if="this.$store.getters['user/StateRol']=='NORMATIVO'?true:false">
        <div class="col-md-12 text-right">
          <hr>
          <button class="btn btn-default" type="button" @click="$router.push('/busqueda')">Regresar</button>
        </div>
      </div>        
    </div>
</template>

<script>
import Vue from "vue";
import { mapMutations } from 'vuex'
import { GridPlugin, Sort, Page } from '@syncfusion/ej2-vue-grids';
import { getObrasByUsuario, getObraByClave, getObraByParmas } from '@/api/obras'
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
            pageSettings: { pageCount: 5, pageSize: 20  },
            count: 0,
            flag: this.$store.getters['user/StateRol']=='NORMATIVO'?true:false,
            isCanceled:false,
            flagEdicion:true
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
            try{
                let results  = []
                let data = null
                if(this.flag){
                    if(this.$route.params.values.clave){
                        data = await getObraByClave(this.$route.params.values.clave)    
                        const aRR = []
                        aRR.push(data)
                        results = aRR    
                    }else{                    
                    results = await getObraByParmas(this.$route.params.values)                 
                    }
                }else{
                    results = await getObrasByUsuario(this.$store.state.user.userId)                    
                }


                if(results){    
                    results.map((obj) => {
                        switch (obj.tipo_camino) {
                                    case 'A':
                                        obj.tipo_camino = 'Agencia'
                                        break;
                                    case 'C':
                                        obj.tipo_camino = 'Cabecera'
                                        break;                    
                                    case 'O':
                                        obj.tipo_camino = 'Otro'
                                        break;
                                }
                        obj.estrategia = obj.ciit===true?'CIIT':''
                        obj.estrategia += obj.tren_maya===true?' Tren Maya':''
                        obj.estrategia += obj.caminos_originales===true?' Caminos Originales':''
                        obj.isCanceled = obj.estatus=='A'?false:true
                        return obj
                    })               
                    this.count = results.length     
                    this.data = results 
                }

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
        this.$refs.grid.ej2Instances.defaultLocale.EmptyRecord = "No hay registros";   
        this.$refs.grid.ej2Instances.gridPager.ej2_instances[0].defaultConstants.currentPageInfo = '{0} de {1} Paginas' 
    },
    created() {
        this.setBreadcrumb(this.breadcrumb)
        this.populate()
    }
}    
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
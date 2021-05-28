<template>
<div>
    <div class="row">
        <div class="col-md-7">
          <table class="table table-bordered text-center">
            <thead>
              <tr>
                <th>AÑO FISCAL DEL PRESUPUESTO BASE</th>
                <th>LONGITUD</th>            
                <th>PRESUPUESTO BASE</th>
                <th>PRESUPUESTO REAL</th>
                <th>VARIACIÓN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2021</td>
                <td>4.0</td>
                <td> 
                   <vue-numeric 
                        v-bind:precision="2" currency="$" separator="," 
                        class="form-control" 
                        v-model="getUpTotalIPLBase" 
                        :read-only="true">
                    </vue-numeric>                 
                </td>
                <td>
                   <vue-numeric 
                        v-bind:precision="2" currency="$" separator="," 
                        class="form-control" 
                        v-model="getUpTotalIPL" 
                        :read-only="true">
                    </vue-numeric>                      
                </td>
                <td>
                   <vue-numeric 
                        v-bind:precision="2" currency="$" separator="," 
                        class="form-control" 
                        v-model="getVariacion" 
                        :read-only="true">
                    </vue-numeric>                    
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="col-md-4 col-md-offset-1">
          <label class="control-label">Filtrar por concepto:</label>
          <select id="sconceptos" v-model="filtro" class="form-control">
            <option value="0" >VER TODOS</option>
            <option value="1" >TERRACERÍAS</option>
            <option value="2">OBRAS DE DRENAJE Y ESTRUCTURAS</option>
            <option value="3">SUPERFICIE DE RODAMIENTO</option>
            <option value="4">SEÑALAMIENTO</option>
            <option value="5">PRECIOS EXTRAORDINARIOS</option>
          </select>
        </div>        
    </div>



     <div class="row">
        <div class="col-md-12">
          <!-- PESTAÑAS -->
          <ul class="nav nav-tabs small-top-buffer">
            <li class="active">
                <a data-toggle="tab" href="#tab-real" id="tab-real">
                    PRESUPUESTO REAL
                </a>
            </li>
            <li>
                <a data-toggle="tab" href="#tab-base" id="tab-base">
                    PRESUPUESTO BASE
                </a>
            </li>
          </ul>
          <div class="tab-content">
            <!-- PESTAÑA PRESUPUESTO REAL -->
            <div class="tab-pane active">
                <PestaniaPresupuesto 
                    :filtroConceptos="getFilterValue"
                    :upTotalIPL.sync="upTotalIPL"
                    :isPBase="false"
                    :key="'cancel'+conutCancel"
                />
            </div>

            <!-- PESTAÑA PRESUPUESTO BASE -->
            <div class="tab-pane">
                <PestaniaPresupuesto 
                  :filtroConceptos="getFilterValue"
                  :upTotalIPL.sync="upTotalIPLBase"
                  :isPBase="true"
                  />
            </div>
          </div>
        </div>
      </div>
      <!-- BOTONES DE ACCIÓN -->
      <div class="row">
        <div class="col-md-12 text-right">
          <hr />
          <button @click="cancel" class="btn btn-default" type="button">Cancelar</button>
          <button @click="save" class="btn btn-primary" type="button">Guardar cambios</button>
        </div>
      </div>
</div>    
</template>

<script>
import { mapMutations } from 'vuex'
import PestaniaPresupuesto from '@/components/presupuestos/PestaniaPresupuesto';

export default {
    name:'Presupuestos',
    components:{
        PestaniaPresupuesto
    },
    data () {
        return {
          filtro:'0',
          breadcrumb: ['Presupuesto del Camino '+ this.$route.params.obraId],
          terraceriasShow:true,
          contador:0,
          upTotalIPL:0,
          upTotalIPLBase:0
        }
    },
    methods: {
       ...mapMutations(['setBreadcrumb']),    
        cancel() {
            this.filtro = 0
            this.contador++
            return
       },
       save() {
           this.$store.state.presupuesto.conceptos.map( item => 
            console.log(item.presupuesto) )
       }
    },
    beforeMount: function () {    
        this.setBreadcrumb(this.breadcrumb)        
    },      
    computed:{
       getFilterValue(){
          return Number( this.filtro )
       },
       conutCancel(){
         this.$store.state.presupuesto.conceptos.map( item => 
            item.presupuesto = null)
         return this.contador
       },
       getUpTotalIPL: {
           get() {
               return this.upTotalIPL
           },
           set(val) {}           
       },

       getUpTotalIPLBase: {
           get() {
               return this.upTotalIPLBase
           },
           set(val) {

           }
       },
       getVariacion:  {
           get() {
               console.log('---------------------jajaj')
               console.log(this.getUpTotalIPL - this.upTotalIPLBase)
               return this.getUpTotalIPL - this.upTotalIPLBase
           },
           set(val){}
       }
       
    },

}
</script>

<style>
.col-md-12.npl{
    padding-left:0%
}
</style>
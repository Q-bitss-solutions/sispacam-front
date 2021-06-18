<template>
<div>
    <div class="row">
        <div class="col-md-12">
          <table class="table table-bordered text-center">
            <thead>
              <tr>
                <th>AÑO FISCAL DEL PRESUPUESTO BASE</th>
                <th>ANCHO DE CAMINO</th>            
                <th>PRESUPUESTO BASE</th>
                <th>PRESUPUESTO REAL</th>
                <th>VARIACIÓN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ anio }}</td>
                <td>{{ ancho }}</td>
                <td> 
                   <vue-numeric 
                        v-bind:precision="2" currency="$" separator="," 
                        class="form-control" 
                        v-model="getUpTotalIPLBase" 
                        :read-only=true>
                    </vue-numeric>                 
                </td>
                <td>
                   <vue-numeric 
                        v-bind:precision="2" currency="$" separator="," 
                        class="form-control" 
                        v-model="getUpTotalIPL" 
                        :read-only=true>
                    </vue-numeric>                      
                </td>
                <td>
                   <vue-numeric 
                        v-bind:precision="2" currency="$" separator="," 
                        class="form-control" 
                        v-model="getVariacion" 
                        :read-only=true>
                    </vue-numeric>                    
                </td>
              </tr>
            </tbody>
          </table>
        </div>       
    </div>
    
    <div class="row">
        <div class="col-md-7">
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
              <li class="active"><a data-toggle="tab" href="#tab-base">PRESUPUESTO BASE</a></li>            
              <li ><a data-toggle="tab" href="#tab-real">PRESUPUESTO REAL</a></li>              
          </ul>
          <div class="tab-content">
                    <!-- PESTAÑA PRESUPUESTO BASE --> 
            <div class="tab-pane active" id="tab-base">
                <PestaniaPresupuesto 
                  :filtroConceptos="getFilterValue"
                  :upTotalIPL.sync="upTotalIPLBase"
                  :isPBase="true"
                  :ancho="anchoCamino"                  
                  />
            </div>                         
        
            <!-- PESTAÑA PRESUPUESTO REAL -->
            <div class="tab-pane"  id="tab-real" >
                <PestaniaPresupuesto 
                    :filtroConceptos="getFilterValue"
                    :upTotalIPL.sync="upTotalIPL"
                    :editMode.sync="editMode"
                    :isPBase="false"
                    :key="'cancel'+conutCancel"
                    :ancho="anchoCamino"
                    ref="presupuestoReal"
                    @cancel="cancel"
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

<ModalError 
    ref="modals"
    @cancel="cancel"
/>

</div>    
</template>

<script>
import { mapMutations } from 'vuex'
import Vue from 'vue'
import  ModalError  from '@/components/Modals/Modal-error'
import PestaniaPresupuesto from '@/components/presupuestos/PestaniaPresupuesto';
import { savePresupuesto, updatePresupuesto } from '@/api/presupuesto'
import { saveExtraordinarios, updateExtraordinario } from '@/api/extraordinarios'
import VueNumeric from 'vue-numeric'
import { Loading } from 'element-ui';

Vue.use(VueNumeric)


export default {
    name:'Presupuestos',
    components:{
        ModalError,
        PestaniaPresupuesto,
        VueNumeric
    },
    data () {
        return {
          filtro:'0',
          breadcrumb: ['Presupuesto del Camino '+ this.$route.params.obraId],
          terraceriasShow:true,
          contador:0,
          upTotalIPL:0,
          editMode:false,
          upTotalIPLBase:0,
          anchoCamino:null,
          anio:null,
          ancho:null,
          ancho1:[
              {
                  id:1,
                  ancho:'4.0'
              },
              {
                  id:2,
                  ancho:'4.5'
              },
              {
                  id:3,
                  ancho:'5.0'
              },
              {
                  id:4,
                  ancho:'5.5'
              },
              {
                  id:5,
                  ancho:'6.0'
              }
          ]
        }
    },
    methods: {
        ...mapMutations(['setBreadcrumb']),    
        cancel() {
            this.filtro = 0
            this.contador++
            window.scrollTo(0, 0)
        },
        async save() {
            let loadingInstance = Loading.service({ fullscreen: true, lock: true });
            const validation = await this.$refs.presupuestoReal.validations()
            if(!validation) {
                loadingInstance.close();
                this.$refs.modals.openmodal("La cantidad de las partidas extraorinarias no puden estar en cero"); 
                return
            }            
            const data = []
            const conceptos = []
            const aConceptos = JSON.parse(JSON.stringify(this.$store.state.presupuesto.conceptos))
            aConceptos.map(a => {
                console.table(a)
            })            
            aConceptos.map( concepto => {
               //F extraordinarios
               if(concepto.presupuesto || concepto.codigo != 'F'){
                    concepto.presupuesto.map(i => {
                        conceptos.push(i)
                    })
               }      
            })
            conceptos.map( item => {
                data.push(  {
                    ancho_camino: item.ancho_camino.id,
                    partida: item.partida.id,
                    precio_unitario: item.precio_unitario,
                    cantidad: item.cantidad.toString(),
                    importe: item.importe,
                    id_datoconvenio:this.$route.params.convenioId
                })                           
            })
        let response = ''  
        if(this.getEditMode){
            response = await updatePresupuesto(this.$route.params.convenioId, data).catch(err => {
                loadingInstance.close();
            })
        }else{
            response = await savePresupuesto(data).catch(err => {
                loadingInstance.close();
            })
        }
        await this.seveExtraordinarios().catch(err => {
            loadingInstance.close();
        })
        loadingInstance.close();
        $('#save').modal('show')

       },
        async seveExtraordinarios(){
           const conceptosExt = JSON.parse(JSON.stringify(this.$store.state.presupuesto.conceptosExtraordinarios))
            for(let ext of conceptosExt.presupuesto) {
                const extra =  {
                    "cantidad": ext.cantidad_total,
                    "partida": ext.id,
                    "convenio": this.$route.params.convenioId,
                    "id":ext.convenioextraordinario
                }
                if(!ext.convenioextraordinario){
                    await saveExtraordinarios(extra).catch(err => {
                        loadingInstance.close();
                        })
                }else{
                    await updateExtraordinario(extra).catch(err => {
                        loadingInstance.close();
                        })
                }                
            }
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
               return this.getUpTotalIPL - this.upTotalIPLBase
           },
           set(val){}
       },
       getEditMode: {
           get() {
               return this.editMode
           },
           set(val) {

           }           
       }       
       
    },
    created(){
        this.anchoCamino = this.$route.params.anchoId
        this.ancho = this.ancho1.find(a => this.anchoCamino == a.id).ancho
        this.anio = this.$route.params.anio
    }

}
</script>

<style>
.col-md-12.npl{
    padding-left:0%
}
</style>
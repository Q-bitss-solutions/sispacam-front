<template>
<div>
<div class="row">

  <div class="col-md-12 small-bottom-buffer">

      <div class="row">

        <div class="col-md-4 form-group">
          <label class="control-label">Año fiscal del presupuesto base:</label>
          <ejs-dropdownlist
                        id="ancho_camino"
                        :dataSource="anios"
                        :fields="anchoCaminoFields"
                        placeholder="Selecciona el año fiscal del presupuesto base"
                        v-model="anio"
                        ref="refAncho"
                        >
                        </ejs-dropdownlist>
                <small v-if="!$v.anio.required" class="form-text form-text-error">
                             Este campo es obligatorio
                        </small>
        </div>

        <div class="col-md-4 form-group">
          <label class="control-label">Ancho del camino​:</label>
          <ejs-dropdownlist
                        id="ancho_camino"
                        :dataSource="anchoCaminoData"
                        :fields="anchoCaminoFields"
                        placeholder="Selecciona el ancho del camino"
                        v-model="ancho_camino"
                        ref="refAncho"
                        >
                        </ejs-dropdownlist>
            <small v-if="!$v.ancho_camino.required" class="form-text form-text-error">
                             Este campo es obligatorio
                        </small>
        </div>

        <div class="col-md-4 form-group">
            <button class="btn btn-primary" type="button" @click="fetchPresupuestoBase">
            <span class="icon icon-search" style="margin-right: 8px;"></span>Buscar</button>
        </div>

    </div>
  </div>
</div>
    <div class="row">
    <div class="col-md-4 no-padding" v-if="isLoad">
    <label class="control-label">Filtrar por concepto:</label>
    <ejs-dropdownlist 
                        id="elementos"    
                        :dataSource="presupuestos"
                        :fields="{ text: 'name', value: 'id' }"
                        placeholder="Selecciona el concepto"
                        v-model="filtroConceptos"
                        :change="filtrar"
                        ref="refAncho"
                        >
                        </ejs-dropdownlist>
    </div>
    </div>
    
    <div class="row">
        <div class="col-md-12 no-padding" v-if="isLoad">
            <table class="table table-responsive table-bordered data">
                <thead>
                    <tr>
                    <th>CONCEPTOS Y PARTIDAS</th>
                    <th>CANTIDAD POR KILOMETRO</th>
                    <th>UNIDAD</th>
                    <th>PRECIO UNITARIO</th>
                    <th>EDITAR</th>
                    <th>ELIMINAR</th>
                    </tr>
                </thead>
                <!-- TERRACERIAS-->
                <TablePresupuesto
                v-if="(filtroConceptos==0 || filtroConceptos==1) && isLoad"
                    :conceptos="terracerias"
                    :key="'terra'+getPresupuestoByID(1).update"
                    :showAdminCatalogo="showAdminCatalogo"
                    :unidad_medida_catalogo="unidad_medida_catalogo"
                    :nameModal="'ModalPRE1'"
                    :agregaprecio="agregaprecio"
                    :agregaCantidad="agrega"
                    />
                <!-- 'OBRAS DE DRENAJE Y ESTRUCTURAS' -->
                <TablePresupuesto
                v-if="(filtroConceptos==0 || filtroConceptos==2) && isLoad"
                    :conceptos="getPresupuestoByID(2)"
                    :key="'obras'+getPresupuestoByID(2).update"
                    :showAdminCatalogo="showAdminCatalogo"
                    :unidad_medida_catalogo="unidad_medida_catalogo"
                    :nameModal="'ModalPRE2'"
                    :agregaprecio="agregaprecio"
                    :agregaCantidad="agrega"
                    />     
                <!-- SUPERFICIE DE RODAMIENTO --> 
                <TablePresupuesto
                v-if="(filtroConceptos==0 || filtroConceptos==3) && isLoad"
                    :conceptos="getPresupuestoByID(3)"
                    :key="'superficie'+getPresupuestoByID(3).update"
                    :showAdminCatalogo="showAdminCatalogo"
                    :unidad_medida_catalogo="unidad_medida_catalogo"
                    :nameModal="'ModalPRE3'"
                    :agregaprecio="agregaprecio"
                    :agregaCantidad="agrega"
                    />      
                <!-- SENALAMIENTO --> 
                <TablePresupuesto
                v-if="(filtroConceptos==0 || filtroConceptos==4) && isLoad"
                    :conceptos="getPresupuestoByID(4)"
                    :key="'senalamiento'+getPresupuestoByID(4).update"
                    :showAdminCatalogo="showAdminCatalogo"
                    :unidad_medida_catalogo="unidad_medida_catalogo"
                    :nameModal="'ModalPRE4'"
                    :agregaprecio="agregaprecio"
                    :agregaCantidad="agrega"
                    />
            </table>

            <div class="row">
                <div class="col-lg-12 text-right">
                    <br>
                    <a href="/presupuesto/base/kilometro" class="btn btn-default">Cancelar</a>
                    <button class="btn btn-primary" v-on:click=enviarPresupuestoBase()>Guardar</button>
                </div>
            </div>

        </div>
    </div>



        <EditPartidas
            :catConceptos="presupuestos"
            :fetchPresupuestoBase="fetchPresupuestoBase"
            ref="modalAdmPartidas"
        />
  
</div>

</template>

<script>
// @ is an alias to /src
import { mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { filterPresupuestoBase, getAnchoCamino, ModificarmPresupuestoBase } from '@/api/presupuesto'
import TablePresupuesto from '@/components/presupuestos/TablePresupuestoBase';
import EditPartidas from '@/components/Modals/EditPartidas'
import { getUnidadMedida}  from '@/api/catalogo_pe'
import { Loading } from 'element-ui';

const validateEdo = (value, vm) => {

  return value !== ''
  //return vm.items.some(edo => edo.cve_agee != '');
};

export default {
  name: 'TablePresupuestoBase',
  components: {
        TablePresupuesto,EditPartidas
        
    },
  data () {
    return {
      breadcrumb: ['Presupuesto Base por Kilómetro'],
      anios: [],filtroConceptos:0,
      unidad_medida_catalogo:null,datos_modificados:[],
      anchos: null,anio:null,ancho_camino:null,datos:[],presupuestoBase:[],isLoad:false, presupuestos: [
                {                    
                    id:1,
                    codigo:'A',
                    mostrar:true,
                    name:'TERRACERIAS',
                    subtotalPU:0,
                    subTotalIPL:0, 
                    subTotalPP:0,       
                    subTotalIPK:0,            
                    update:0,
                    presupuestoStart: null,
                    presupuestoBack: null

                },
                {
                    id:2,
                    codigo:'B',
                    mostrar:true,
                    name:'OBRAS DE DRENAJE Y ESTRUCTURAS',
                    subtotalPU:0,
                    subTotalIPL:0,  
                    subTotalPP:0,   
                    subTotalIPK:0,               
                    subTotalImportePorLong:0,                     
                    update:0,
                    presupuestoStart: null,
                    presupuestoBack: null
                },
                {
                    id:3,
                    codigo:'C',
                    mostrar:true,
                    name:'SUPERFICIE DE RODAMIENTO',
                    subtotalPU:0,
                    subTotalIPL:0,   
                    subTotalPP:0, 
                    subTotalIPK:0,                
                    subTotalImportePorLong:0,                     
                    update:0,
                    presupuestoStart: null,
                    presupuestoBack: null
                },
                {
                    id:4,
                    codigo:'D',
                    mostrar:true,
                    name:'SEÑALAMIENTO',
                    subtotalPU:0,
                    subTotalIPL:0,
                    subTotalPP:0,
                    subTotalIPK:0,
                    subTotalImportePorLong:0,                     
                    update:0,
                    presupuestoStart: null,
                    presupuestoBack: null
                },
                {
                    id:5,
                    codigo:'F',
                    mostrar:true,
                    name:'PRECIOS EXTRAORDINARIOS',
                    subtotalPU:0,
                    subTotalIPL:0,
                    subTotalPP:0,
                    subTotalIPK:0,
                    subTotalImportePorLong:0,                     
                    update:0,
                    presupuestoStart: null,
                    presupuestoBack: null
                }                
            ],
      anchoCaminoFields: { text: 'descripcion', value: 'id' },
      anchoCaminoData: [],
     
    }
  },

   validations: {
        ancho_camino: {
            required,
        },
        anio: {
            required,
        },

  },   
  methods: {
    ...mapMutations(['setBreadcrumb']),
   async enviarPresupuestoBase(){
        let loadingInstance = Loading.service({ fullscreen: true, lock: true });
        await ModificarmPresupuestoBase(this.datos_modificados).finally(_ => {
                            loadingInstance.close();
                        })                        
    },
     agrega(value){
           let elm =false
           this.datos_modificados.map( (element) => {
                if ( element.id == value.id) {
                    element.cantidad = value.cantidad
                    elm=true
                    return true
                } 
                return false
            })
           
            if(!elm){
                this.datos_modificados.push({"id":value.id,"cantidad":value.cantidad})
            }
           console.log(this.datos_modificados)
        },
        agregaprecio(value){
           let elm =false
           console.log(value)
           this.datos_modificados.map( (element) => {
                if ( element.id == value.id) {
                    element.precio_unitario = value.importe
                    elm=true
                    return true
                } 
                return false
            })
            
            if(!elm){
                this.datos_modificados.push({"id":value.id,"precio_unitario":value.importe})
            }
           
        },
    showAdminCatalogo(id){
            this.$refs.modalAdmPartidas.editar(id)
        },
    filtrar(){
            this.datos.map( (element) => {
                if ( element.id == this.filtroConceptos  || this.filtroConceptos ==  0) {
                    element.mostrar = true
                } else {
                    element.mostrar = false
                }
                element.update++
                return element
            })
            return this.presupuestos   
        },
  
    getPresupuestoByID(id) {
           return this.presupuestoBase.find( i => i.id === id)
        },

    async fetchPresupuestoBase() {
        if (this.$v.$invalid) {
                console.log("error");
        } else {
            let loadingInstance = Loading.service({ fullscreen: true, lock: true });
            this.isLoad = false
            let data={"ancho":this.ancho_camino,"anio":this.anio}
            const response = await filterPresupuestoBase(data).finally(_ => {
                            loadingInstance.close();
                        })                        
            this.datos = response
            this.loadData()
        }
        },
           loadData() {
            this.datos.map( i => {
                i.partida.unidadmedida= i.partida.unidad_medida
                i.partida.unidad_medida = i.partida.unidad_medida.descripcion

                })
            this.presupuestos.map((_presupuesto, _index) => {     
                const data = this.datos.filter(d => d.partida.concepto.codigo === _presupuesto.codigo)
                    .map(terra => ({                        
                        ...terra,
                        precio_unitario: (terra.importe || 0) / (terra.cantidad || 1),
                        importe_total: ( (terra.importe || 0) / (terra.cantidad || 1)) * ( terra.cantidad || 1 )
                    }))            
                
                _presupuesto.presupuestoBack = data
                _presupuesto.presupuestoStart = data
            })
            this.presupuestoBase =  JSON.parse(JSON.stringify(this.presupuestos))
            
            this.terracerias=this.getPresupuestoByID(1)
            console.log(this.terracerias)
            this.isLoad = true
        }, 
    async initData () {
        const d = new Date();
        let year=d.getFullYear()+1;
        console.log(this.anios)
        this.anios.push({"descripcion":year, 'id':year});
        for(let i=1; i<11; i++){
            this.anios.push({"descripcion":year-i, 'id':year-i});
        }

        this.anchoCaminoData=await getAnchoCamino();
        console.log(this.anchoCaminoData)
        this.loadUM()
    },
    clearData () {
      this.$v.$reset()
      this.initData()
    },
    async loadUM() {
        this.unidad_medida_catalogo = await getUnidadMedida()
        console.log("Unidad Medida");
        console.log(this.unidad_medida_catalogo);
    }
  },
  beforeMount: function () {
    this.setBreadcrumb(this.breadcrumb)
  },
  created() {
      this.initData()
      this.datos_modificados=[]
  },

  computed: {
    isVisible(){
            this.datos.map( (element) => {
                if ( element.id == this.filtroConceptos  || this.filtroConceptos ==  0) {
                    element.mostrar = true
                } else {
                    element.mostrar = false
                }
                element.update++
                return element
            })
            return this.presupuestos   
        },
  }  
}

</script>

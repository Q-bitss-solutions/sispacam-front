<template>
    <div class="row">
    <div class="col-md-12">
        <table class="table table-responsive table-bordered data">
        <thead>
            <tr>            
            <th>CONCEPTOS Y PARTIDAS</th>
            <th v-if="isPBase">CANTIDAD POR KILOMETRO</th>            
            <th v-if="!isPBase">CANTIDAD TOTAL</th>
            <th>UNIDAD</th>
            <th v-if="isPBase">IMPORTE POR KILOMETRO</th>
            <th>PRECIO UNITARIO</th>
            <th>IMPORTE TOTAL POR LONGITUD</th>
            <th>PORCENTAJE PONDERADO </th>
            </tr>
        </thead>
            <!-- TERRACERIAS-->
            <TablePresupuesto
                 v-if="isVisible.find( el => el.id === 1).mostrar && isLoaded"
                 :conceptos="getPresupuestoByID(1)"
                 :key="'terra'+getPresupuestoByID(1).update"    
                 :childTotalPU.sync="getPresupuestoByID(1).subtotalPU"           
                 :childTotalITPL.sync="getPresupuestoByID(1).subTotalIPL" 
                 :totalIPL.sync="getTotalIPL"       
                 :totalPP.sync="getPresupuestoByID(1).subTotalPP"
                 :subTotalIPK.sync="getPresupuestoByID(1).subTotalIPK"
                 :isPBase="isPBase"
                />
            <!-- 'OBRAS DE DRENAJE Y ESTRUCTURAS' -->
            <TablePresupuesto
                 v-if="isVisible.find( el => el.id === 2).mostrar &&  isLoaded"
                 :conceptos="getPresupuestoByID(2)"
                 :key="'obras'+getPresupuestoByID(2).update"
                 :childTotalPU.sync="getPresupuestoByID(2).subtotalPU" 
                 :childTotalITPL.sync="getPresupuestoByID(2).subTotalIPL"   
                 :totalIPL.sync="getTotalIPL"
                 :totalPP.sync="getPresupuestoByID(2).subTotalPP"
                 :subTotalIPK.sync="getPresupuestoByID(2).subTotalIPK"
                 :isPBase="isPBase"
                />     
            <!-- SUPERFICIE DE RODAMIENTO --> 
            <TablePresupuesto
                 v-if="isVisible.find( el => el.id === 3).mostrar && isLoaded"
                 :conceptos="getPresupuestoByID(3)"
                 :key="'superficie'+getPresupuestoByID(3).update" 
                 :childTotalPU.sync="getPresupuestoByID(3).subtotalPU"  
                 :childTotalITPL.sync="getPresupuestoByID(3).subTotalIPL"
                 :totalIPL.sync="getTotalIPL"      
                 :totalPP.sync="getPresupuestoByID(3).subTotalPP"
                 :subTotalIPK.sync="getPresupuestoByID(3).subTotalIPK"
                 :isPBase="isPBase"
                />      
            <!-- SENALAMIENTO --> 
            <TablePresupuesto
                 v-if="isVisible.find( el => el.id === 4).mostrar && isLoaded"
                 :conceptos="getPresupuestoByID(4)"
                 :key="'senalamiento'+getPresupuestoByID(4).update"  
                 :childTotalPU.sync="getPresupuestoByID(4).subtotalPU"   
                 :childTotalITPL.sync="getPresupuestoByID(4).subTotalIPL"
                 :totalIPL.sync="getTotalIPL"    
                 :totalPP.sync="getPresupuestoByID(4).subTotalPP"
                 :subTotalIPK.sync="getPresupuestoByID(4).subTotalIPK"
                 :isPBase="isPBase"
                />   
            <tbody  v-if="isVisible.find( el => el.id === 5).mostrar && !isPBase">
                <tr class="concepto">
                    <td colspan="4">PRECIOS EXTRAORDINARIOS</td>
                    <td>
                        <vue-numeric v-bind:precision="2" currency="$" 
                            separator="," 
                            disabled
                            class="form-control" 
                            v-model="getSubtotalIPExt"
                            >
                        </vue-numeric>                        
                    <td>
                        <vue-numeric v-bind:precision="2" currency="%"
                            class="form-control"
                            disabled
                            v-model="getSubtotalPPExt"
                            currency-symbol-position="suffix"                
                            >
                        </vue-numeric>     
                    </td>
                </tr>               
                <tr v-for="(extraordinario, k) in extraordinarios" :key="k">
                    <td>    
                        <div class="row">
                            <div class="col-md-1">
                                <button class="btn btn-primary btn-sm" type="button"  @click="deleteRow(k, extraordinario)">
                                    <span class="glyphicon glyphicon-remove"></span> 
                                </button>
                            </div>
                            <div class="col-md-11">
                                <input v-on:keypress="checa(k)" 
                                        type="text" v-model="extraordinario.concepto">
                            </div>                        
                        </div>                     
                    </td>
                    <td>
                        <vue-numeric 
                            v-bind:precision="2" 
                            separator="," 
                            class="form-control" 
                            v-model="extraordinario.cantidad_total"
                            v-on:keypress.native="checa(k)"
                            >
                        </vue-numeric>                          
                    </td>
                    <td>
                        <select v-model="extraordinario.unidad" id="">
                            <option value="1">HA</option>
                            <option value="2">M3</option>
                            <option value="3">ML</option>
                            <option value="4">PZA</option>
                        </select>                    
                    </td>
                    <td>
                        <vue-numeric v-bind:precision="2" 
                            currency="$" separator="," 
                            class="form-control" 
                            v-model="extraordinario.precio_unitario"
                            v-on:keypress.native="checa(k)"
                            >
                        </vue-numeric>
                    </td>
                    <td>
                        <vue-numeric v-bind:precision="2" currency="$" separator="," 
                            class="form-control" 
                            v-model="colImporteTotalExt[k]" 
                            disabled
                            >
                        </vue-numeric>                        
                    </td>
                    <td>
                        <vue-numeric v-bind:precision="2" currency="%"
                            class="form-control"                            
                            disabled
                            v-model="colPPExt[k]"
                            currency-symbol-position="suffix"                
                            >
                        </vue-numeric>                         
                    </td>   
                </tr>                 
                <tr>
                    <td>
                            <button class="btn btn-danger btn-sm" type="button" 
                            @click="addExtraordinario">
                                <span class="glyphicon glyphicon-plus"></span> 
                                Agregar partida extraordinaria
                            </button>
                    </td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>   
                </tr> 
            </tbody>                                                                
        <tfoot>
            <tr>
            <td colspan="3">TOTAL</td>
            <td v-if="isPBase && isLoaded">
                <vue-numeric 
                    v-bind:precision="2" 
                    separator="," 
                    currency="$"
                    class="form-control" 
                    v-model="getTotalIPK"
                    disabled
                    >
                </vue-numeric>               
            </td>
            <td v-if="!isPBase && isLoaded">
                <input v-show="false" v-model="getTotalPU" disabled>
                <vue-numeric 
                    v-bind:precision="2" 
                    separator="," 
                    currency="$"
                    class="form-control" 
                    v-model="totalPU"
                    disabled
                    >
                </vue-numeric>                 
            </td>
            <td v-if="isPBase && isLoaded"></td>
            <td v-if="isLoaded">
                <input v-show="false" v-model="getTotalIPL" disabled>
                <vue-numeric 
                    v-bind:precision="2" 
                    separator="," 
                    currency="$"
                    class="form-control" 
                    v-model="totalIPL"
                    disabled
                    >
                </vue-numeric>                  
            </td>
            <td v-if="isLoaded">
                <input v-show="false" v-model="getTotalPP" disabled>
                <vue-numeric 
                    v-bind:precision="2" 
                    separator="," 
                    currency="%"
                    currency-symbol-position="suffix" 
                    class="form-control" 
                    v-model="totalPP"
                    disabled
                    >
                </vue-numeric>                 
            </td>
            </tr>
        </tfoot>
        </table>
    </div>
    </div>
</template>

<script>
import { presupuesto } from './datos';
import Vue from 'vue'
import TablePresupuesto from '@/components/presupuestos/TablePresupuesto';
import { returnStatement } from '@babel/types';
import { mapMutations, mapGetters } from 'vuex'
import { getPresupuestoBaseByAncho, getPresupuestoRealByIdConvenio } from '@/api/presupuesto'

import VTooltip from 'v-tooltip'

Vue.use(VTooltip)

export default {
    name:'PestaniaPresupuesto',
    components: {
        TablePresupuesto
    },
    props: {
        filtroConceptos:{
            type:Number
        },   
        isPBase: {
           type: Boolean,
           require: true
        },
        upTotalIPL: {
            type:Number
        },
        ancho: {
            default:1
        },
        editMode: {
            type: Boolean
        }    
    },    
    data () {
        return {
            isLoad:false,
            datos:null,
            presupuestoReal:null,
            presupuestoBase:null,
            fetch_presupuestoReal:null,
            totalPU:0,
            totalIPL:0,
            totalPP:0,
            TotalIPK:0,
            extraordinarios:[],
            presupuestos: [
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
            ]
        }
    },
    methods:{
       ...mapGetters('presupuesto', ['getPresupuestoByName']),
       ...mapMutations('presupuesto', ['setPresupuesto']),
       loadData() {           
            this.datos.map( i => {
                let unidad = unidad_medida.find( u => i.partida.id == u.id )
                unidad = JSON.parse(JSON.stringify(unidad))
                i.partida.unidad_medida = unidad.unidad

                })     
            this.presupuestos.map((_presupuesto, _index) => {         
                const data = this.datos.filter(d => d.partida.concepto.codigo === _presupuesto.codigo)
                    .map(terra => ({
                        ...terra,
                        precio_unitario: terra.importe / terra.cantidad,
                        importe_total: (terra.importe / terra.cantidad) * terra.cantidad
                    }))
                console.log(data)
                _presupuesto.presupuestoBack = data
                _presupuesto.presupuestoStart = data
            })
            this.presupuestoReal = JSON.parse(JSON.stringify(this.presupuestos))
            this.presupuestoBase = this.presupuestos.slice()

            if(this.fetch_presupuestoReal){
                this.fetch_presupuestoReal.map(f => {
                    this.presupuestoReal.map(pr => {
                        pr.presupuestoStart.map( ps => {
                            if(f.partida == ps.partida.id){
                                ps.precio_unitario = f.precio_unitario
                                ps.cantidad = f.cantidad
                            }
                        })
                    })
                })                
            }
            this.isLoad = true
        }, 

        getPresupuestoByID(id) {                    
            if(this.isPBase){
                return this.presupuestoBase.find( i => i.id === id)
            }else{
                return this.presupuestoReal.find( i => i.id === id)
            }              
        },
        addExtraordinario() {
            this.extraordinarios.push( { concepto:'', cantidad_total:0.0001, 
                unidad:1,precio_unitario:0.0001,importe_total:0.0001,pp:0.0001
            })
        },
        deleteRow(index, partida ) {
            var idx = this.extraordinarios.indexOf(partida);
            if (idx > -1) {
                this.extraordinarios.splice(idx, 1);
            }            
        },
        checa(i){      
            this.setPresupuesto( {   
                presupuesto: this.extraordinarios, 
                codigo: 'F' 
            })            
        },
        async fetchPresupuestoBase() {
            const response = await getPresupuestoBaseByAncho(1)
            this.datos = response
            this.loadData()
        },
        async fetchPresupuestoReal() {
            const presupuesto_real = await getPresupuestoRealByIdConvenio(20)
            if(presupuesto_real.length > 0){
                console.log('presupuesto_real')
                console.log(presupuesto_real.length > 0)
                this.$emit('update:editMode', true)
            }
            this.fetch_presupuestoReal = presupuesto_real
        }         
    },
    computed:{
        isVisible(){
            this.presupuestos.map( (element) => {
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
        getTotalPU () {
            this.totalPU = this.getPresupuestoByID(1).subtotalPU +
                this.getPresupuestoByID(2).subtotalPU +
                this.getPresupuestoByID(3).subtotalPU +
                this.getPresupuestoByID(4).subtotalPU  +
                this.extraordinarios.reduce( ( total, x ) => {
                      return  (total || 0) + (x.precio_unitario || 0) 
                },0 )
            return this.totalPU
        },
        getTotalIPL() {
            this.totalIPL = this.getPresupuestoByID(1).subTotalIPL +
                this.getPresupuestoByID(2).subTotalIPL +
                this.getPresupuestoByID(3).subTotalIPL +
                this.getPresupuestoByID(4).subTotalIPL +
                this.getSubtotalIPExt
            this.$emit('update:upTotalIPL', this.totalIPL)
            return this.totalIPL            
        },
        getTotalPP() {
            this.totalPP = this.getPresupuestoByID(1).subTotalPP +
                this.getPresupuestoByID(2).subTotalPP +
                this.getPresupuestoByID(3).subTotalPP +
                this.getPresupuestoByID(4).subTotalPP +
                this.extraordinarios.reduce( ( total, x ) => {
                      return  (total || 0) + (x.importe_total || 0) 
                },0 )

            return this.totalPP            
        },
        colImporteTotalExt() {
            const it = this.extraordinarios.map( ( item ) => {
                item.importe_total = item.cantidad_total * item.precio_unitario
                return item.cantidad_total * item.precio_unitario
            })
            return it
            
        },
        colPPExt() {
            return this.extraordinarios.map( (item) => {
                return (item.importe_total  / this.getTotalIPL) * 100
            })             
        },
        getSubtotalIPExt: {
            get() {
                return this.extraordinarios.reduce ( (total , item) => {
                    return (total || 0 ) + ( 0 || item.importe_total )
                }, 0.000001)
            },
            set(val) {

            }
        },
        getSubtotalPPExt:  {
            get() {
                return this.colPPExt.reduce( ( total, item ) => {
                    return (0 || total) + item             
                }, 0.0001)
            },
            set(val) {

            }
        },
        getTotalIPK() {
            const r = this.presupuestos.reduce( (total, current ) => 
                total + current.subTotalIPK, 0 )
            return r
        },
        isLoaded() {
           return this.isLoad
        }
    },
    created(){                
    },
    beforeMount(){
        console.log('mounted')
        this.fetchPresupuestoReal()
        this.fetchPresupuestoBase()        
    } 
}

const unidad_medida = [
{
    id:1,
    unidad:'HA'
},
{
    id:2,
    unidad:'M3'
},
{
    id:3,
    unidad:'M3'
},
{
    id:4,
    unidad:'M3'
},
{
    id:6,
    unidad:'M3'
},
{
    id:8,
    unidad:'M3'
},
{
    id:9,
    unidad:'M3'
},
{
    id:10,
    unidad:'M3'
},
{
    id:11,
    unidad:'ML'
},
{
    id:13,
    unidad:'ML'
},
{
    id:14,
    unidad:'M3'
},
{
    id:15,
    unidad:'M3'
},
{
    id:16,
    unidad:'M3'
},
{
    id:17,
    unidad:'M3'
},
{
    id:18,
    unidad:'M3'
},
{
    id:19,
    unidad:'PZA'
},
{
    id:20,
    unidad:'PZA'
},
{
    id:21,
    unidad:'ML'
}

]
</script>

<style scoped>

</style>
<template>
<tbody>
    <tr class="concepto">
        <!--CONCEPTOS-->
        <td  :colspan="isPBase?3:3">{{ nombreConcepto }}</td>    
        <!-- IMPORTE POR KILOMETRO (P-BASE)-->          
        <td v-if="isPBase">
            <vue-numeric                 
                v-bind:precision="2" 
                separator="," 
                currency="$"
                class="form-control" 
                v-model="importeTotalKilometro"
                disabled
                >
            </vue-numeric>              
        </td>  
        <td v-show="false" >
            <input v-model="precioUnitarioTotal">
        </td>
        <!--SUB TOTAL PRECIO UNITARIO / IMPORTE POR KILOMETRO -->
        <td v-if="isPBase">    
        </td>         
        <td v-if="!isPBase">            
            <vue-numeric 
                v-bind:precision="2" 
                separator="," 
                currency="$"
                class="form-control" 
                v-model="pu"
                disabled
                >
            </vue-numeric>            
        </td>        
        <!--IMPORTE TOTAL POR LONGITUD -->
        <td v-show="false" ><input v-model="iTotalPorLongitud"></td>
        <td>            
            <vue-numeric 
                v-bind:precision="2" 
                separator="," 
                currency="$"
                class="form-control" 
                v-model="importePorLongitud"
                disabled
                >
            </vue-numeric>  

        <td>
            <!--SUB TOTAL PORCENTAJE PONDERADO -->
            <vue-numeric 
                v-bind:precision="1" 
                currency="%"
                currency-symbol-position="suffix"  
                class="form-control" 
                v-model="subTotalPorcentajePonderado"
                disabled
                >
            </vue-numeric>              
        </td>        
    </tr>
    <tr v-for="(partida, myIndex) in presupuesto" :key="partida.partida.id" 
            :class="partida.partida.subconcepto?'subconcepto':''">
        <td>{{ partida.partida.descripcion }}</td>
        <td>
            <vue-numeric v-bind:precision="2" separator="," 
                v-if="!partida.partida.subconcepto"
                class="form-control cantidad-total" 
                v-model="partida.cantidad"
                v-on:keypress.native="checa(myIndex)"
                :disabled="isPBase?true:false"
                >
            </vue-numeric>
        </td>
        <td>{{ partida.partida.unidad_medida }}</td>
        
        <td v-if="isPBase">                      
            <vue-numeric v-bind:precision="2" currency="$" separator="," 
                v-if="!partida.partida.subconcepto"
                class="form-control" 
                v-model="partida.importe_kilometro"
                disabled
                >
            </vue-numeric>            
        </td>    
        
        <td>
            <vue-numeric v-bind:precision="2" currency="$" separator="," 
                v-if="!partida.partida.subconcepto"
                class="form-control precio-unitario" 
                v-model="partida.precio_unitario"
                v-on:keypress.native="checa(myIndex)"
                :disabled="isPBase?true:false"
                >
            </vue-numeric>
        </td>  
        <td>
            <vue-numeric v-bind:precision="2" currency="$" separator="," 
                v-if="!partida.partida.subconcepto"
                class="form-control" 
                v-model="importeTotal[myIndex]" 
                disabled
                >
            </vue-numeric>
        </td>
        <td>
            <vue-numeric v-bind:precision="2" currency="%"
                class="form-control"
                v-if="!partida.partida.subconcepto"
                disabled
                v-model="porcentajePonderado[myIndex]"
                currency-symbol-position="suffix"                
                >
            </vue-numeric>            
        </td>                              
    </tr>     
</tbody>
</template>

<script>
import Vue from 'vue'
import VueNumeric from 'vue-numeric'
import { mapMutations } from 'vuex'

Vue.use(VueNumeric)

export default {
    name:'TablePresupuesto',
    props: {
        conceptos: {
            type: Object
        },
        myIndex:{
            default:0,
            type: Number
        },
        childTotalPU: {
            default: 0,
            type: Number,
            required: false
        },
        childTotalITPL: {
            default: 0,
            type: Number,
            required: false
        },
        totalIPL: {
            default: 0,
            type: Number,            
        },
        totalPP: {
            default: 0,
            type: Number,            
        },
        isPBase: {
            type: Boolean,
            required: true
        },
        subTotalIPK: {
            default: 0,
            type: Number,
            required: false
        }
    },
    data () {
        return {
            presupuesto:[],
            nombreConcepto:'',
            revisar:0.12,
            pu:0,
            totalprecioUnitario:0,
            importePorLongitud:0,
            importeTotalPorKilimetro:0,
            codigo:''            
        }
    },
    methods:{
        formatNum(num){
            return new Intl.NumberFormat().format(num);
        },
       ...mapMutations('presupuesto', ['setPresupuesto']),
        checa(index){      
        const aConceptos1 = JSON.parse(JSON.stringify(this.$store.state.presupuesto.conceptos))
        console.table(aConceptos1)            
            this.setPresupuesto( {   
                presupuesto: this.presupuesto, 
                codigo: this.codigo 
            })            
        const aConceptos2 = JSON.parse(JSON.stringify(this.$store.state.presupuesto.conceptos))
        aConceptos2.map(a => {
            console.table(a)
        })        
        }
    },
    computed:{
        precioUnitarioTotal () { 
            const total = this.presupuesto.reduce((total, item) => {
                if (!item.subconcepto) {
                    return ( total || 0 ) + Number(item.precio_unitario)
                }else{
                    return  total
                }
            }, 0)
            if(this.isPBase){
                this.$emit('update:upTotalIPLBase', total)
            }else{
                this.$emit('update:childTotalPU', total)
            }                               
            this.pu = total
            return total
        },
        iTotalPorLongitud() {
            const total = this.presupuesto.reduce((total, item) => {
                if (!item.subconcepto) {
                    return ( total || 0 ) + Number(item.precio_unitario * item.cantidad)
                }else{
                    return  total
                }
            }, 0) 
            this.$emit('update:childTotalITPL', total)
            this.importePorLongitud = total
            return total
        },
        importeTotal () {   
            return this.presupuesto.map( (item) => {
                return item.cantidad * item.precio_unitario
            })   
        },
        porcentajePonderado () {
            return this.presupuesto.map( (item) => {
                return (item.importe_total / this.totalIPL) * 100
            }) 
        },
        subTotalPorcentajePonderado: {
            get() {
                const tpp = this.porcentajePonderado.reduce((t, i) => {
                        return  (t || 0) + (i || 0) 
                    })
                this.$emit('update:totalPP', tpp) 
                return tpp                   
            },
            set(val) {
                
            }
        },
        importeTotalKilometro: {
            get () {
                const total = this.presupuesto.reduce((total, item) => {
                    if (!item.subconcepto) {
                        return ( total || 0 ) + 29834.11
                    }else{
                        return  total
                    }
                }, 0) 
                this.$emit('update:subTotalIPK', total)
                //this.importePorLongitud = total
                return total   
            },
            set (val) {}

        }
    },
    created: function () {        
        this.presupuesto = this.conceptos.presupuestoStart
        this.nombreConcepto = this.conceptos.name
        this.codigo = this.conceptos.codigo
        this.presupuesto = this.presupuesto.sort(function (a, b) {
            if (a.partida.id > b.partida.id) {
                return 1;
            }
            if (a.partida.id < b.partida.id) {
                return -1;
            }
            return 0;
            })  
        if(!this.isPBase){
            this.presupuesto.map( p => {
                this.setPresupuesto( {   
                    presupuesto: this.presupuesto, 
                    codigo: this.codigo 
                })  
            })
        }   
    }
}
</script>

<style scoped>

</style>
<template>
<tbody>
    <tr class="concepto">
        <!--CONCEPTOS-->
        <td >{{ nombreConcepto }}</td>    
        <!-- IMPORTE POR KILOMETRO (P-BASE)-->
        <td colspan="5">

        </td>
    </tr>
    <tr v-for="(partida, myIndex) in presupuesto" :key="partida.partida.id" 
            :class="partida.partida.subconcepto?'subconcepto':''">
            
        <td>{{ partida.partida.descripcion }} </td>         
        <td>                    
            <input v-show="false"  v-model="inportek">
            <vue-numeric v-bind:precision="2" separator="," 
                v-if="!partida.partida.subconcepto"
                class="form-control cantidad-total"   
                v-model="partida.cantidad"
                v-on:keypress.native="checa(myIndex)"
                
                >
            </vue-numeric>
        </td>
        <td>{{ partida.partida.unidad_medida }} </td>
        
        <td>
            <vue-numeric 
                v-bind:precision="2"  separator="," 
                v-if="!partida.partida.subconcepto"
                class="form-control precio-unitario" 
                v-model="partida.precio_unitario"
                v-on:keypress.native="checa(myIndex)"
                
                >
            </vue-numeric>
        </td>  


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
        subTotalIPK: {
            default: 0,
            type: Number,
            required: false
        }
    },
    data () {
        return {
            vnumeric:true,
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
        inportek (){
            return this.presupuesto.map(p => {
                if(p.cantidad==''){
                    p.cantidad=0.00100
                    p.precio_unitario=0.00100
                }                
            })
        },
        precioUnitarioTotal () { 
            const total = this.presupuesto.reduce((total, item) => {
                if (!item.subconcepto) {
                    return ( total || 0 ) + Number(item.precio_unitario)
                }else{
                    return  total
                }
            }, 0)
        
                this.$emit('update:upTotalIPLBase', total)
           
            this.pu = total
            return total
        },
        iTotalPorLongitud() {
            let total = 0
        
                total = this.presupuesto.reduce((totalb, item) => {
                    if (!item.subconcepto) {
                        console.log(Number(item.importe_kilometro * this.$route.params.meta))
                        return ( totalb || 0 ) + Number(item.importe_kilometro * this.$route.params.meta)
                    }else{
                        return  totalb
                    }
                }, 0)  
                   

            this.$emit('update:childTotalITPL', total)
            this.importePorLongitud = total
            return total
        },
        importeTotal () {   
      
                return this.presupuesto.map( (item) => {
                    return item.importe_kilometro * this.$route.params.meta
                })                   
            

        },
        porcentajePonderado () {
            return this.presupuesto.map( (item) => {                
                return ( (item.cantidad * item.precio_unitario || 0 ) / (this.totalIPL  || 1)) * 100
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
        this.presupuesto.map(p => {
            console.log('data-->')
            if(p.precio_unitario == null){
                console.log('datasisisis-->')
                console.log(p)
                p.precio_unitario='0.0'
                p.importe_total=''
                p.cantidad=''
                console.log(p)
            }
        })
        this.presupuesto = this.presupuesto.sort(function (a, b) {
            if (a.partida.id > b.partida.id) {
                return 1;
            }
            if (a.partida.id < b.partida.id) {
                return -1;
            }
            return 0;
            })  
       
    }
}
</script>

<style scoped>

</style>
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
                class="form-control" 
                v-model="iTotalPorLongitud1"
                :read-only="vnumeric"
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
                class="form-control" 
                v-model="pu"
                :read-only="vnumeric"
                >
            </vue-numeric>            
        </td>        
        <!--IMPORTE TOTAL POR LONGITUD -->
        <td v-show="false" ><input v-model="iTotalPorLongitud"></td>
        <td>            
            <vue-numeric 
                v-bind:precision="2" 
                separator="," 
                class="form-control" 
                v-model="importePorLongitud"
                :read-only="vnumeric"
                >
            </vue-numeric>  

        <td>
            <!--SUB TOTAL PORCENTAJE PONDERADO -->
            <vue-numeric 
                v-bind:precision="3" 
                currency="%"
                currency-symbol-position="suffix"  
                class="form-control" 
                v-model="subTotalPorcentajePonderado"
                :read-only="vnumeric"
                >
            </vue-numeric>              
        </td>        
    </tr>
    <tr v-for="(partida, myIndex) in presupuesto" :key="partida.partida.id" 
            :class="partida.partida.subconcepto?'subconcepto':''">
            
        <td>{{ partida.partida.descripcion }} </td>         
        <td>                    
            <input v-show="false"  v-model="inportek">
            <vue-numeric 
                v-bind:precision="2" 
                separator="," 
                v-if="!partida.partida.subconcepto"
                class="form-control cantidad-total"   
                v-model="partida.cantidad"
                v-on:keypress.native="checa(myIndex)"
                :read-only="isPBase?true:readOnly"
                >
            </vue-numeric>
        </td>
        <td>{{ partida.partida.unidad_medida }} </td>
        
        <td v-if="isPBase">
            <vue-numeric 
                v-bind:precision="2" separator="," 
                v-if="!partida.partida.subconcepto"
                class="form-control" 
                v-bind:min="0.001"
                v-model="partida.importe_kilometro"
                :read-only="vnumeric"
                >
            </vue-numeric>            
        </td>    
        
        <td>
            <vue-numeric 
                v-bind:precision="2"  separator="," 
                v-if="!partida.partida.subconcepto"
                class="form-control precio-unitario" 
                v-model="partida.precio_unitario"
                v-on:keypress.native="checa(myIndex)"
                :read-only="isPuEditable"
                >
            </vue-numeric>
        </td>  
        <td>    
            <vue-numeric v-bind:precision="2" 
                separator="," 
                v-if="!partida.partida.subconcepto"
                class="form-control" 
                v-model="importeTotal[myIndex]" 
                :read-only="vnumeric"
                >
            </vue-numeric>
        </td>
        <td>
            <vue-numeric v-bind:precision="3" currency="%"
                class="form-control"
                v-if="!partida.partida.subconcepto"
                :read-only="vnumeric"
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
        },
        readOnly:{
            type: Boolean,
            default:false           
        },
    },
    data () {
        return {
            pu:0,
            codigo:'',
            vnumeric:true,
            revisar:0.12,
            presupuesto:[],
            nombreConcepto:'',
            importePorLongitud:0,
            totalprecioUnitario:0,
            importeTotalPorKilimetro:0,
        }
    },
    methods:{
        formatNum(num){
            return new Intl.NumberFormat().format(num);
        },
        ...mapMutations('presupuesto', ['setPresupuesto']),
        checa(index){        
            this.setPresupuesto( {   
                presupuesto: this.presupuesto, 
                codigo: this.codigo 
            })            
    },
        validaCero(item){
            if(item =='' || isNaN(item) ||  item == 0){
                return 0.00100                    
            }
            return item
        },
    },
    computed:{
        inportek (){
            return this.presupuesto.map(p => {        
                p.cantidad=this.validaCero(p.cantidad)
                p.importe_kilometro=this.validaCero(p.importe_kilometro)
                p.precio_unitario=this.validaCero(p.precio_unitario)
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
            if(this.isPBase){
                this.$emit('update:upTotalIPLBase', total)
            }else{
                this.$emit('update:childTotalPU', total)
            }                               
            this.pu = total
            return total
        },
        iTotalPorLongitud() {
            let total = 0
            if(this.isPBase){
                total = this.presupuesto.reduce((totalb, item) => {
                    if (!item.subconcepto) {
                        return ( totalb || 0 ) + Number(item.cantidad * this.$route.params.meta *  item.precio_unitario) 
                    }else{
                        return  totalb
                    }
                }, 0)  
            }else{
                total = this.presupuesto.reduce((total, item) => {
                    if (!item.subconcepto) {
                        return ( total || 0 ) + Number(item.precio_unitario * item.cantidad)
                    }else{
                        return  total
                    }
                }, 0)                 
            }            

            this.$emit('update:childTotalITPL', total)
            this.importePorLongitud = total
            return total
        },


        iTotalPorLongitud1 : {
            get() {
            let total = 0
            if(this.isPBase){
                total = this.presupuesto.reduce((totalb, item) => {
                    if (!item.subconcepto) {
                        return ( totalb || 0 ) + Number(item.importe_kilometro)
                    }else{
                        return  totalb
                    }
                }, 0)  
            }else{
                total = this.presupuesto.reduce((total, item) => {
                    if (!item.subconcepto) {
                        return ( total || 0 ) + Number(item.precio_unitario * item.cantidad)
                    }else{
                        return  total
                    }
                }, 0)                 
            }            
                this.$emit('update:subTotalIPK', total)
                //this.importePorLongitud = total
                return total  
            },
            set() {}
        },        
        importeTotal () {   
            if(this.isPBase){
                return this.presupuesto.map( (item) => {
                    return item.cantidad * this.$route.params.meta * item.precio_unitario
                })                   
            }else{
                return this.presupuesto.map( (item) => {
                    return item.cantidad * item.precio_unitario
                })                    
            }

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
            set(val) {
                
            }
        },
        importeTotalKilometro: {
            get () {
                const total = this.presupuesto.reduce((total, item) => {
                    if (!item.subconcepto) {
                        return ( total || 0 )  + item 
                    }else{
                        return  total
                    }
                }, 0) 
                this.$emit('update:subTotalIPK', total)
                //this.importePorLongitud = total
                return total   
            },
            set (val) {}

        },
    isPuEditable(){
        let isnormativo = this.$store.getters['user/StateRol']=='NORMATIVO'?true:false
        if(this.readOnly)return true
        if(!this.isPBase && isnormativo){            
            return false
        }
        return true
    }
    },
    created: function () {     
        this.presupuesto = this.conceptos.presupuestoStart
        this.nombreConcepto = this.conceptos.name
        this.codigo = this.conceptos.codigo
        this.presupuesto.map(p => {
            if(p.precio_unitario == null){
                p.precio_unitario='0.0'
                p.importe_total=''
                p.cantidad=''
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
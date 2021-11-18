<template>

<tbody>
        <div class="modal fade" :id="nameModal" tabindex="-1" role="dialog" aria-labelledby="ModalPRE" aria-hidden="true" @keydown.esc="clearData()">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5  v-if="typeModal==1" class="modal-title" id="exampleModalLongTitle">Nueva Partida</h5>
                    <h5  v-if="typeModal==2" class="modal-title" id="exampleModalLongTitle">Modificar Partida</h5>
                    <h5  v-if="typeModal==3" class="modal-title" id="exampleModalLongTitle">¿Seguro que quieres eliminar la partida ..?</h5>


                    <!--button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button-->
                </div>
                <div class="modal-body">
                    <div class="row" v-if="typeModal==1">
                        <div class="col-lg-12">
                            <p><strong>{{concepto_descripcion}}</strong></p>
                        </div>
                    </div>
                    <table class="table table-responsive table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">PARTIDA</th>
                                <th scope="col">UNIDAD DE MEDIDA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p v-if="typeModal==3">{{partida_descripcion}}</p>
                                    <textarea v-else class="form-control" v-model="partida_descripcion"></textarea>
                                </td>
                                <td>
                                    <p v-if="typeModal==3">{{partida_unidad_medida_descripcion}}</p>
                                    <select v-model="partida_unidad_medida_id" v-else class="form-control">
                                        <option v-for="unidad_medida in unidad_medida_catalogo" :key="unidad_medida.id" :value="unidad_medida.id">{{unidad_medida.codigo}}</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" v-on:click="closeModal()">Cancelar</button>
                    <button type="button" v-if="typeModal!=3" class="btn btn-primary" v-on:click="actionModal">Guardar</button>
                    <button type="button" v-if="typeModal==3" class="btn btn-primary" v-on:click="deletePartida">Eliminar</button>
                </div>
                </div>
            </div>
        </div>





    <tr class="concepto">
        <!--CONCEPTOS-->
        <td >
            <button v-on:click="openModal('new',null, codigo,nombreConcepto)" class="btn btn-primary" type="button">{{ nombreConcepto }}<span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
        </td>
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
        <td> <button v-if="isEdit(partida.anio)" type="button" @click="someFunction(partida)" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button>
            <button v-else type="button" disabled class="btn btn-primary btn-sm">
                <span class="glyphicon glyphicon-pencil"></span>
            </button>
        </td>
        <td>
            <button v-if="isEdit(partida.anio)" type="button" class="btn btn-primary btn-sm" v-on:click="openModal('delete', partida.partida)">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
            <button v-else type="button" disabled class="btn btn-primary btn-sm">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
        </td>
    </tr>
</tbody>

  

</template>

<script>
import Vue from 'vue'
import VueNumeric from 'vue-numeric'
import { mapMutations } from 'vuex'
import editExtraordinarios from '@/components/Modals/AdminPartidas'
import { getUnidadMedida, editPartida, createPartida, deletePartida }  from '@/api/catalogo_pe'



Vue.use(VueNumeric)

export default {
    name:'TablePresupuestoBase',
     components: {
        editExtraordinarios
    },
    props: {
        nameModal: {
            default: null,
            type: String
        },
        conceptos: {
            type: Object
        },
        myIndex:{
            default:0,
            type: Number
        },showAdminCatalogo:null,unidad_medida_catalogo:[]
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
            codigo:'',
            typeModal: 0, //1=new, 2=edit, 3=delete
            //Modelos para editar/eliminar/crear
            partida_id: null,
            partida_descripcion: null,
            partida_unidad_medida_descripcion: null,
            partida_unidad_medida_id: null,
            unidad_medida_seleccionada:null,
            concepto_codigo:null,
            concepto_descripcion:null
        }
    },
    methods:{
       someFunction(partida) {
           // Do your stuff
           this.showAdminCatalogo(partida);
       },
        
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
        },
        openModal(action,partida=null, concepto_codigo=null,concepto_descripcion=null){
            console.log("Abrir modal");
            console.log(action);
            console.log(partida);
            console.log(concepto_codigo);
            console.log(concepto_descripcion);
            console.log("Fin modal");
            if (action == 'new'){
                this.typeModal=1
                this.concepto_codigo=concepto_codigo
                this.concepto_descripcion=concepto_descripcion
            }if (action == 'edit'){
                this.typeModal=2
            }else if(action == 'delete'){
                this.typeModal=3
            }

            if( partida != null ){
                this.partida_id = partida.id
                this.partida_descripcion = partida.descripcion
                this.partida_unidad_medida_descripcion = partida.unidad_medida
            }

            console.log("Abrir modal");
            console.log("accion:"+this.typeModal);
            console.log(this.concepto_codigo);
            console.log(this.concepto_descripcion);
            console.log("Fin modal");

            $('#'+this.nameModal).modal('show')
        },
        closeModal(action,partida_id){
            $('#'+this.nameModal).modal('hide')
            this.clearData()
        },
        actionModal(){
            if ( this.typeModal == 1 ){
                console.log("Es nuevo");
            }else{
                console.log("Es editar");
            }
        },
        isEdit(year){
            let today = new Date();
            if( (year == today.getFullYear()) || (year == (today.getFullYear()+1) ) )
                return true
            return false
        },
        deletePartida(id){
            console.log("Eliminar partida");
        },
        savePresupuestos(){

        },
        clearData(){
            this.typeModal=0
            this.partida_id= null
            this.partida_descripcion= null
            this.partida_unidad_medida_descripcion= null
            this.partida_unidad_medida_id= null
            this.concepto_codigo=null
            this.concepto_descripcion=null
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
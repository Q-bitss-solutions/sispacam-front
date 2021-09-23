<template>
<table id="datosBeneficiario" class="tableContenido" width="100%" border="0">
    <div class="col-md-12 mx-auto">
        <div class="row">
            <h3>Datos del Beneficiario</h3>
            <hr class="red">
            <form role="form">
                <h3>Presidente Municipal o representante de la comunidad</h3>
                <div class="form-group">
                    <div class="col-sm-4">
                        <label class="control-label" for="nombre">Nombre o nombres</label>
                        <input class="form-control" id="nombre" placeholder="Nombre o nombres" type="text"  v-model="nombre" :class="{'form-control-error': $v.nombre.$error}" :disabled="cons">
                        <div class="row col-md-10">
                            <small v-if="!$v.nombre.required && $v.nombre.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div> 
                    </div>                                  
                    <div class="col-sm-4">
                        <label class="control-label" for="papellido">Primer apellido</label>
                        <input class="form-control" id="apaterno" placeholder="Primer apellido" type="text" v-model="apaterno" :class="{'form-control-error': $v.apaterno.$error}" :disabled="cons">
                        <div class="row col-md-10">
                            <small v-if="!$v.apaterno.required && $v.apaterno.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div> 
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="sapellido">Segundo apellido</label>
                        <input class="form-control" id="amaterno" :disabled="cons" placeholder="Segundo apellido" type="text" v-model="amaterno" :class="{'form-control-error': $v.amaterno.$error}">
                        <div class="row col-md-10">
                            <small v-if="!$v.amaterno.required && $v.amaterno.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div> 
                    </div>
                    <div class="col-sm-4">
                            <label class="control-label" for="juridica">Personalidad Juridica</label>
                            <select class="form-control" id="juridica"  v-model="tipocalle" :disabled="cons">
                                <option>Fisica</option>
                                <option>Moral</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label" for="rfc">RFC del Beneficiario</label>
                            <input 
                                class="form-control" 
                                id="rfc_benef" 
                                @blur="valbenef"
                                placeholder="RFC del Beneficiario" 
                                type="text" 
                                v-model="rfc_benef" 
                                :class="{'form-control-error': $v.rfc_benef.$error}" 
                                >
                            <div class="row col-md-10">
                            <small v-if="!$v.rfc_benef.required && $v.rfc_benef.$error" class="form-text form-text-error">
                                Este campo es obligatorio
                            </small>
                        </div> 
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label" for="cuenta">Clabe Interbancaria</label>
                            <input class="form-control" id="clabe" :disabled="cons" placeholder="Clabe Interbancaria" type="number" onKeyPress="if(this.value.length==18) return false;" min="0" v-model="clabe" :class="{'form-control-error': $v.clabe.$error}">
                            <div class="row col-md-10">
                                <small v-if="!$v.clabe.required && $v.clabe.$error" class="form-text form-text-error">
                                Este campo es obligatorio
                                </small>
                            </div> 
                        </div>
                    <br>
                        <div class="col-sm-4">
                            <label class="control-label" for="calle">Calle</label>
                            <input class="form-control" id="calle" :disabled="cons" placeholder="Calle" type="text" v-model="calle">
                        </div>                        
                        <div class="col-sm-4">
                             <label class="control-label" for="numexterior">Núm. Exterior</label>
                             <input class="form-control" id="next" :disabled="cons" placeholder="Núm. Exterior" type="text" v-model="next">
                        </div>   
                        <div class="col-sm-4">
                            <label class="control-label" for="colonia">Colonia</label>
                            <input class="form-control" id="colonia" :disabled="cons" placeholder="Colonia" type="text" v-model="colonia">
                        </div>                   
                    
                        <div class="col-sm-4">
                            <label class="control-label" for="codpostal">Código postal</label>
                            <input class="form-control" id="cp" :disabled="cons" placeholder="Código postal" type="number" onKeyPress="if(this.value.length==5) return false;" min="0" v-model="cp">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label" for="tipocalle">Tipo de calle</label>
                            <select class="form-control" id="tipocalle"  v-model="tipocalle" :disabled="cons">
                                <option>Calle</option>
                                <option>Boulevard</option>
                                <option>Avenida Principal</option>
                                <option>Privada</option>
                                <option>Ninguno</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <button type="button" v-on:click="DatosBeneficiarios" class="btn btn-default pull-right vertical-buffer" data-toggle="modal">Guardar Datos</button>
                        </div> 
                </div>
                
            </form>
        </div>
        <div class="form-group">
            <div class="col-md-8 form-group">
                <label class="control-label">Beneficiario asignado:</label>
                <input class="form-control" v-model="usuario" type="text" :disabled="cons" placeholder="No hay beneficiario asigando">
                <input class="form-control" v-model="benefasig" type="text" v-show="false">
            </div>           
        </div>
        <div class="row">
        <div class="col-md-12">
          <h5 class="small-top-buffer small-bottom-buffer">Lista de Beneficiarios</h5>
        </div>
      </div>
        <div class="row">
        <div class="col-md-12 table-responsive">            
              <ejs-grid   ref="grid"
                    :dataSource="lista" 
                    :gridLines='lines' 
                    :allowPaging='true' 
                    :allowSorting='true'
                    :pageSettings='pageSettings'
                    :allowFiltering='true'
                    :allowTextWrap='true'
                    :rowSelected='rowSelected'
                    >
            <e-columns>
                <e-column field='id' headerText='id' :visible='flag'></e-column>
                <e-column field='nombre'   headerText='Nombre' ></e-column>
                <e-column field='apaterno' headerText='Primer Apellido' ></e-column>
                <e-column field='amaterno' headerText='Segundo Apellido' ></e-column>
                <e-column field='rfc'      headerText='RFC'></e-column>
                <e-column field='clabe'    headerText='Cable'></e-column>
                <e-column field="id" :template='editTemplateA' headerText='Editar'  :visible='flagEdicion' disabled = "cons"></e-column>  
                <e-column field="id" :template='editTemplateB' @click="asignar" headerText='Asignar' :visible='flagEdicion' disabled = "cons"></e-column>                 
            </e-columns>          
        </ejs-grid>  
        </div>
      </div>
    </div>
</table>    
</template>

<script>
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { generarId } from '@/api/alta-camino';
import Vue from "vue";
import { required } from 'vuelidate/lib/validators'
import { GridPlugin, Sort, Page, Filter} from '@syncfusion/ej2-vue-grids';
import { asignarUsuario } from '@/api/obras'
import ButtonGrid  from '@/components/ButtonGrid'

Vue.use(DropDownListPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(GridPlugin);


export default {
    name: 'DatosCamino',
    props: {
        edo:{
            abreviaturaEdo:'',
            iso:''
        },
        isCanceled:{
            required:true,
            default:false
        }        
    },
    data(){
        return {
            nombre:'',
            apaterno:'',
            amaterno:'',
            rfc_benef:'',
            clabe:'',
            juridica:'',
            calle:'',
            next:'',
            colonia:'',
            cp:'',
            tipocalle:'',
            estatus:'',
            benefasig:'',
            editmode: false,
            cons: true,
            flag: false,
            lista:lista,
            pageSettings: { pageCount: 10, pageSize: 20  },
            flagEdicion:true,
            usuario:'' ,
            lines: 'Both',
            
                }
    },
        validations: {
        nombre: {
            required,

        },
        apaterno: {
            required,
        },
        amaterno: {
            required,
        },
        rfc_benef: {
            required,
        },
        clabe: {
            required,
        },
    },
    provide: {
        grid: [Sort, Page, Filter]
    },
    methods:{ 
        rowSelected: function(args) {
            let selectedrowindex = this.$refs.grid.getSelectedRowIndexes();  // Get the selected row indexes.
            //alert(selectedrowindex); // To alert the selected row indexes.
            let selectedrecords = this.$refs.grid.getSelectedRecords();  // Get the selected records.
            
            this.usuario = selectedrecords[0].nombre + ' ' 
            + selectedrecords[0].apaterno + ' ' + selectedrecords[0].amaterno
            this.id = selectedrecords[0].id
            }, 
            async asignar(){
            const response = await asignarUsuario(this.$route.params.obraId, this.id)
            alert(response.msg) 
        },
        async valbenef() {
            // ...
            
            //12
            if (this.fisica_moral == "M" && this.rfc_benef.length != 12) {
            alert('El RFC capturado no corresponde a una persona moral')
            
             
            }
            //13
            if (this.fisica_moral == "F" && this.rfc_benef.length != 13 ) {
            alert('El RFC capturado no corresponde a una persona fisica')
             
            }
  },
  editTemplateA () { 
            return { 
                template:ButtonGrid,
            }    
        },
editTemplateB () { 
            return { 
                template:ButtonGrid,
            }    
        },
         async DatosBeneficiarios(){   
             this.$emit("show-error", false); 
             this.$v.$touch()
             if (this.$v.$invalid) {
                this.submitStatus = "Error";
            } else {
             this.btnSaveDisabled  = true
             try{
                 const data = {
                    nombre:this.nombre,
                    apaterno:this.apaterno,
                    amaterno:this.amaterno,
                    rfc_benef:this.rfc_benef,
                    clabe:this.clabe,
                    juridica:this.juridica,
                    calle:this.calle,
                    next:this.next,
                    colonia:this.colonia,
                    cp:this.cp,
                    tipocalle:this.tipocalle,
                    estatus:this.estatus
                }
                const response = await generarId(data)
                this.idcamino = response.beneficios + '-' + this.tipoCamino
                $('#addCamino').modal('show')
                this.btnSaveDisabled  = false           
                }
                catch(err){    
                    this.btnSaveDisabled  = false                
                    console.log('error al obtener el Id-Camino')
                    console.log(err)
                    $('#alertModal').modal('show')
                    this.$emit("show-error",'Error al guardar beneficiario');                  
                }
            }
        }
    },
     beforeMount: function () {    
      this.cons = this.isCanceled
  },  
     created(){
        if(this.$route.params.obraId){
            this.editmode = true
        }
    },
   
}


const lista =
[
    {
    id:1,
nombre:'MUNICIPIO ',
apaterno:'SANTA MARIA',
amaterno:'PAPALO',
rfc:'MSM8501011Q0',
clabe:'072610010441984070'
    } ,
    {
            id:2,
nombre:'MUNICIPIO',
apaterno:'SANTOS REYES',
amaterno:'PAPALO',
rfc:'MSR8501013Z4',
clabe:'021610040623344200'
    } ,
    {
id:3,
nombre:'MUNICIPIO',
apaterno:'SAN MATEO',
amaterno:'PIÑAS',
rfc:'MSM850101AX3',
clabe:'072634010448551660'        
    },
    {
id:4,
nombre:'MUNICIPIO',
apaterno:'SANTA MARIA',
amaterno:'TEMAXCALTEPEC',
rfc:'MSM8501015M9',
clabe:'072624010459594273'
    },
    {
id:5,
nombre:'MUNICIPIO',
apaterno:'SANTA MARIA',
amaterno:'TOTOLAPILLA',
rfc:'MSM9601018X3',
clabe:'012610001152679863'
    },
    {
id:6,
nombre:'MUNICIPIO',
apaterno:'SAN JUAN',
amaterno:'CIENEGUILLA',
rfc:'MSJ850101GZ0',
clabe:'072614010461517410'
    },
    {
id:7,
nombre:'MUNICIPIO',
apaterno:'VALERIO',
amaterno:'TRUJANO',
rfc:'MVT850101N90',
clabe:'012610001131975148'
    }
]

</script>


<style scoped>

</style>

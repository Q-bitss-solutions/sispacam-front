<template>
    <Modal
        :title="modalTitle" 
        modal-class="modal2  modal-xl"
        wrapper-class="modal-wrapper"   
        v-model="showAdminModalBeneficiario" 
        @before-open="beforeOpen" 
        @before-close="beforeClose"    
    >     
        <form role="form">
             <div class="form-row">                 
                <div class="form-group col-md-12">

                    <label class="control-label" for="razonSocial">Búsqueda del Beneficiario</label>
                        <ejs-autocomplete
                            :readonly="isReadOnly"
                            autofill="true"
                            :value="formBeneficiario.findRazonSocial"
                            v-model="formBeneficiario.findRazonSocial"
                            v-on:filtering="getBeneficiarios($event)"                            
                            :fields="dataFields"
                            :highlight="true"
                            :ignoreAccent="true"
                            :select="setValues"
                            v-on:change="onChange($event.value)"
                            :suggestionCount='suggestionCount'
                            placeholder="Buscar al Beneficiario"
                            :noRecordsTemplate="'No se encontraron coincidencias'"
                        ></ejs-autocomplete>                                     
                </div> 
             </div>             
            <div class="form-row">
                <div class="form-group col-md-8">
                    <label class="control-label" >
                        Nombre del Beneficiario
                    </label>
                    <input 
                        class="form-control" 
                        id="nombre" 
                        placeholder="Nombre del Beneficiario" 
                        type="text" 
                        disabled="true"
                        v-model="formBeneficiario.razonSocial" 
                        :class="{'form-control-error': $v.formBeneficiario.razonSocial.$error}"
                    >
                    <small v-if="!$v.formBeneficiario.razonSocial.required" class="form-text form-text-error">
                        Este campo es obligatorio
                    </small>                    
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label" for="rfc">RFC</label>
                    <input 
                        class="form-control" 
                        id="rfc" 
                        disabled="true"
                        placeholder="RFC" 
                        type="text" 
                        v-model="formBeneficiario.rfc" 
                        :class="{'form-control-error': $v.formBeneficiario.rfc.$error}" 
                        >  
                        <small v-if="!$v.formBeneficiario.rfc.required" class="form-text form-text-error">
                            Este campo es obligatorio
                        </small>                                           
                </div>                 
                              
            </div>    
            <div class="form-row"> 
                <div class="form-group col-md-4">
                    <label class="control-label" for="cuenta">Clabe Interbancaria</label>
                    <input class="form-control" 
                        id="clabe" 
                        placeholder="Clabe Interbancaria" 
                        type="number"  
                        disabled="true"
                        min="0" 
                        max="18"
                        v-model="formBeneficiario.cveInterbancaria" 
                        :class="{'form-control-error': $v.formBeneficiario.cveInterbancaria.$error}"
                    >
                    <small v-if="!$v.formBeneficiario.cveInterbancaria.required" class="form-text form-text-error">
                        Este campo es obligatorio
                    </small>                    
                </div> 
                <div class="form-group col-md-4">
                    <label class="control-label" for="cuenta">CURP</label>
                    <input class="form-control" 
                        :disabled="isReadOnly"
                        id="curp" 
                        placeholder="CURP" 
                        
                        min="0" 
                        max="18"
                        v-model="formBeneficiario.curp" 
                        :class="{'form-control-error': $v.formBeneficiario.curp.$error}"
                    >
                    <small v-if="!$v.formBeneficiario.curp.required" class="form-text form-text-error">
                        Formato no valido
                    </small>                    
                </div>      
                <div class="form-group col-md-2">
                    <label class="control-label" for="cuenta">Edad</label>
                    <input class="form-control" 
                        id="edad" 
                        disabled="true"
                        placeholder="Edad" 
                        type="number" 
                        v-model="formBeneficiario.edad" 
                        :class="{'form-control-error': $v.formBeneficiario.edad.$error}"
                    >
                    <small v-if="!$v.formBeneficiario.edad.required" class="form-text form-text-error">
                        Obligatorio
                    </small>                    
                </div>  
                <div class="form-group col-md-2">
                    <label class="control-label" for="cuenta">Género</label>
                    <input class="form-control" 
                        id="genero" 
                        disabled="true"
                        placeholder="Género" 
                        v-model="formBeneficiario.genero" 
                        :class="{'form-control-error': $v.formBeneficiario.genero.$error}"
                    >
                    <small v-if="!$v.formBeneficiario.genero.required" class="form-text form-text-error">
                        Obligatorio
                    </small>                    
                </div>                                           
            </div>  
            <div class="form-row">
                <div class="form-group col-md-4">
                        <label class="control-label" for="calle">Calle</label>
                        <input 
                            :disabled="isReadOnly"
                            class="form-control" 
                            id="calle" 
                            placeholder="Calle" 
                            type="text" 
                            v-model="formBeneficiario.calle"
                        > 
                </div>
                <div class="form-group col-md-4">
                    <label 
                        class="control-label" 
                        for="numexterior">Núm. Exterior</label>
                    <input 
                        :disabled="isReadOnly"
                        class="form-control" 
                        id="next" 
                        placeholder="Núm. Exterior" 
                        type="text" 
                        v-model="formBeneficiario.next"
                    >
                </div>
                <div class="form-group col-md-4">
                    <label
                        class="control-label" 
                        for="colonia">Colonia</label>
                    <input 
                        :disabled="isReadOnly"
                        class="form-control" 
                        id="colonia" 
                        placeholder="Colonia" 
                        type="text" 
                        v-model="formBeneficiario.colonia"
                    >
                </div>                
            </div> 
            <div class="form-row">
                <div class="form-group col-md-4">
                    <input 
                        class="form-control" 
                        id="cp" 
                        disabled="true"
                        placeholder="Código Postal" 
                        type="text" 
                        v-model="formBeneficiario.cp"
                    >                    
                </div>
            </div>
            <div class="row modal-footer">
                <div class="col-md-12 text-right">
                <div class="col-md-10"> 
                    <button 
                        class="btn btn-primary" 
                        type="button" 
                        @click="clearData(); showAdminModalBeneficiario = false"
                    >
                        Cancelar
                    </button>   
                </div>             
                <div class="col-md-2"> 
                    <button 
                        class="btn btn-default" 
                        type="button" 
                        :disabled="isReadOnly"
                        @click="updateBeneficiario()"
                    >
                        Aceptar
                    </button>
                </div>                    
                </div>
            </div>                        
        </form>        
    </Modal>
</template>

<script>
import Vue from 'vue';
import Vuelidate from 'vuelidate'
import { Loading } from 'element-ui';
import VueModal from '@kouts/vue-modal'
import { required,} from 'vuelidate/lib/validators'
import { FilteringEventArgs } from "@syncfusion/ej2-dropdowns";
import { AutoCompleteComponent, AutoCompletePlugin } from '@syncfusion/ej2-vue-dropdowns';
import { searchBeneficiario, updateBebeniciarioSia, 
        getEdadAndGenero, getBeneficiario } from '@/api/convenio'; 


Vue.use(Vuelidate)
Vue.use(AutoCompletePlugin);

const isValidCurp = () => curpValida(value)

    export default {
        name:'ModalBeneficiario',
        props:{
            isReadOnly:{
                type: Boolean,
                default: false,
                readOnly: true,
            },
            beneficiario_id:{
                type:Number,
                default:0,
                required:true
            }
        },
        components:{
        'Modal': VueModal,
        },        
        data(){
            return {
                modalTitle:'Beneficiario',                
                showAdminModalBeneficiario:false,
                suggestionCount: 5,
                findRazonSocial:'',
                formBeneficiario:{
                    id:'',
                    razonSocial:'',
                    rfc:'',
                    cveInterbancaria:'',
                    curp:'',
                    edad:'',
                    genero:'',
                    calle:'',
                    colonia:'',
                    cp:'',
                    next:'',
                    findRazonSocial:''
                },
                dataFields: { text: 'beneficiario', value: 'idbenef' },
            }
        },
        validations(){
            return{
            formBeneficiario:{
                razonSocial:{ required },
                rfc:{ required },
                cveInterbancaria:{ required },
                curp:{ 
                    required:this.curpValida
                },
                edad:{ required },
                genero:{ required },
                calle:{required },
                colonia:{required },
            }
            }
        },
        methods:{
            async getBeneficiarios($event) {
                $event.preventDefaultAction = true;
                if ($event.text.length < 5) {
                    $event.cancel = true;
                    return;
                }
                let loadingInstance = Loading.service({ 
                    fullscreen: false, 
                    lock: true,
                 });
                await searchBeneficiario($event.text).then( (response) => {
                    $event.updateData(response);
                }).finally( () => {
                    loadingInstance.close();
                })                            
            },    
            setValues(value){
                this.formBeneficiario.razonSocial = value['itemData'].beneficiario
                this.formBeneficiario.rfc = value['itemData'].rfc_benef
                this.formBeneficiario.cveInterbancaria = value['itemData'].clabe
                this.formBeneficiario.id = value['itemData'].idbenef
                this.formBeneficiario.cp = value['itemData'].cp


            },
            clearData(){
                this.formBeneficiario.id = ''
                this.formBeneficiario.razonSocial = ''
                this.formBeneficiario.rfc = ''
                this.formBeneficiario.cveInterbancaria = ''
                this.formBeneficiario.curp = ''
                this.formBeneficiario.edad = ''
                this.formBeneficiario.genero = ''
                this.formBeneficiario.calle = ''
                this.formBeneficiario.colonia = ''
                this.formBeneficiario.cp = ''
                this.formBeneficiario.findRazonSocial = ''                
            },
            async updateBeneficiario(){
                console.log(this.$parent)
                await updateBebeniciarioSia(this.formBeneficiario)
                    .then(() => {

                    })
                    .catch((error) => {
                        console.log('error')
                        console.log(error)
                    })
                    .finally(() => {

                    })

            },
            onChange(value){
                console.log('event')
                console.log(value)
                if(!value){
                    this.clearData()
                }
            },
            beforeOpen(){

            },
            beforeClose(){
                this.clearData()
            },
            async getEdadAndGenero(){
                this.formBeneficiario.edad = ''
                this.formBeneficiario.genero = ''               
                let loadingInstance = Loading.service({ 
                    fullscreen: false, 
                    lock: true,
                 });                
                const resp = await getEdadAndGenero(this.formBeneficiario.curp).finally(() => {
                    loadingInstance.close();
                })
                console.log('edad')
                console.log(resp)
                if(resp.length > 0){
                    console.log('g===', resp[0].gender )
                    this.formBeneficiario.edad = resp[0].age
                    this.formBeneficiario.genero = resp[0].gender
                }
            },
            curpValida(curp) {
                if(typeof curp === 'string'){
                    if(curp.length == 18){
                        var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
                            validado = curp.match(re);                        
                        if (!validado)  //Coincide con el formato general?
                            return false;                        
                        //Validar que coincida el dígito verificador
                        function digitoVerificador(curp17) {
                            //Fuente https://consultas.curp.gob.mx/CurpSP/
                            var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
                                lngSuma      = 0.0,
                                lngDigito    = 0.0;
                            for(var i=0; i<17; i++)
                                lngSuma= lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
                            lngDigito = 10 - lngSuma % 10;
                            if(lngDigito == 10)
                                return 0;
                            return lngDigito;
                        }
                        if (validado[2] != digitoVerificador(validado[1])) 
                            return false;
                        this.getEdadAndGenero()    
                        return true; //Validado
                    } 
                } 
                return true
            }
          
        },
        created() {
        },
        filters: {
            upperCased: function (data) {
                let upper = [];
                data.split(" ").forEach((word) => {
                    upper.push(word.toUpperCase());
                });
                return upper.join(" ");
            },
        },
        watch:{
            'formBeneficiario.curp':function (val){
                this.formBeneficiario.curp = this.$options.filters.upperCased(val);
            },  
            'formBeneficiario.calle':function (val){
                this.formBeneficiario.calle = this.$options.filters.upperCased(val);
            },            
            'formBeneficiario.colonia':function (val){
                this.formBeneficiario.colonia = this.$options.filters.upperCased(val);
            },                                
            deep: true
        },                   
    }

    
</script>

<style>

fieldset.scheduler-border {
    border: 1px groove #ddd !important;
    padding: 0 1.4em 1.4em 1.4em !important;
    margin: 0 0 1.5em 0 !important;
    -webkit-box-shadow:  0px 0px 0px 0px #000;
            box-shadow:  0px 0px 0px 0px #000;
}

    legend.scheduler-border {
        font-size: 1.2em !important;
        font-weight: bold !important;
        text-align: left !important;
        width:auto;
        padding:0 10px;
        border-bottom:none;
    }

.scrollable-modal {
  display: flex!important;
  flex-direction: column!important;
  height: calc(100% - 50px)!important;
}
.scrollable-modal .vm-titlebar {
  flex-shrink: 0!important;
}
.scrollable-modal .vm-content {
  padding: 0!important;
  flex-grow: 1!important;
  display: flex!important;
  flex-direction: column!important;
  min-height: 0!important; 
}
.scrollable-modal .vm-content .scrollable-content {
  position: relative!important;
  overflow-y: auto!important;
  overflow-x: hidden!important;
  padding: 10px 15px 10px 15px!important;
  flex-grow: 1!important;
}
.scrollable-modal .scrollable-modal-footer {
  padding: 15px 0px 15px 0px!important;
  border-top: 1px solid #e5e5e5!important;
  margin-left: 0!important;
  margin-right: 0!important;
}

.modal-wrapper {
  display: flex!important;
  align-items: center!important;
}
.modal-wrapper .vm {
  top: auto!important;
}

.modal {
  min-width: 300px;
}
@media (min-width: 480px) {
  .modal.modal-sm {
    max-width: 300px!important;
  }
}
@media (min-width: 992px) {
  .modal.modal-lg,
  .modal.modal-xl {
    max-width: 800px!important;
  }
}
@media (min-width: 1200px) {
  .modal.modal-xl {
    max-width: 1140px!important;
  }
}
.modal-footer {
  padding: 15px 0px 0px 0px!important;
  border-top: 1px solid #e5e5e5!important;
  margin-left: -14px!important;
  margin-right: -14px!important;
}
.el-loading-mask{
    z-index: 9999999999999 !important;
}
</style>
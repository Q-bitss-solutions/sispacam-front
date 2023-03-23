<template>
    <Modal
        :title="modalTitle" 
        modal-class="scrollable-modal modal2  modal-xl"
        wrapper-class="modal-wrapper"   
        v-model="showAdminModalBeneficiario" 
        @before-open="beforeOpen" 
        @before-close="beforeClose"    
    >     
        <form class="form-group scrollable-content">
            <div class="form-row row">
                <div class="form-group col-md-5">
                    <label class="control-label" for="cuenta">Clabe Interbancaria</label>
                    <input class="form-control" 
                        id="clabe" 
                        placeholder="Clabe Interbancaria" 
                        type="number"
                        v-model="formBeneficiario.cveInterbancaria" 
                        :class="{'form-control-error': $v.formBeneficiario.cveInterbancaria.$error}"
                    >
                </div>
                <div class="form-group col-md-5">
                    <label class="control-label" for="rfc">RFC</label>
                    <input 
                        class="form-control" 
                        id="rfc" 
                        placeholder="RFC" 
                        type="text" 
                        v-model="formBeneficiario.rfc" 
                        :class="{'form-control-error': $v.formBeneficiario.rfc.$error}" 
                        >                                          
                </div>                                                       
            </div>  
            <div class="form-row row">
                <div class="form-group col-md-12">
                <label class="form-group-sm" style="font-weight: bold;">
                        Presidente Municipal o representante de la comunidad
                </label>
                </div>
                <div class="form-group col-md-4">
                    <label for="nom_pm">
                        Nombre(s)
                    </label>
                    <input 
                        v-model="formBeneficiario.nombre" 
                        class="form-control"
                        name="nom_pm"
                        id="nom_pm"
                        type="text"
                        placeholder="Nombre(s)"
                    >
                </div>    
                <div class="form-group col-md-4">
                    <label for="nom_pm">
                        Primer Apellido
                    </label>
                    <input 
                        v-model="formBeneficiario.papellido" 
                        class="form-control"
                        name="pa_pm"
                        id="pa_pm"
                        type="text"
                        placeholder="Primer Apellido"
                    >                    
                </div>                     
                <div class="form-group col-md-4">
                    <label for="seg_pm">
                        Segundo Apellido
                    </label>
                    <input 
                        v-model="formBeneficiario.sapellido" 
                        class="form-control"
                        name="pa_pm"
                        id="seg_pm"
                        type="text"
                        placeholder="Segundo Apellido"
                    >                     
                </div>                                               
            </div>
            <div class="form-row row">
                <div class="form-group col-md-3">
                    <label class="control-label" for="cuenta">CURP</label>
                    <input 
                        autocomplete="off"
                        class="form-control" 
                        :disabled="isReadOnly"
                        id="curp" 
                        placeholder="CURP"                         
                        v-model="formBeneficiario.curp" 
                        :class="{'form-control-error': $v.formBeneficiario.curp.$error}"
                    >
                    <small v-if="!$v.formBeneficiario.curp.required" class="form-text form-text-error">
                        Formato no valido
                    </small>                    
                </div>      
                <div class="form-group col-md-3">
                    <label class="control-label" for="cuenta">Cumpleaños</label>
                    <input class="form-control" 
                        id="edad"
                        placeholder="Edad" 
                        type="date"
                        v-model="formBeneficiario.edad" 
                        :class="{'form-control-error': $v.formBeneficiario.edad.$error}"
                    >                 
                </div>  
                <div class="form-group col-md-2">
                    <label class="control-label" for="cuenta">Género</label>
                    <input class="form-control" 
                        id="genero" 
                        placeholder="Género" 
                        v-model="formBeneficiario.genero" 
                        :class="{'form-control-error': $v.formBeneficiario.genero.$error}"
                    >                  
                </div>                   
                <div class="form-group col-md-4">
                        <label class="control-label" for="calle">Calle</label>
                        <input 
                            autocomplete="off"
                            :disabled="isReadOnly"
                            class="form-control" 
                            id="calle" 
                            placeholder="Calle" 
                            type="text" 
                            v-model="formBeneficiario.calle"
                        > 
                </div>
            </div>

            <div class="form-row row">
                <div class="form-group col-md-4">
                    <label 
                        class="control-label" 
                        for="numexterior">Núm. Exterior</label>
                    <input 
                        autocomplete="off"
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
                        autocomplete="off"
                        :disabled="isReadOnly"
                        class="form-control" 
                        id="colonia" 
                        placeholder="Colonia" 
                        type="text" 
                        v-model="formBeneficiario.colonia"
                    >
                </div>      
                <div class="form-group col-md-4">
                    <label
                        class="control-label" 
                        for="colonia">C. P.</label>                    
                    <input 
                        class="form-control" 
                        id="cp" 
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
                        @click="saveBeneficiario()"
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
import { storeRepresentative } from '@/api/beneficiarios'


Vue.use(Vuelidate)
Vue.use(AutoCompletePlugin);

var itemVue = Vue.component("itemTemplate", {
  template: `<span class='r-beneficiario'>{{data.beneficiario}}</span>`,
  data() {
    return {
      data: {}
    };
  }
});
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
            },
            convenioId: {
                type: Number,
                default: 0,
            },
        },
        components:{
        'Modal': VueModal,
        },        
        data(){
            return {
                iTemplate: function(e) {
                return {
                    template: itemVue
                };
            },
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
                    nombre:'',
                    papellido:'',
                    sapellido:'',                    
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
                this. clearData()
                this.formBeneficiario.razonSocial = value['itemData'].beneficiario
                this.formBeneficiario.rfc = value['itemData'].rfc_benef
                this.formBeneficiario.cveInterbancaria = value['itemData'].clabe
                this.formBeneficiario.id = value['itemData'].idbenef
                this.formBeneficiario.cp = value['itemData'].cp
                this.formBeneficiario.curp = value['itemData'].curp
                this.formBeneficiario.edad = value['itemData'].edad
                this.formBeneficiario.genero = value['itemData'].genero
                this.formBeneficiario.calle = value['itemData'].calle
                this.formBeneficiario.next = value['itemData'].next
                this.formBeneficiario.colonia = value['itemData'].colonia
                this.formBeneficiario.nombre = value['itemData'].nombre_pm
                this.formBeneficiario.papellido = value['itemData'].primera_pm
                this.formBeneficiario.sapellido = value['itemData'].segundoa_pm
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
                this.formBeneficiario.nombre = ''                
                this.formBeneficiario.papellido = ''                
                this.formBeneficiario.sapellido = ''                
            },
            async saveBeneficiario(){
                const loading = Loading.service({
                    fullscreen: false,
                    lock: true,
                })
                try {
                    await storeRepresentative({
                        id_convenio: this.convenioId,
                        nombre_representante: this.formBeneficiario.nombre,
                        primer_a_representante: this.formBeneficiario.papellido,
                        segundo_a_representante: this.formBeneficiario.sapellido,
                        fecha_nacimiento: this.formBeneficiario.edad,
                        fecha_inicio: null,
                        fecha_fin: null,
                        curp: this.formBeneficiario.curp,
                        rfc: this.formBeneficiario.rfc,
                        clabe: this.formBeneficiario.cveInterbancaria,
                        genero: this.formBeneficiario.genero,
                        calle: this.formBeneficiario.calle,
                        num_ext: this.formBeneficiario.next,
                        colonia: this.formBeneficiario.colonia,
                        cp: this.formBeneficiario.cp,
                    })
                    await this.$parent.getRepresentativesByAgreement(this.convenioId)
                    this.showAdminModalBeneficiario = false
                    this.$swal('Representante registrado', 'Representante registrado satisfactoriamente.', 'success')
                } catch (error) {
                    this.$swal('Validacion de campos', error.detail ? error.detail : JSON.stringify(error), 'error')
                }
                loading.close()
            },
            async loadbeneficiario(idbenef){
                if(idbenef!= 0){
                    let loadingInstance = Loading.service({ fullscreen: true, lock: true });
                    const resp = await getBeneficiario(idbenef)              
                        this.formBeneficiario.razonSocial = resp[0].beneficiario
                        this.formBeneficiario.rfc = resp[0].rfc_benef
                        this.formBeneficiario.cveInterbancaria = resp[0].clabe
                        this.formBeneficiario.id = resp[0].idbenef
                        this.formBeneficiario.cp = resp[0].cp
                        this.formBeneficiario.curp = resp[0].curp
                        this.formBeneficiario.edad = resp[0].edad
                        this.formBeneficiario.genero = resp[0].genero
                        this.formBeneficiario.calle = resp[0].calle
                        this.formBeneficiario.next = resp[0].next
                        this.formBeneficiario.colonia = resp[0].colonia    
                        this.formBeneficiario.nombre = resp[0].nombre_pm    
                        this.formBeneficiario.papellido = resp[0].primera_pm
                        this.formBeneficiario.sapellido = resp[0].segundoa_pm
                        loadingInstance.close();  
                }            
            },
            onChange(value){
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
                if(resp.length > 0){
                    this.formBeneficiario.edad = resp[0].age
                    this.formBeneficiario.genero = resp[0].gender
                }
            },
            curpValida(curp) {
                this.formBeneficiario.edad = ''
                this.formBeneficiario.genero = ''                   
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
                return false
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
                if(val)
                    this.formBeneficiario.curp = this.$options.filters.upperCased(val);
            },  
            'formBeneficiario.calle':function (val){
                if(val)
                    this.formBeneficiario.calle = this.$options.filters.upperCased(val);
            },            
            'formBeneficiario.colonia':function (val){
                if(val)
                    this.formBeneficiario.colonia = this.$options.filters.upperCased(val);
            },                                
            deep: true
        },                   
    }

    
</script>

<style scoped>

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
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
                        <input class="form-control" id="nombre" placeholder="Nombre o nombres" type="text"  v-model="nombre" :class="{'form-control-error': $v.nombre.$error}" >
                        <div class="row col-md-10">
                            <small v-if="!$v.nombre.required && $v.nombre.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div> 
                    </div>  
                                                     
                    <div class="col-sm-4">
                        <label class="control-label" for="papellido">Primer apellido</label>
                        <input class="form-control" id="papellido" placeholder="Primer apellido" type="text" v-model="apaterno" :class="{'form-control-error': $v.apaterno.$error}">
                        <div class="row col-md-10">
                            <small v-if="!$v.apaterno.required && $v.apaterno.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div> 
                    </div>
                    
                    <div class="col-sm-4">
                        <label class="control-label" for="sapellido">Segundo apellido</label>
                        <input class="form-control" id="sapellido" placeholder="Segundo apellido" type="text" v-model="amaterno" :class="{'form-control-error': $v.amaterno.$error}">
                        <div class="row col-md-10">
                            <small v-if="!$v.amaterno.required && $v.amaterno.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div> 
                    </div>

                    <br></br>
                    <br></br>
                    <tr>
                        <div class="col-sm-6">
                            <label class="control-label" for="rfc">RFC del Beneficiario</label>
                            <input class="form-control" id="rfc" placeholder="RFC del Beneficiario" type="text" v-model="rfc_benef" :class="{'form-control-error': $v.rfc_benef.$error}">
                            <div class="row col-md-10">
                                <small v-if="!$v.rfc_benef.required && $v.rfc_benef.$error" class="form-text form-text-error">
                                Este campo es obligatorio
                                </small>
                            </div> 
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label" for="cuenta">Clabe Interbancaria</label>
                            <input class="form-control" id="cuenta" placeholder="Clabe Interbancaria" type="number" onKeyPress="if(this.value.length==18) return false;" min="0" v-model="clabe" :class="{'form-control-error': $v.clabe.$error}">
                            <div class="row col-md-10">
                                <small v-if="!$v.clabe.required && $v.clabe.$error" class="form-text form-text-error">
                                Este campo es obligatorio
                                </small>
                            </div> 
                        </div>
                    </tr>
                    <br>
                    
                        <div class="col-sm-4">
                            <label class="control-label" for="calle">Calle</label>
                            <input class="form-control" id="calle" placeholder="Calle" type="text" v-model="calle">
                        </div>                        
                        <div class="col-sm-4">
                             <label class="control-label" for="numexterior">Núm. Exterior</label>
                             <input class="form-control" id="numexterior" placeholder="Núm. Exterior" type="text" v-model="next">
                        </div>
                    
                    
                       
                    <div class="col-sm-4">
                        <label class="control-label" for="colonia">Colonia</label>
                        <input class="form-control" id="colonia" placeholder="Colonia" type="text" v-model="colonia">
                    </div>                   
                    
                    <tr>
                        <div class="col-sm-4">
                            <label class="control-label" for="codpostal">Código postal</label>
                            <input class="form-control" id="codpostal" placeholder="Código postal" type="number" onKeyPress="if(this.value.length==5) return false;" min="0" v-model="cp">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label" for="tipocalle">Tipo de calle</label>
                            <select class="form-control" id="tipocalle" v-model="tipocalle">
                                <option>Calle</option>
                                <option>Boulevard</option>
                                <option>Avenida Principal</option>
                                <option>Privada</option>
                                <option>Ninguno</option>
                            </select>
                        </div>
                    </tr>
                </div>
            </form>
        </div>
        <div class="form-group">
            <div class="row">
            <button type="button" class="btn btn-default pull-right vertical-buffer" data-toggle="modal"
            v-on:click="DatosBeneficiarios" >
            Siguiente
            </button>
            </div>
        </div>
        <!--
        <div class="form-group">
        
        <button type="button" class="btn btn-default pull-right vertical-buffer" data-toggle="modal"
            v-on:click="DatosBeneficiarios"   >
            Guardar
        </button>
        </div>
        -->
    </div>
</table>    
</template>

<script>
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { generarId } from '@/api/alta-camino';
import Vue from "vue";
import { required } from 'vuelidate/lib/validators'

Vue.use(DropDownListPlugin);
Vue.use(NumericTextBoxPlugin);

export default {
    name: 'DatosCamino',
    props: {
        edo:{
            abreviaturaEdo:'',
            iso:''
        },
    },
    data(){
        return {
            nombre:'',
            apaterno:'',
            amaterno:'',
            rfc_benef:'',
            clabe:'',
            calle:'',
            next:'',
            colonia:'',
            cp:'',
            tipocalle:'',

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
    methods:{ 
         async DatosBeneficiarios(){   
             this.$emit("show-error", false); 
             this.$v.$touch()
             if (this.$v.$invalid) {
                this.submitStatus = "Error";
            } else {
             this.btnSaveDisabled  = true
             try{
                 console.log("GenerarId50")
                 const data = {
                    nombre:this.nombre,
                    apaterno:this.apaterno,
                    amaterno:this.amaterno,
                    rfc_benef:this.rfc_benef,
                    clabe:this.clabe,
                    calle:this.calle,
                    next:this.next,
                    colonia:this.colonia,
                    cp:this.cp,
                    tipocalle:this.tipocalle
                }
                console.log('data')
                console.log(data)
                const response = await generarId(data)
                console.log(response)
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
    }
}
</script>

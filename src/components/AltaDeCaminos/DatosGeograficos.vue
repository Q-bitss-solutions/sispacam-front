<template>
<div>
<table ref="datosPersonales" id="datosPersonales" class="tableContenido" width="100%" border="0">
    <tbody>
        <tr>
            <td>
                <h2>Estado, Localidad y Municipio</h2>
                <hr class="red">
            </td>
        </tr>        
        <tr>
            <td>
                <div class="form-group">
                    <div class="col-md-6">
                        <label class="control-label" for="estado">Estado</label>
                        <ejs-combobox  :class="{'form-control-error': $v.icve_estado_inegi.$error}"
                            id="estado"
                          :dataSource="estadosData"
                          :fields="estadosFields"
                          placeholder="Selecciona un estado"
                          :change="obtenerMunicipios"
                          :enabled="estadosHabilitado"
                          v-model="icve_estado_inegi"
                          :disabled = "editmode"
                          ref="refEstado"
                          :value="valueEstado"
                          
                        >
                        </ejs-combobox>    
                        <div class="row col-md-10">
                            <small v-if="!$v.icve_estado_inegi.required && $v.icve_estado_inegi.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div>                                                         
                    </div>
                    <div class="col-md-6">
                        <label class="control-label" for="municipio">Municipio</label>
                        <ejs-combobox :class="{'form-control-error': $v.icve_municipio.$error}"
                            id="municipio"
                            :dataSource="municipiosData"
                            :fields="municipiosFields"
                            placeholder="Selecciona un municipio"
                            :close="obtenerLocalidades"
                            :enabled="municipiosHabilitado"
                            v-model="icve_municipio"
                            ref="refMunicipio"
                        >
                        </ejs-combobox>                   
                            <div class="row col-md-10">
                            <small v-if="!$v.icve_municipio.required && $v.icve_municipio.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div>                                                              
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-6">
                    </div>                    
                    <div class="col-md-6">
                        <label class="control-label" >Localidad</label>
                        <ejs-multiselect
                        :dataSource="localidadesData"
                        :fields="localidadesFields"
                        placeholder="Selecciona una localidad"
                        :enabled="localidadesHabilitado"
                        v-model="localidades"
                        id="localidades"
                        ref="localidades"
                        :close="updateLocalidades"
                        :removed="updateLocalidades"                                               
                        >
                        </ejs-multiselect>
                    </div>                    
                </div>

                <div>
                    <h2>Datos a nivel municipal</h2>
                    <hr class="red">
                </div>   
                <div id="datosNivelMunicipal" class="table-responsive">  
                    <div class="col-md-12 help-block"></div>  
                    <div class="col-md-6">
                        <label>Regi&oacute;n:</label>
                    </div>
                    <div class="col-md-6">
                        <input id="region" v-on:change="actualizadatos" v-model="region" placeholder="Región" maxlength="40" class="form-control">
                    </div> 
                    <div class="col-md-12 help-block"></div>   
                    <div class="col-md-6">
                        <label>Ubicaci&oacute;n:</label>
                    </div>
                    <div class="col-md-6">
                        <input id="ubicacion" v-on:change="actualizadatos" v-model="ubicacion" v-on:keyup="fubicacion" placeholder="Ubicación" class="form-control">
                    </div>
                    <div class="col-md-12 help-block"></div>            
                    <div class="col-md-6">
                        <label>Poblacion ind&iacute;gena</label>
                    </div>                                  
                    <div class="col-md-6">
                        <input v-model="poblacion_indigena" class="form-control" type="text" placeholder="Población indígena" id="poblacion_indigena" disabled>
                    </div>                       
                    <div class="col-md-12 help-block"></div>          
                    <div class="col-md-6">
                        <label>Grado de marginaci&oacute;n:</label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" disabled v-model="marginacion" class="form-control">                      
                    </div>  
                    <div class="col-md-12 help-block"></div>   
                    <div class="col-md-6">
                        <label >Total de población indígena:</label>
                    </div>
                    <div class="col-md-6">
                        <input :value="iTotalPoblacionIndigena"   placeholder="Total de población indígena"  class="form-control"   disabled  >
                    </div>        
                    <div class="col-md-12 help-block"></div>
                    <div class="col-md-6">
                        <label>Clave INEGI estado:</label>
                    </div>          
                    <div class="col-md-6">  
                        <input v-model.number="icve_estado_inegi" class="form-control" type="number" disabled>  
                     </div>   
                     <div class="col-md-12 help-block"></div>    
                    <div class="col-md-6">
                        <label>Clave INEGI municipio:</label>
                    </div>          
                    <div class="col-md-6">  
                        <input id="icve_municipio" v-model.number="icve_municipio" class="form-control" type="number" disabled>  
                     </div> 
                <!--<div id="datosNivelMunicipal" class="table-responsive"> -->      
                   <div class="col-md-12 help-block"></div> 
                   <div class="col-md-6">
                        <label>Poblacion de municipio:</label>
                    </div>          
                    <div class="col-md-6">  
                        <ejs-numerictextbox                                             
                            format='n' 
                            :showSpinButton='false'
                            v-model.number="ip_poblacion_total_localidades" 
                            :enabled='false'
                            aria-disabled='false'
                            value="0">                                            
                        </ejs-numerictextbox>                          
                    </div>    
                    <div class="col-md-12 help-block"></div>    


                     <div class="col-md-12 help-block"></div>  
                     <div class="col-md-12 help-block"></div>  
                     <div class="col-md-12 help-block"></div>    
                <!--</div>  -->                                                                                  	                                                                                                                                          
                </div>             
                <div class="table-responsive">
                     <div class="col-md-12">
                         <table class="table table-responsive">
                            <thead>
                                <tr>
                                    <th class="col-md-6">
                                        <label>Numero de Localidades: </label>                                        
                                    </th>
                                    <th class="col-md-6">                                        
                                        <input id="noLocalidadesMun" v-model.number="ilocalidades_municipio" class="form-control" type="number" disabled>
                                    </th>
                                </tr>

                                 <tr>
                                    <th>Nombre</th>
                                    <th>Población</th>
                                </tr>
                                </thead>
                                
                                <tbody>
                                        <tr v-for="i in localidadesTabla" :key="i.id">
                                            <td class="col-md-6">{{ i.nom_loc }}</td>
                                            <td class="col-md-6">{{ formatNum(i.pob) }}</td>
                                        </tr>                                                     
                                </tbody>  
                         </table> 
                        <div id="datosNivelMunicipal" class="table-responsive"> 
                            <div class="form-group">
                                <div class="col-md-6">
                                    <label>Poblaci&oacute;n Total de Localidades:</label>
                                </div>          
                                <div class="col-md-6"> 
                                    <ejs-numerictextbox                                        
                                        format='n' 
                                        :showSpinButton='false'
                                        v-model.number="ipoblacion_municipio" 
                                        :enabled='false'
                                        value="0">                                            
                                    </ejs-numerictextbox>                        
                                </div>  
                                <div class="col-md-12 help-block"></div>  
                                <div class="col-md-12 help-block"></div>  
                                <div class="col-md-12 help-block"></div>  
                            </div>         
                         </div>                                                                         
                        
                    </div>                   
                </div>

            </td>
            <div class="form-group">
            </div>
        </tr>
        <div class="row" v-show="false">
            <button type="button" class="btn btn-default pull-right vertical-buffer" data-toggle="modal"
               @click="$router.push('/datoscamino')">
             Siguiente
            </button>
        </div>
         <a type="button" class="btn btn-default pull-right vertical-buffer"  href="#datosCamino" aria-controls="profile" role="tab" data-toggle="tab" id="input-1" aria-expanded="true">
            siguiente
          </a>
    </tbody>
</table>
</div>
</template>

<script>
import Vue from "vue";
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { ComboBoxPlugin, MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { getEdos, getMunicipios, getLocalidades } from '@/api/alta-camino'
import { getupdate } from '@/api/alta-camino';
import { required } from 'vuelidate/lib/validators'

Vue.use(NumericTextBoxPlugin);
Vue.use(ComboBoxPlugin);
Vue.use(MultiSelectPlugin);

const API = process.env.VUE_APP_SCT_SVC_BACK_BASE_URL;

export default {
    name: 'DatosGeograficos',   
    props:{
        camino_id:{
            type:Number
        }
    }, 
    data: function() {
        return {     
            valueEstado: 0,
            ip_poblacion_total_localidades: 0,
            ipoblacion_municipio: 0,
            ilocalidades_municipio: 0,
            ubicacion: '',
            region: '',
            icve_estado_inegi: null,
            estadosHabilitado: false,
            estadosData: new DataManager([]),
            estadosFields: { text: 'nom_agee', value: 'cve_agee' },
            icve_municipio: null,
            municipiosHabilitado: false,
            municipiosData: new DataManager([]),
            municipiosFields: { text: 'nom_agem', value: 'cve_agem', custom: 'cve_agee' },
            localidades: [],
            localidadesHabilitado: false,
            localidadesData: new DataManager([]),
            localidadesFields: { text: 'nom_loc', value: 'cve_loc' },
            localidadesTabla: [],
            iTotalPoblacionIndigena: null,
            poblacion: 0,
            marginacion: null,
            poblacion_indigena: null,
            isoEdo:'',
            editmode: false,
            
            DatosGeograficos:{
                
                    abreviaturaEdo: '',
                    iso: '',
                    localidades: '',
                    icveestados: '',
                    region: '',
                    ubicacion: '',
                    poblacion_indigena: '',
                    totpoblacion: '',
                    icve_estado_inegi: '',
                    icve_municipio: '',
                    ip_poblacion_total_localidades: '',
                    ipoblacion_municipio: '',
                    ilocalidades_municipio: '',
                    marginacion: '', 
                    cve_agee: '',
                    /*1*/
                
                }
        };
    },
     validations: {
        icve_estado_inegi: {
            required,

        }, 
        icve_municipio: {
           required,
        },
    },
    
 
 

    methods: {
        //Envia datos Region
        enviardatos_r(){
            this.$emit("set-icveEdo", {
            datos:this.DatosGeograficos
        }); 
        },
        async CargaDatos(clave){
              const response = await getupdate(clave)
              this.$emit('update:camino_id', response.id)
              
              this.$refs.refEstado.ej2Instances.value = response.cve_agee
              const {results} = await getMunicipios(response.cve_agee)
              this.municipiosData = new DataManager(results);
              this.$refs.refMunicipio.ej2Instances.value = response.icve_municipio
              
              const res = await getLocalidades(response.cve_agee, 
                                               response.icve_municipio)        
                this.ilocalidades_municipio = res.length;
                this.ip_poblacion_total_localidades = res.reduce((x, y) => {
                    return x + y.pob;
                    },0)
                this.icve_estado_inegi = response.cve_agee
                this.localidadesHabilitado = false;            
                this.localidadesData = new DataManager(res);
                this.icve_municipio = response.icve_municipio
                this.$refs.localidades.ej2Instances.value = response.localidades
                //console.log("loc-data")
                //console.log(this.$refs.localidades.ej2Instances.value)
                this.localidades = this.$refs.localidades.ej2Instances.value
                const localidadesData = this.localidadesData.executeLocal(new Query());
                this.localidadesTabla = localidadesData
                .filter(a => this.localidades.includes(a.cve_loc));

              this.region = response.datos_geograficos.region
              this.ubicacion = response.datos_geograficos.ubicacion
              this.poblacion_indigena = response.datos_geograficos.poblacion_indigena
              this.marginacion = response.datos_geograficos.marginacion
              this.totpoblacion = response.datos_geograficos.totpoblacion
              //this.icve_estado_inegi = Number.parseInt(response.datos_geograficos[0].icve_estado_inegi) 
              //this.icve_municipio = response.datos_geograficos[0].icve_municipio
              //this.ip_poblacion_total_localidades = response.datos_geograficos[0].ip_poblacion_total_localidades
              this.ipoblacion_municipio = response.datos_geograficos.ipoblacion_municipio
              //this.ilocalidades_municipio = response.datos_geograficos[0].ilocalidades_municipio
              this.setEdoIso()
              this.recalcularPoblacionTotal()   
              console.log('estadosHabilitado false')
              this.estadosHabilitado = false       
                     
        },
        //Envia datos Ubicacion
        enviardatos_u(){
            this.$emit("set-icveEdo", {
            datos:this.DatosGeograficos
            
        }); 
        },        
        //Funcion fregion
        fregion(){
            this.DatosGeograficos.region = this.region
            this.enviardatos_r()
        },
         //Funcion funibacion
        fubicacion(){
            this.DatosGeograficos.ubicacion = this.ubicacion
            this.enviardatos_u()
        },



        //NEW ORDER
        //estados
        async siguiente(){   
            
            this.$emit("show-error", false); 
            this.$v.$touch()
            if (this.$v.$invalid) {
               this.submitStatus = "Error";
            }
            },
        async initData() {
            try{
                const res = await getEdos()
                const results = res.results;
                this.estadosData = new DataManager(results);
                console.log('estadosHabilitado true')
                this.estadosHabilitado = true;
                this.icve_estado_inegi = null;   
                
            }catch(error) {             
                console.log('error al obtener estados')
                console.log(error);
                this.$emit("show-error", error);
            }

        },
        //municipios
        async obtenerMunicipios(){            
            this.$emit("show-error", false);
            this.icve_municipio = null;
            this.municipiosData = new DataManager([]);
            this.municipiosHabilitado = true;    
            this.clearLocalidades();            
            try{
                const {results} = await getMunicipios(this.icve_estado_inegi)
                this.municipiosData = new DataManager(results);
                this.municipiosHabilitado = true;            
            }catch(err){
                console.log('error al obtener municipios')
                console.log(err)
                this.$emit("show-error", err);
            }
        },

        //localidades
        async obtenerLocalidades(){
            try{                
                this.$emit("show-error", false);
                this.clearLocalidades();
                const res = await getLocalidades(this.icve_estado_inegi, 
                                                 this.icve_municipio)        
                this.ilocalidades_municipio = res.length;
                this.ip_poblacion_total_localidades = res.reduce((x, y) => {
                    return x + y.pob;
                    },0)
                
                this.localidadesHabilitado = true;            
                this.localidadesData = new DataManager(res);
                this.setEdoIso()
                 this.DatosGeograficos.localidades = this.localidades
                 this.DatosGeograficos.icveestados = this.icveestados
                 this.DatosGeograficos.region      = this.region
                 this.DatosGeograficos.ubicacion   = this.ubicacion
                 this.DatosGeograficos.poblacion_indigena = this.poblacion_indigena
                 this.DatosGeograficos.totpoblacion = this.ipoblacion_municipio
                 this.DatosGeograficos.icve_estado_inegi = this.icve_estado_inegi
                 this.DatosGeograficos.icve_municipio = this.icve_municipio
                 this.DatosGeograficos.ip_poblacion_total_localidades = this.ip_poblacion_total_localidades
                 this.DatosGeograficos.ipoblacion_municipio = this.ipoblacion_municipio
                 this.DatosGeograficos.ilocalidades_municipio = this.ilocalidades_municipio
                 this.DatosGeograficos.marginacion = this.marginacion
                  this.$emit("set-icveEdo", {
                     datos:this.DatosGeograficos
                 });
            }catch(error){
                console.log("sinLocalidades")
                console.log('error al obtener localidades')
                console.log(error);
                this.$emit("show-error", error);
            }
        },

        recalcularPoblacionTotal() {      
                        
            if (this.localidades.length > 0) {   
                const localidadesData = this.localidadesData.executeLocal(new Query());
                this.localidadesTabla = localidadesData
                .filter(a => this.localidades.includes(a.cve_loc));

                this.ipoblacion_municipio = localidadesData
                .filter(a => this.localidades.includes(a.cve_loc))
                .map(a => a.pob)
                .reduce((a, b) => (a + b), 0);
                 if(!isNaN(this.localidades)){
                     if(!Array.prototype.isPrototypeOf(this.localidades)){
                         this.localidades = [this.localidades]
                     }                     
                 }
                 this.DatosGeograficos.localidades = this.localidades
                 this.DatosGeograficos.icveestados = this.icveestados
                 this.DatosGeograficos.region      = this.region
                 this.DatosGeograficos.ubicacion   = this.ubicacion
                 this.DatosGeograficos.poblacion_indigena = this.poblacion_indigena
                 this.DatosGeograficos.totpoblacion = this.ipoblacion_municipio
                 this.DatosGeograficos.icve_estado_inegi = this.icve_estado_inegi
                 this.DatosGeograficos.icve_municipio = this.icve_municipio
                 this.DatosGeograficos.ip_poblacion_total_localidades = this.ip_poblacion_total_localidades
                 this.DatosGeograficos.ipoblacion_municipio = this.ipoblacion_municipio
                 this.DatosGeograficos.ilocalidades_municipio = this.ilocalidades_municipio
                 this.DatosGeograficos.marginacion = this.marginacion
                


                console.log('this.DatosGeograficos')
                console.log(this.DatosGeograficos.ilocalidades_municipio)
                 /*2*/
                 this.$emit("set-icveEdo", {
                     datos:this.DatosGeograficos
                 }); 
            
            } else {
                this.localidadesTabla = [];
                this.ipoblacion_municipio = 0;
            }
        },             
        updateLocalidades(e){
            /*
            console.log('updateLocalidades')
            console.log(this.$refs.localidades.ej2Instances)            
            */
            this.localidades = this.$refs.localidades.ej2Instances.value
            this.recalcularPoblacionTotal()

        },

        clearLocalidades(){
            this.localidadesData = null;
            this.localidadesHabilitado = false;
            this.localidades = [];
            this.localidadesTabla = [];
        },

        formatNum(num){
            return new Intl.NumberFormat().format(num);
        },

        setEdoIso(){
            
            const edoSelect = this.estadosData.executeLocal(new Query())
                                .filter(a => a.cve_agee == this.icve_estado_inegi)                        
            console.log('edoSelect')
            console.table(edoSelect)
            this.DatosGeograficos.iso = edoSelect[0].iso
            this.DatosGeograficos.cve_agee = this.icve_estado_inegi
 /*           this.$emit("set-icveEdo", {
                edo:{
                    abreviaturaEdo:this.icve_estado_inegi,
                    iso:edoSelect[0].iso
                }
                }); 
 */         
            const munSelect = this.municipiosData.executeLocal(new Query())
                                .filter(a => a.cve_agem == this.icve_municipio) 
            console.log('munSelect')
            this.marginacion = munSelect[0].grado_marginacion.descripcion
            this.poblacion_indigena = munSelect[0].poblacion_indigena.descripcion
            this.iTotalPoblacionIndigena = munSelect[0].total_poblacion_indigena
            this.iTotalPoblacionIndigena = this.formatNum(this.iTotalPoblacionIndigena)
            console.log('this.iTotalPoblacionIndigena')
            console.log(this.iTotalPoblacionIndigena)
            var str = JSON.stringify(munSelect, null, 2); // spacing level = 2                      
        },
            actualizadatos(){
                this.DatosGeograficos.localidades = this.localidades
                 this.DatosGeograficos.icveestados = this.icveestados
                 this.DatosGeograficos.region      = this.region
                 this.DatosGeograficos.ubicacion   = this.ubicacion
                 this.DatosGeograficos.poblacion_indigena = this.poblacion_indigena
                 this.DatosGeograficos.totpoblacion = this.ipoblacion_municipio
                 this.DatosGeograficos.icve_estado_inegi = this.icve_estado_inegi
                 this.DatosGeograficos.icve_municipio = this.icve_municipio
                 this.DatosGeograficos.ip_poblacion_total_localidades = this.ip_poblacion_total_localidades
                 this.DatosGeograficos.ipoblacion_municipio = this.ipoblacion_municipio
                 this.DatosGeograficos.ilocalidades_municipio = this.ilocalidades_municipio
                 this.DatosGeograficos.marginacion = this.marginacion
                 /*2*/
                 this.$emit("set-icveEdo", {
                     datos:this.DatosGeograficos
                 }); 
    },

    },
    
    mounted() {
        this.$nextTick(() => {
            //console.log('nextTick')    
            })
    },

    async created() {
        console.log('API2')
        console.log(API)        
        await this.initData()
        if(this.$route.params.obraId){
            console.log(' estadosHabilitado false')
            this.estadosHabilitado = false
            this.CargaDatos(this.$route.params.obraId)
            this.editmode = true
        }               
    },
    computed:{
        getEditmode(){
            return this.estadosHabilitado
        }
    }
}
</script> 

<style>
@import "./../../../node_modules/@syncfusion/ej2-bootstrap-theme/styles/bootstrap.css";
/*
@import "ej2/base/bootstrap.scss";
*/
h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
.e-control.e-numerictextbox.e-lib.e-input{
    color: black !important;
    font-size: 18px;
    border: 0px ;
}

</style>
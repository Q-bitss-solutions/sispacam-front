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
                        <ejs-combobox 
                            id="estado"
                          :dataSource="estadosData"
                          :fields="estadosFields"
                          placeholder="Selecciona un estado"
                          :change="obtenerMunicipios"
                          :enabled="estadosHabilitado"
                          v-model="icveEstadoInegi"
                        >
                        </ejs-combobox>                        
                    </div>
                    <div class="col-md-6">
                        <label class="control-label" for="municipio">Municipio</label>
                        <ejs-combobox 
                            id="municipio"
                          :dataSource="municipiosData"
                          :fields="municipiosFields"
                          placeholder="Selecciona un municipio"
                          :change="obtenerLocalidades"
                          :enabled="municipiosHabilitado"
                          v-model="icveMunicipio"
                        >
                        </ejs-combobox>                        
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-6">
                    </div>                    
                    <div class="col-md-6">
                        <label class="control-label" for="region">Localidad</label>
                        <ejs-multiselect
                        :dataSource="localidadesData"
                        :fields="localidadesFields"
                        placeholder="Selecciona una localidad"
                        :enabled="localidadesHabilitado"
                        v-model="localidades"
                        :allowCustomValue= true
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
                        <input id="region" v-model="region" placeholder="Región" maxlength="40" class="form-control">
                    </div> 
                    <div class="col-md-12 help-block"></div>   
                    <div class="col-md-6">
                        <label>Ubicaci&oacute;n:</label>
                    </div>
                    <div class="col-md-6">
                        <input id="ubicacion" v-model="ubicacion" placeholder="Ubicación" class="form-control">
                    </div>
                    <div class="col-md-12 help-block"></div>            
                    <div class="col-md-6">
                        <label>Poblacion ind&iacute;gena</label>
                    </div>                                  
                    <div class="col-md-6">
                        <input v-model="poblacionIndigena" class="form-control" type="text" placeholder="Población indígena" id="poblacionIndigena" disabled>
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
                        <input v-model="iTotalPoblacionIndigena" placeholder="Total de población indígena" class="form-control" type="number" disabled>
                    </div>        
                    <div class="col-md-12 help-block"></div>
                    <div class="col-md-6">
                        <label>Clave INEGI estado:</label>
                    </div>          
                    <div class="col-md-6">  
                        <input v-model.number="icveEstadoInegi" class="form-control" type="number" disabled>  
                     </div>   
                     <div class="col-md-12 help-block"></div>    
                    <div class="col-md-6">
                        <label>Clave INEGI municipio:</label>
                    </div>          
                    <div class="col-md-6">  
                        <input id="icveMunicipio" v-model.number="icveMunicipio" class="form-control" type="number" disabled>  
                     </div> 
                     
                    <div class="col-md-12 help-block"></div> 
                   <div class="col-md-6">
                        <label>No. Localidades del Municipio:</label>
                    </div>          
                    <div class="col-md-6">  
                        <input id="noLocalidadesMun" v-model.number="iLocalidadesMunicipio" class="form-control" type="number" disabled>  
                    </div>    
                     <div class="col-md-12 help-block"></div>    
                    <div class="col-md-6">
                        <label>No. Poblaci&oacute;n del Municipio:</label>
                    </div>          
                    <div class="col-md-6"> 
                        <ejs-numerictextbox                                        
                            format='n' 
                            :showSpinButton='false'
                            v-model.number="iPoblacionMunicipio" 
                            :enabled='false'
                            value="0">                                            
                        </ejs-numerictextbox>                        
                     </div>  

                     <div class="col-md-12 help-block"></div>  
                     <div class="col-md-12 help-block"></div>  
                     <div class="col-md-12 help-block"></div>                                                                                  	                                                                                                                                          
                </div>             
                <div class="table-responsive">
                     <div class="col-md-12">
                         <table class="table table-responsive">
                            <thead>
                                <tr>
                                    <th class="col-md-6">
                                        <label>Población total de localidades:</label>
                                    </th>
                                    <th class="col-md-6">                                        
                                        <ejs-numerictextbox                                             
                                            format='n' 
                                            :showSpinButton='false'
                                            v-model.number="iPoblacionTotalLocalidades" 
                                            :enabled='false'
                                            aria-disabled='false'
                                            value="0">                                            
                                        </ejs-numerictextbox>
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
                    </div>                   
                </div>

            </td>
        </tr>
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

Vue.use(NumericTextBoxPlugin);
Vue.use(ComboBoxPlugin);
Vue.use(MultiSelectPlugin);

const API = process.env.VUE_APP_SCT_SVC_BACK_BASE_URL;

export default {
    name: 'DatosGeograficos',       
    data: function() {
        return {            
            iPoblacionTotalLocalidades: 0,
            iPoblacionMunicipio: 0,
            iLocalidadesMunicipio: 0,
            ubicacion: '',
            region: '',
            icveEstadoInegi: null,
            estadosHabilitado: false,
            estadosData: new DataManager([]),
            estadosFields: { text: 'nom_agee', value: 'cve_agee' },

            icveMunicipio: null,
            municipiosHabilitado: false,
            municipiosData: new DataManager([]),
            municipiosFields: { text: 'nom_agem', value: 'cve_agem', custom: 'cve_agee' },

            localidades: [],
            localidadesHabilitado: false,
            localidadesData: new DataManager([]),
            localidadesFields: { text: 'nom_loc', value: 'cve_loc' },
            localidadesTabla: [],
            iTotalPoblacionIndigena: 0,
            poblacion: 0,
            marginacion: null,

            poblacionIndigena: null,

            isoEdo:'',
        };
    },
    methods: {

        //NEW ORDER
        //estados
        async initData() {
            try{
                const res = await getEdos()
                const results = res.results;
                this.estadosData = new DataManager(results);
                this.estadosHabilitado = true;
                this.icveEstadoInegi = null;   
            }catch(error) {             
                console.log('error al obtener estados')
                console.log(error);
                this.$emit("show-error", error);
            }

        },
        //municipios
        async obtenerMunicipios(){            
            this.$emit("show-error", false);
            this.icveMunicipio = null;
            this.municipiosData = new DataManager([]);
            this.municipiosHabilitado = true;    
            this.clearLocalidades();            
            try{
                const {results} = await getMunicipios(this.icveEstadoInegi)
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
                const res = await getLocalidades(this.icveEstadoInegi, 
                                                    this.icveMunicipio)        
                this.iLocalidadesMunicipio = res.length;
                this.iPoblacionTotalLocalidades = res.reduce((x, y) => {
                    return x + y.pob;
                    },0)
                
                this.localidadesHabilitado = true;            
                this.localidadesData = new DataManager(res);
                this.setEdoIso()
            }catch(error){
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

                this.iPoblacionMunicipio = localidadesData
                .filter(a => this.localidades.includes(a.cve_loc))
                .map(a => a.pob)
                .reduce((a, b) => (a + b), 0);

            } else {
                this.localidadesTabla = [];
                this.iPoblacionMunicipio = 0;
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
                                .filter(a => a.cve_agee == this.icveEstadoInegi)                        
            console.log('edoSelect')
            console.table(edoSelect)
            this.$emit("set-icveEdo", {
                edo:{
                    abreviaturaEdo:this.icveEstadoInegi,
                    iso:edoSelect[0].iso
                }
                }); 
            
            const munSelect = this.municipiosData.executeLocal(new Query())
                                .filter(a => a.cve_agem == this.icveMunicipio) 
            console.log('munSelect')
            this.marginacion = munSelect[0].grado_marginacion.descripcion
            this.poblacionIndigena = munSelect[0].poblacion_indigena.descripcion
            this.iTotalPoblacionIndigena = munSelect[0].total_poblacion_indigena
            var str = JSON.stringify(munSelect, null, 2); // spacing level = 2
            console.log(str)                                
        }
    },
    
    mounted() {
        this.$nextTick(() => {
            //console.log('nextTick')    
            })
    },

    created() {
        console.log('API2')
        console.log(API)        
        this.initData()
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
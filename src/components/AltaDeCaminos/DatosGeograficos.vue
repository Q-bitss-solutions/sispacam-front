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
                <div class="form-group row">
                    <div class="col-sm-6">
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


                <div class="col-md-2">
                </div>
                <div>
                    <h2>Datos a nivel municipal</h2>
                    <hr class="red">
                </div>   
                <div class="table-responsive">
                    <div class="col-md-6">
                        <label>Tipo de Poblaci&oacute;n:</label>
                    </div>
                    <div class="col-md-6">
                        <ejs-combobox 
                        :dataSource="poblacionIndigenaData"
                        :fields="poblacionIndigenaFields"
                        placeholder="Selecciona la opción que corresponda al tipo de población"
                        >
                        </ejs-combobox>   
                    </div>   
                    <div class="col-md-12 help-block"></div>  
                    <div class="col-md-6">
                        <label>Regi&oacute;n:</label>
                    </div>
                    <div class="col-md-6">
                        <input v-model="region" placeholder="Región" maxlength="40" class="form-control">
                    </div> 
                    <div class="col-md-12 help-block"></div>   
                    <div class="col-md-6">
                        <label>Ubicaci&oacute;n:</label>
                    </div>
                    <div class="col-md-6">
                        <input v-model="ubicacion" placeholder="Ubicación" class="form-control">
                    </div>      
                    <div class="col-md-12 help-block"></div>          
                    <div class="col-md-6">
                        <label>Grado de marginaci&oacute;n:</label>
                    </div>
                    <div class="col-md-6">
                        <ejs-combobox 
                            :dataSource="marginacionData"
                            :fields="marginacionFields"
                            placeholder="Selecciona el grado de marginaci&oacute;n"
                        >
                        </ejs-combobox>                        
                    </div>  
                    <div class="col-md-12 help-block"></div>   
                    <div class="col-md-6">
                        <label >Poblaci&oacute;n ind&iacute;gena:</label>
                    </div>
                    <div class="col-md-6">
                        <input placeholder="Población indigena" class="form-control" type="number">
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
                        <label>No. Localidades del Municipio:</label>
                    </div>          
                    <div class="col-md-6">  
                        <input v-model.number="iLocalidadesMunicipio" class="form-control" type="number" disabled>  
                     </div>
                     <div class="col-md-12 help-block"></div>    
                    <div class="col-md-6">
                        <label>No. Poblaci&oacute;n del Municipio:</label>
                    </div>          
                    <div class="col-md-6">  
                        <input v-model.number="iPoblacionMunicipio" class="form-control" type="number" disabled>  
                     </div>  
                     <div class="col-md-12 help-block"></div>    
                    <div class="col-md-6">
                        <label>Clave INEGI municipio:</label>
                    </div>          
                    <div class="col-md-6">  
                        <input v-model.number="icveMunicipio" class="form-control" type="number" disabled>  
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
                                        <input v-model.number="iPoblacionTotalLocalidades" class="form-control" type="number" disabled> 
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
                                            <td class="col-md-6">{{ i.pob }}</td>
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
import { ComboBoxPlugin, MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { getEdos, getMunicipios, getLocalidades } from '@/api/alta-camino'

Vue.use(ComboBoxPlugin);
Vue.use(MultiSelectPlugin);

const API = 'http://ccr-back.apps.prod.sct.gob.mx'//process.env.VUE_APP_SCT_SVC_BACK_BASE_URL;

export default {
    name: 'DatosGeograficos',       
    data: function() {
        return {
            isTableData: false,
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
            municipiosFields: { text: 'nom_agem', value: 'cve_agem', custom: 'pob' },

            localidades: [],
            localidadesHabilitado: false,
            localidadesData: new DataManager([]),
            localidadesFields: { text: 'nom_loc', value: 'cve_loc' },
            localidadesTabla: [],

            poblacion: 0,

            marginacion: null,
            marginacionData: new DataManager([
                { id: '1', name: 'MUY ALTO' },
                { id: '2', name: 'ALTO' },
                { id: '3', name: 'MEDIO' },
                { id: '4', name: 'BAJO' },
            ]),
            marginacionFields: { text: 'name', value: 'id' },

            poblacionIndigena: null,
            poblacionIndigenaData: new DataManager([
                { id: '1', name: 'Municipio con población indígena dispersa' },
                { id: '2', name: 'Municipio indígena' },
                { id: '3', name: 'Municipio sin población indígena' },
                { id: '4', name: 'Población con presencia indígena' },
                { id: '5', name: 'Población indígena' },
                { id: '6', name: 'Población indígena dispersa' },
            ]),
            poblacionIndigenaFields: { text: 'name', value: 'id' },
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
            console.log('obtenerMunicipios')
            this.$emit("set-icveEdo", this.icveEstadoInegi); 
            this.$emit("show-error", false);
            this.icveMunicipio = null;
            this.municipiosData = new DataManager([]);
            this.municipiosHabilitado = true;    
            this.clearLocalidades();            
            console.log('localidadesHabilitado: ',this.localidadesHabilitado)
            try{
                const response = await getMunicipios(this.icveEstadoInegi)
                this.municipiosData = new DataManager(response);
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
                
            }catch(error){
                console.log('error al obtener localidades')
                console.log(error);
                this.$emit("show-error", error);
            }
        },

        recalcularPoblacionTotal() {
            console.log('recalcularPoblacionTotal')            
            if (this.localidades.length > 0) {   
                const localidadesData = this.localidadesData.executeLocal(new Query());
                this.localidadesTabla = localidadesData
                .filter(a => this.localidades.includes(a.cve_loc));

                this.iPoblacionMunicipio = localidadesData
                .filter(a => this.localidades.includes(a.cve_loc))
                .map(a => a.pob)
                .reduce((a, b) => (a + b), 0);
                this.isTableData = true;

            } else {
                this.isTableData = false;
                this.localidadesTabla = [];
                this.iPoblacionMunicipio = 0;
            }
        },             
        updateLocalidades(e){
            console.log('updateLocalidades')
            console.log(this.$refs.localidades.ej2Instances)
            this.localidades = this.$refs.localidades.ej2Instances.value
            this.recalcularPoblacionTotal()

        },

        clearLocalidades(){
            console.log('clearLocalidades')
            this.localidadesData = null;
            this.localidadesHabilitado = false;
            this.localidades = [];
            this.localidadesTabla = [];
        }
    },
    
    mounted() {
        this.$nextTick(() => {
            //console.log('nextTick')    
            })
    },

    created() {
        this.initData()
    }

}
</script>

<style>
@import url(https://cdn.syncfusion.com/ej2/material.css);
h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

</style>
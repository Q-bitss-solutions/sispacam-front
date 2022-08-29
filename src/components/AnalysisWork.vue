<template>
    <div class="col-md-12 mx-auto">
        <div class="row">
            <h3>Análisis de Obra</h3>
            <hr class="red">
            <form role="form">
                <div class="form-group row">
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
                    
                    <div class="col-sm-6">
                        <label class="control-label" for="Obra">Obra</label>
                        <select class="form-control" id="Obra">
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                        </select>
                    </div>
                </div>
                <h4>2020</h4>
                <hr class="red">
                <div class="form-group row">
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Monto</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="Obra">Meta</label>
                        <select class="form-control" id="Obra">
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                        </select>
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Ancho</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Del KM</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Al KM</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Número de empleos</label>
                        <input class="form-control" id="region" placeholder="$" type="number">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Fecha inicio</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Fecha Fin</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                </div>
                <hr class="red">
                <h4>Conceptos</h4>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>First</th>
                            <th>Last</th>
                            <th>Handle</th>
                            <th>Handle</th>
                            <th>Cant. Total</th>
                            <th>P. Unitario</th>
                            <th>Importe Total</th>
                            <th>Importe Total</th>
                            <th>Ponderados</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-default pull-right vertical-buffer" data-toggle="modal"
                            data-target="#addConcept">
                        Agregar Concepto
                    </button>
                </div>
                <h4>Conceptos Extraordinarios</h4>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>First</th>
                            <th>Last</th>
                            <th>Handle</th>
                            <th>Handle</th>
                            <th>Cant. Total</th>
                            <th>P. Unitario</th>
                            <th>Importe Total</th>
                            <th>Importe Total</th>
                            <th>Ponderados</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="row vertical-buffer">
                    <button type="button" class="btn btn-default pull-right" data-toggle="modal"
                            data-target="#error">
                        Agregar Concepto
                    </button>
                    <button type="button" class="btn btn-danger pull-right">Cancelar</button>
                </div>
            </form>
        </div>

        <!--        Modal-->
        <div class="modal fade" id="addConcept" tabindex="-1" role="dialog" aria-labelledby="addConcept"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Ejemplo de ventana modal</h4>
                    </div>
                    <div class="modal-body">
                        <p>Ejemplo de texto interno.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary">Guardar</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!--        Modal End-->

        <!--        Modal Error-->
        <div class="modal fade" id="error" tabindex="-1" role="dialog" aria-labelledby="error"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Alerta</h4>
                    </div>
                    <div class="modal-body">
                        <p>Las cantidades no coinciden.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary">Guardar</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!--        Modal End-->
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
    name: "AnalysisWork",
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
            this.$emit("set-icveEdo", this.icveEstadoInegi); 
            this.$emit("show-error", false);
            this.icveMunicipio = null;
            this.municipiosData = new DataManager([]);
            this.municipiosHabilitado = true;    
            this.clearLocalidades();            
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
            this.localidades = this.$refs.localidades.ej2Instances.value
            this.recalcularPoblacionTotal()

        },

        clearLocalidades(){
            this.localidadesData = null;
            this.localidadesHabilitado = false;
            this.localidades = [];
            this.localidadesTabla = [];
        }
    },
    
    mounted() {
        this.$nextTick(() => {
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
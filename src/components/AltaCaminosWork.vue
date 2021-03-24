<template>
    <div class="col-md-12 mx-auto">
        <div class="row">
            <h3>Alta de caminos</h3>
            <hr class="red">
            <form role="form">
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="email-01">Estado</label>
                        <ejs-combobox 
                          :dataSource="estadosData"
                          :fields="estadosFields"
                          placeholder="Selecciona un estado"
                          :change="alCambiarEstado"
                          :enabled="estadosHabilitado"
                          v-model="estado"
                        >
                        </ejs-combobox>
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="municipio">Municipio</label>
                        <ejs-combobox 
                          :dataSource="municipiosData"
                          :fields="municipiosFields"
                          placeholder="Selecciona un municipio"
                          :change="alCambiarMunicipio"
                          :enabled="municipiosHabilitado"
                          v-model="municipio"
                        >
                        </ejs-combobox>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region"></label>
                        <!--input class="form-control" id="region" placeholder="" type="number"-->
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Localidad</label>
                        <ejs-multiselect
                          :dataSource="localidadesData"
                          :fields="localidadesFields"
                          placeholder="Selecciona una localidad"
                          :change="alCambiarLocalidades"
                          :enabled="localidadesHabilitado"
                          v-model="localidades"
                        >
                        </ejs-multiselect>
                    </div>
                </div>
                <br>
                <hr class="red">
                <h4>Datos a nivel municipal</h4>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>Tipo de Población</th>
                            <td>
                              <ejs-combobox 
                                :dataSource="poblacionIndigenaData"
                                :fields="poblacionIndigenaFields"
                                placeholder="Selecciona la opción que corresponda al tipo de población"
                              >
                              </ejs-combobox>
                            </td>
                        </tr>
                        <tr>
                            <th>Región</th>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <th>Ubicación</th>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <th> &nbsp; </th>
                            <th> &nbsp;  </th>
                        </tr>
                        <br>
                        <tr>
                            <th>Grado de marginación</th>
                            <td>
                              <ejs-combobox 
                                :dataSource="marginacionData"
                                :fields="marginacionFields"
                                placeholder="Selecciona el grado de marginación"
                              >
                              </ejs-combobox>
                            </td>
                        </tr>
                        <tr>
                            <th>Población indígena</th>
                            <td>
                              <input type="number">
                            </td>
                        </tr>
                        <tr>
                            <th>Población total</th>
                            <td>{{ poblacion }}</td>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        <br>
                        <tr>
                            <th>Clave INEGI estado</th>
                            <td>{{ estado }}</td>
                        </tr>
                        <tr>
                            <th>Clave INEGI municipio</th>
                            <td>{{ municipio }}</td>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table-responsive" v-if="localidadesTabla.length > 0">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Población</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in localidadesTabla" :key="i.id">
                                <td>{{ i.nom_loc }}</td>
                                <td>{{ i.pob }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br>
                <div class="form-group">
                    <button class="btn btn-primary pull-right" type="submit">Enviar</button>
                </div>

            </form>
        </div>
    </div>


</template>

<script>
import Vue from "vue";
import { ComboBoxPlugin, MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { DataManager, Query } from "@syncfusion/ej2-data";
import axios from "axios";

Vue.use(ComboBoxPlugin);
Vue.use(MultiSelectPlugin);

const API = 'http://ccr-back.apps.prod.sct.gob.mx'//process.env.VUE_APP_SCT_SVC_BACK_BASE_URL;

export default Vue.extend({
  data: function() {
    return {
      estado: null,
      estadosHabilitado: false,
      estadosData: new DataManager([]),
      estadosFields: { text: 'nom_agee', value: 'cve_agee' },

      municipio: null,
      municipiosHabilitado: false,
      municipiosData: new DataManager([]),
      municipiosFields: { text: 'nom_agem', value: 'cve_agem' },

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
      poblacionIndigenaFields: { text: '', value: '' },
    };
  },
  methods: {
    async obtenerEstados() {
      try {
        this.estadosHabilitado = false;
        const url = `${API}/api/v1/estado/`;
        const response = await axios.get(url);
        const results = response.data.results;
        this.estadosData = new DataManager(results);
        this.estadosHabilitado = true;
        this.estado = null;
      } catch (err) {
          if (err.response) {
          console.log("Server Error:", err)
        } else if (err.request) {
          console.log("Network Error:", err)
        } else {
          console.log("Client Error:", err)
        }
      }
    },
    async obtenerMunicipios(cve_agee) {
      try {
        this.municipiosHabilitado = false;
        const url = `${API}/api/v1/municipio/?cve_agee=${cve_agee}`;
        const response = await axios.get(url);
        const results = response.data;
        this.municipiosData = new DataManager(results);
        this.municipiosData 
        this.municipiosHabilitado = true;
        this.municipio = null;
      } catch (err) {
          if (err.response) {
          console.log("Server Error:", err)
        } else if (err.request) {
          console.log("Network Error:", err)
        } else {
          console.log("Client Error:", err)
        }
      }
    },
    async obtenerLocalidad(cve_agee, cve_agem) {
      try {
        this.localidadesHabilitado = false;
        const url = `${API}/api/v1/localidad/?cve_agee=${cve_agee}&cve_agem=${cve_agem}`;
        const response = await axios.get(url);
        const results = response.data;
        this.localidadesData = new DataManager(results);
        this.localidadesHabilitado = true;
        this.localidades = [];
        this.recalcularPoblacionTotal();
      } catch (err) {
          if (err.response) {
          console.log("Server Error:", err)
        } else if (err.request) {
          console.log("Network Error:", err)
        } else {
          console.log("Client Error:", err)
        }
      }
    },
    recalcularPoblacionTotal() {
      const localidadesData = this.localidadesData.executeLocal(new Query());
      if (this.localidades.length > 0) {
        this.localidadesTabla = localidadesData
          .filter(a => this.localidades.includes(a.cve_loc));
        this.poblacion = localidadesData
          .filter(a => this.localidades.includes(a.cve_loc))
          .map(a => a.pob)
          .reduce((a, b) => (a + b), 0);
      } else {
        this.localidadesTabla = [];
        this.poblacion = localidadesData
          .map(a => a.pob)
          .reduce((a, b) => (a + b), 0);
      }
    },
    alCambiarEstado: function() {
      this.localidadesData = new DataManager([]);
      this.localidadesHabilitado = false;

      this.obtenerMunicipios(this.estado);
    },
    alCambiarMunicipio: function() {
      this.obtenerLocalidad(this.estado, this.municipio);
    },
    alCambiarLocalidades: function () {
      this.recalcularPoblacionTotal();
    }
  },
  mounted() {
    this.obtenerEstados();
  }
});
</script>


<style>
@import url(https://cdn.syncfusion.com/ej2/material.css);
</style>

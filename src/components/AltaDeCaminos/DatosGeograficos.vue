<template>
    <div>

        <!-- TIPO DE CAMINO -->
        <div class="row">
            <div class="col-md-12">
                <h2>Tipo de Camino</h2>
                <hr class="red">
            </div>
            <div class="col-md-12">
                <label for="tipoCamino">Tipo de Camino:</label>
                <div id="tipoCamino">
                    <label class="radio-inline">
                        <input v-model="DatosGeograficos.tipo_camino" type="radio" id="cabecera" name="tipo_camino"
                            value="C" :disabled="isCanceled" />
                        Cabecera
                    </label>
                    <label class="radio-inline">
                        <input v-model="DatosGeograficos.tipo_camino" type="radio" id="agencia" name="tipo_camino"
                            value="A" :disabled="isCanceled" />
                        Agencia
                    </label>
                    <label class="radio-inline">
                        <input v-model="DatosGeograficos.tipo_camino" type="radio" id="otro" name="tipo_camino"
                            value="O" :disabled="isCanceled"> Otro
                    </label>
                    <label class="radio-inline">
                        <input v-model="otroTipoCamino" v-if="DatosGeograficos.tipo_camino == 'O'"
                            placeholder="Especificar otro" />
                    </label>
                </div>
            </div>
        </div>

        <!-- ESTADO, LOCALIDAD, MUNICIPIO -->
        <div class="row">

            <div class="col-md-12">
                <h2>Estado, Localidad y Municipio</h2>
                <hr class="red">
            </div>

            <div class="col-md-6">
                <!-- ESTADO -->
                <label class="control-label" for="estado">Estado</label>
                <ejs-combobox :class="{ 'form-control-error': $v.clave_estado_inegi.$error }" id="estado"
                    :dataSource="estadosData" :fields="estadosFields" placeholder="Selecciona un estado"
                    :change="obtenerMunicipios" :enabled="estadosHabilitado"
                    v-model="DatosGeograficos.estadoSeleccionado" ref="refEstado">
                </ejs-combobox>
                <div class="row col-md-10">
                    <small v-if="!$v.clave_estado_inegi.required && $v.clave_estado_inegi.$error"
                        class="form-text form-text-error">
                        Este campo es obligatorio
                    </small>
                </div>
            </div>

            <div class="col-md-6">

                <!-- MUNICIPIO -->
                <label class="control-label" for="municipio">Municipio</label>
                <ejs-combobox :class="{ 'form-control-error': $v.icve_municipio.$error }" id="municipio"
                    :dataSource="municipiosData" :fields="municipiosFields" placeholder="Selecciona un municipio"
                    :change="obtenerLocalidades" :enabled="municipiosHabilitado" v-model="icve_municipio"
                    ref="refMunicipio">
                </ejs-combobox>
                <div class="row col-md-10" v-if="!$v.icve_municipio.required && $v.icve_municipio.$error">
                    <small class="form-text form-text-error">
                        Este campo es obligatorio
                    </small>
                </div>

                <!-- LOCALIDAD -->
                <!-- Checa si el tipo de camino es "Agencia" u "Otro" -->
                <div v-if="'AO'.includes(DatosGeograficos.tipo_camino)">
                    <label class="control-label">Localidad</label>
                    <ejs-multiselect :dataSource="localidadesData" :fields="localidadesFields"
                        placeholder="Selecciona una localidad" :enabled="localidadesHabilitado"
                        v-model="DatosGeograficos.localidadesSeleccionadas" id="localidades" ref="localidades"
                        :change="updateLocalidades" :removed="updateLocalidades">
                    </ejs-multiselect>
                </div>
            </div>
        </div>

        <!-- DATOS NIVEL MUNICIPAL -->
        <div class="row">
            <div class="col-md-12">
                <h2>Datos a nivel municipal</h2>
                <hr class="red">
            </div>
            <!-- TODO: arreglar tabla -->
            <table ref="datosPersonales" id="datosPersonales" class="tableContenido" width="100%" border="0">
                <tbody>

                    <tr>
                        <td>
                            <div id="datosNivelMunicipal" class="table-responsive">
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Región:</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="region" v-model="DatosGeograficos.region" placeholder="Región"
                                        maxlength="40" class="form-control">
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Ubicación:</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="ubicacion" v-model="DatosGeograficos.ubicacion" placeholder="Ubicación"
                                        class="form-control">
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Poblacion indígena</label>
                                </div>
                                <div class="col-md-6">
                                    <input v-model="poblacion_indigena" class="form-control" type="text"
                                        placeholder="Población indígena" id="poblacion_indigena" disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Grado de marginación:</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" v-model="marginacion" class="form-control" disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Total de población indígena:</label>
                                </div>
                                <div class="col-md-6">
                                    <input :value="iTotalPoblacionIndigena" placeholder="Total de población indígena"
                                        class="form-control" disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Clave INEGI estado:</label>
                                </div>
                                <div class="col-md-6">
                                    <input v-model.number="clave_estado_inegi" class="form-control" type="number"
                                        disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Clave INEGI municipio:</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="icve_municipio" v-model.number="icve_municipio" class="form-control"
                                        type="number" disabled>
                                </div>
                                <!--<div id="datosNivelMunicipal" class="table-responsive"> -->
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Poblacion de municipio:</label>
                                </div>
                                <div class="col-md-6">
                                    <ejs-numerictextbox format='n' :showSpinButton='false' :enabled='false'
                                        aria-disabled='false' value="0">
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
                                                    <input id="noLocalidadesMun" v-model.number="ilocalidades_municipio"
                                                        class="form-control" type="number" disabled>
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
                                                <label>Población Total de Localidades:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <ejs-numerictextbox format='n' :showSpinButton='false'
                                                    v-model.number="ipoblacion_municipio" :enabled='false' value="0">
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
                    <!-- Este botón no sirve -->
                    <div class="row" v-show="false">
                        <button type="button" class="btn btn-default pull-right vertical-buffer" data-toggle="modal"
                            @click="$router.push('/datoscamino')">
                            Siguiente
                        </button>
                    </div>
                    <a type="button" class="btn btn-default pull-right vertical-buffer" @click="enviarDatos()"
                        href="#datosCamino" aria-controls="profile" role="tab" data-toggle="tab" id="input-1"
                        aria-expanded="true">
                        siguiente
                    </a>
                </tbody>
            </table>

        </div>

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
    props: {
        camino_id: {
            type: Number
        },
        isCanceled: {
            required: true,
            default: false
        }
    },
    data: function () {
        return {
            // Tipo Camino
            tipo_camino: null,
            otroTipoCamino: null,   //String que especifica el tipo de camino cuando se elige "Otro"

            // Estados
            estadosHabilitado: false,
            estadosData: [],
            estadosFields: { text: 'nombre', value: 'clave_agee' },

            // Municipios
            municipiosHabilitado: true,
            municipiosData: [],
            municipiosFields: { text: 'nombre', value: 'clave_agem' },
            municipio_seleccionado_id: 0,

            // Localidades
            localidadesHabilitado: false,
            localidadesData: [],
            localidadesFields: { text: 'nombre', value: 'clave_loc' },

            // TODO: ver que hace esta variable
            ip_poblacion_total_localidades: 0,
            ipoblacion_municipio: 0,
            ilocalidades_municipio: 0,
            clave_estado_inegi: null,
            icve_municipio: null,

            localidadesTabla: [],
            iTotalPoblacionIndigena: 0,
            poblacion: 0,
            marginacion: "",
            poblacion_indigena: null,
            isoEdo: '',
            editmode: false,
            cons: false,

            DatosAlta: {

            },
            DatosGeograficos: {

                // Tipo Camino
                tipo_camino: null,
                camino_otro: null,   //String que especifica el tipo de camino cuando se elige "Otro"

                // Ubicaciones Seleccionadas
                estadoSeleccionado: null,
                municipioSeleccionado: null,
                localidadesSeleccionadas: [],

                // Campos Que funcionan v1
                cve_agee: '',
                icve_estado_inegi: '',
                icve_municipio: '',
                ip_poblacion_total_localidades: '',
                iso: '',
                marginacion: '',
                poblacion_indigena: '',


                abreviaturaEdo: '',
                localidades: '',
                icveestados: '',
                region: '',
                ubicacion: '',
                totpoblacion: '',
                ipoblacion_municipio: '',
                ilocalidades_municipio: '',
                /*1*/

            }
        };
    },
    validations: {
        clave_estado_inegi: {
            required,

        },
        icve_municipio: {
            required,
        },
    },

    methods: {
        // Guarda datos para alta de camino
        // Al parecer no está en uso
        updateCaminoData(data_camino) {
            this.$store.state.camino_alta.push(this.DatosAlta);
        },

        //Envia datos
        enviarDatos() {
            console.log("ENVIAR DATOS");
            this.DatosGeograficos.cve_agee = this.DatosGeograficos.estadoSeleccionado
            this.DatosGeograficos.icve_estado_inegi = this.DatosGeograficos.estadoSeleccionado
            this.DatosGeograficos.icve_municipio = this.icve_municipio
            this.DatosGeograficos.localidades = this.DatosGeograficos.localidadesSeleccionadas
            this.DatosGeograficos.ilocalidades_municipio = this.DatosGeograficos.localidadesSeleccionadas.length
            this.DatosGeograficos.ip_poblacion_total_localidades = 314159
            this.DatosGeograficos.poblacion_indigena = "314159"
            this.DatosGeograficos.totpoblacion = 314159
            this.DatosGeograficos.marginacion = 314159
            console.log(this.DatosGeograficos);

            this.$emit("set-icveEdo", {
                datos: this.DatosGeograficos
            });
        },
        //Envia datos Ubicacion
        enviardatos_u() {
            this.$emit("set-icveEdo", {
                datos: this.DatosGeograficos

            });
        },
        //Funcion fregion
        fregion() {
            this.DatosGeograficos.region = this.region
            this.enviardatos_r()
        },
        //Funcion funibacion
        fubicacion() {
            this.DatosGeograficos.ubicacion = this.ubicacion
            this.enviardatos_u()
        },

        //NEW ORDER
        //estados
        async siguiente() {

            this.$emit("show-error", false);
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = "Error";
            }
        },
        async initData() {
            try {

                const res = await getEdos()
                const results = res;
                // this.estadosData = res.results;
                this.estadosData = results;
                this.estadosHabilitado = true;
                this.clave_estado_inegi = null;
            } catch (error) {
                console.log('error al obtener estados')
                console.log(error);
                this.$emit("show-error", error);
            }
        },
        //municipios
        async obtenerMunicipios() {
            this.$emit("show-error", false);
            console.log("WIU");
            const objEstadoSeleccionado = this.estadosData[(this.DatosGeograficos.estadoSeleccionado * 1) - 1]
            console.log(objEstadoSeleccionado.iso);
            this.DatosGeograficos.iso = objEstadoSeleccionado.iso.substring(0, 3)
            this.DatosGeograficos.municipioSeleccionado = null;
            this.municipiosHabilitado = true;
            this.clearLocalidades();
            try {
                console.log(`Estado Seleccionado: ${this.DatosGeograficos.estadoSeleccionado}`);
                const results = await getMunicipios(this.DatosGeograficos.estadoSeleccionado)
                console.log(results);

                this.municipiosData = results
                this.municipiosHabilitado = true;
            } catch (err) {
                console.log('error al obtener municipios')
                console.log(err)
                this.$emit("show-error", err);
            }
        },
        //localidades
        async obtenerLocalidades() {
            this.clearLocalidades();
            const objMunSeleccionado = this.municipiosData[(this.icve_municipio * 1) - 1]
            console.log(objMunSeleccionado);
            try {
                this.$emit("show-error", false);
                const res = await getLocalidades(objMunSeleccionado.id)
                console.log(res);
                this.ilocalidades_municipio = res.length;
                this.ip_poblacion_total_localidades = res.reduce((x, y) => {
                    return x + y.pob;
                }, 0)

                this.localidadesHabilitado = true;
                this.localidadesData = res

                this.setEdoIso()
                this.DatosGeograficos.localidades = this.localidadesSeleccionadas
                this.DatosGeograficos.icveestados = this.icveestados
                this.DatosGeograficos.region = this.region
                this.DatosGeograficos.ubicacion = this.ubicacion
                this.DatosGeograficos.poblacion_indigena = this.poblacion_indigena
                this.DatosGeograficos.totpoblacion = this.ipoblacion_municipio
                this.DatosGeograficos.clave_estado_inegi = this.clave_estado_inegi
                this.DatosGeograficos.ip_poblacion_total_localidades = this.ip_poblacion_total_localidades
                this.DatosGeograficos.ipoblacion_municipio = this.ipoblacion_municipio
                this.DatosGeograficos.ilocalidades_municipio = this.ilocalidades_municipio
                this.DatosGeograficos.marginacion = this.marginacion
                this.$emit("set-icveEdo", {
                    datos: this.DatosGeograficos
                });
            } catch (error) {
                console.log('error al obtener localidades')
                console.log(error);
                this.$emit("show-error", error);
            }
        },

        recalcularPoblacionTotal() {

            if (this.localidades.length > 0) {
                const localidadesData = this.localidadesData;
                this.localidadesTabla = localidadesData
                    .filter(a => this.localidades.includes(a.cve_loc));

                this.ipoblacion_municipio = localidadesData
                    .filter(a => this.localidades.includes(a.cve_loc))
                    .map(a => a.pob)
                    .reduce((a, b) => (a + b), 0);
                if (!isNaN(this.localidades)) {
                    if (!Array.prototype.isPrototypeOf(this.localidades)) {
                        this.localidades = [this.localidades]
                    }
                }
                // this.DatosGeograficos.localidades = this.localidades
                this.DatosGeograficos.icveestados = this.icveestados
                this.DatosGeograficos.region = this.region
                this.DatosGeograficos.ubicacion = this.ubicacion
                this.DatosGeograficos.poblacion_indigena = this.poblacion_indigena
                this.DatosGeograficos.totpoblacion = this.ipoblacion_municipio
                this.DatosGeograficos.clave_estado_inegi = this.clave_estado_inegi
                this.DatosGeograficos.ip_poblacion_total_localidades = this.ip_poblacion_total_localidades
                this.DatosGeograficos.ipoblacion_municipio = this.ipoblacion_municipio
                this.DatosGeograficos.ilocalidades_municipio = this.ilocalidades_municipio
                this.DatosGeograficos.marginacion = this.marginacion

                /*2*/
                this.$emit("set-icveEdo", {
                    datos: this.DatosGeograficos
                });

            } else {
                this.localidadesTabla = [];
                this.ipoblacion_municipio = 0;
            }
        },

        updateLocalidades(e) {
            this.localidades = this.DatosGeograficos.localidadesSeleccionadas
            console.log(this.localidades);
            this.recalcularPoblacionTotal()

        },

        clearLocalidades() {
            this.localidadesData = [];
            this.localidadesHabilitado = false;
            this.localidades = [];
            this.localidadesTabla = [];
        },

        formatNum(num) {
            return new Intl.NumberFormat().format(num);
        },

        setEdoIso() {

            const edoSelect = this.estadosData
                .filter(a => a.clave_agee == this.clave_estado_inegi)
            this.DatosGeograficos.iso = edoSelect[0].iso
            this.DatosGeograficos.clave_agee = this.clave_estado_inegi

            const munSelect = this.municipiosData
                .filter(a => a.cve_agem == this.DatosGeograficos.municipioSeleccionado)
            this.marginacion = munSelect[0].grado_marginacion.descripcion
            this.poblacion_indigena = munSelect[0].poblacion_indigena.descripcion
            this.iTotalPoblacionIndigena = munSelect[0].total_poblacion_indigena
            this.iTotalPoblacionIndigena = this.formatNum(this.iTotalPoblacionIndigena)
            var str = JSON.stringify(munSelect, null, 2); // spacing level = 2                      
        },
        actualizadatos() {
            this.DatosGeograficos.localidades = this.DatosGeograficos.localidadesSeleccionadas
            this.DatosGeograficos.icveestados = this.DatosGeograficos.estadoSeleccionado

            this.DatosGeograficos.poblacion_indigena = this.poblacion_indigena
            this.DatosGeograficos.totpoblacion = this.ipoblacion_municipio
            this.DatosGeograficos.clave_estado_inegi = this.clave_estado_inegi
            this.DatosGeograficos.icve_municipio = this.DatosGeograficos.municipioSeleccionado
            this.DatosGeograficos.ip_poblacion_total_localidades = this.ip_poblacion_total_localidades
            this.DatosGeograficos.ipoblacion_municipio = this.ipoblacion_municipio
            this.DatosGeograficos.ilocalidades_municipio = this.ilocalidades_municipio
            this.DatosGeograficos.marginacion = this.marginacion
            /*2*/
            this.$emit("set-icveEdo", {
                datos: this.DatosGeograficos
            });
        },
    },
    mounted() {
        this.$nextTick(() => {
        })
    },
    async created() {
        await this.initData()
    },
    beforeMount: function () {
        this.cons = this.isCanceled
    },
    computed: {
        poblacionTotalLocalidades() {
            if (this.localidadesData != null) {
                return this.localidadesData.reduce((x, y) => {
                    return x + y.poblacion;
                }, 0)
            } else {
                return 0
            }
        },

        printData() {
            console.log(this.DatosGeograficos);
            return 0
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

.e-control.e-numerictextbox.e-lib.e-input {
    color: black !important;
    font-size: 18px;
    border: 0px;
}
</style>
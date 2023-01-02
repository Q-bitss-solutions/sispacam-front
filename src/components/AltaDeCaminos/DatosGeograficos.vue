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
                        <input v-model="typeOfRoad.tipo_camino" type="radio" id="cabecera" name="tipo_camino"
                            value="C" :disabled="isCanceled" />
                        Cabecera
                    </label>
                    <label class="radio-inline">
                        <input v-model="typeOfRoad.tipo_camino" type="radio" id="agencia" name="tipo_camino"
                            value="A" :disabled="isCanceled" />
                        Agencia
                    </label>
                    <label class="radio-inline">
                        <input v-model="typeOfRoad.tipo_camino" type="radio" id="otro" name="tipo_camino"
                            value="O" :disabled="isCanceled"> Otro
                    </label>
                    <label class="radio-inline">
                        <input v-model="typeOfRoad.otroTipoCamino" v-if="typeOfRoad.tipo_camino == 'O'"
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
                <ejs-combobox
                    id="estado"
                    :class="{ 'form-control-error': $v.selectedState.$error }"
                    :dataSource="states"
                    :fields="fields"
                    placeholder="Selecciona un estado"
                    :change="fetchMunicipalities"
                    :enabled="!!states.length"
                    v-model="selectedState"
                    ref="refEstado"
                >
                </ejs-combobox>
                <div class="row col-md-10">
                    <small v-if="!$v.selectedState.required && $v.selectedState.$error"
                        class="form-text form-text-error">
                        Este campo es obligatorio
                    </small>
                </div>
            </div>

            <div class="col-md-6">

                <!-- MUNICIPIO -->
                <label class="control-label" for="municipio">Municipio</label>
                <ejs-combobox
                    id="municipio"
                    :class="{ 'form-control-error': $v.selectedMunicipality.$error }"
                    :dataSource="municipalities"
                    :fields="fields"
                    placeholder="Selecciona un municipio"
                    :change="obtenerLocalidades"
                    :enabled="!!municipalities.length"
                    v-model="selectedMunicipality"
                    ref="refMunicipio"
                >
                </ejs-combobox>
                <div class="row col-md-10" v-if="!$v.selectedMunicipality.required && $v.selectedMunicipality.$error">
                    <small class="form-text form-text-error">
                        Este campo es obligatorio
                    </small>
                </div>

                <!-- LOCALIDAD -->
                <!-- Checa si el tipo de camino es "Agencia" u "Otro" -->
                <div v-if="'AO'.includes(typeOfRoad.tipo_camino)">
                    <label class="control-label">Localidad</label>
                    <ejs-multiselect
                        id="localidades"
                        :dataSource="localities"
                        :fields="fields"
                        placeholder="Selecciona una localidad"
                        :enabled="!!localities.length"
                        v-model="selectedLocalities"
                        ref="localidades"
                    >
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
                                    <input id="region" v-model="datosGeograficos.region" placeholder="Región"
                                        maxlength="40" class="form-control">
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Ubicación:</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="ubicacion" v-model="datosGeograficos.ubicacion" placeholder="Ubicación"
                                        class="form-control">
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Poblacion indígena</label>
                                </div>
                                <div class="col-md-6">
                                    <input v-model="datosGeograficos.poblacion_indigena" class="form-control" type="text"
                                        placeholder="Población indígena" id="poblacion_indigena" disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Grado de marginación:</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" v-model="datosGeograficos.marginacion" class="form-control" disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Total de población indígena:</label>
                                </div>
                                <div class="col-md-6">
                                    <input :value="datosGeograficos.poblacion_indigena" placeholder="Total de población indígena"
                                        class="form-control" disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Clave INEGI estado:</label>
                                </div>
                                <div class="col-md-6">
                                    <input v-model.number="datosGeograficos.icve_estado_inegi" class="form-control" type="number"
                                        disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Clave INEGI municipio:</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="icve_municipio" v-model.number="datosGeograficos.icve_municipio" class="form-control"
                                        type="number" disabled>
                                </div>
                                <!--<div id="datosNivelMunicipal" class="table-responsive"> -->
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Poblacion de municipio:</label>
                                </div>
                                <div class="col-md-6">
                                    <ejs-numerictextbox format='n' :showSpinButton='false' :enabled='false'
                                        aria-disabled='false' :value="datosGeograficos.totpoblacion">
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
                                                    <input id="noLocalidadesMun" v-model.number="datosGeograficos.ilocalidades_municipio"
                                                        class="form-control" type="number" disabled>
                                                </th>
                                            </tr>

                                            <tr>
                                                <th>Nombre</th>
                                                <th>Población</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="locality in selectedLocalitiesArray" :key="locality.id">
                                                <td class="col-md-6">{{ locality.nombre }}</td>
                                                <td class="col-md-6">{{ formatNum(locality.poblacion) }}</td>
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
                                                    v-model.number="datosGeograficos.ipoblacion_municipio" :enabled='false' value="0">
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
                    <!-- <div class="row" v-show="false">
                        <button type="button" class="btn btn-default pull-right vertical-buffer" data-toggle="modal"
                            @click="$router.push('/datoscamino')">
                            Siguiente
                        </button>
                    </div> -->
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
import { getEdos, getMunicipios, getLocalidades } from '@/api/alta-camino'
import { required } from 'vuelidate/lib/validators'

Vue.use(NumericTextBoxPlugin);
Vue.use(ComboBoxPlugin);
Vue.use(MultiSelectPlugin);

export default {
    name: 'datosGeograficos',
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
            states: [],
            statesFields: { text: 'nombre', value: 'clave_agee' },
            selectedState: '',
            municipalities: [],
            municipalitiesFields: { text: 'nombre', value: 'clave_agem' },
            selectedMunicipality: '',
            localities: [],
            localitiesFields: { text: 'nombre', value: 'clave_loc' },
            fields: { text: 'nombre', value: 'id' },
            selectedLocalities: [],
            // Tipo Camino
            typeOfRoad: {
                tipo_camino: '',
                otroTipoCamino: null,   //String que especifica el tipo de camino cuando se elige "Otro"
            },
            region: '',
            ubicacion: '',
            gradosMarginacion: {
                '': 0,
                'Muy bajo': 1,
                'Bajo': 2,
                'Medio': 3,
                'Alto': 4,
                'Muy alto': 5,
            },
        };
    },
    validations: {
        selectedState: {
            required,
        },
        selectedMunicipality: {
            required,
        },
    },
    methods: {
        //Envia datos
        enviarDatos() {
            console.log("ENVIAR DATOS");
            this.datosGeograficos.cve_agee = this.datosGeograficos.estadoSeleccionado
            this.datosGeograficos.icve_estado_inegi = this.datosGeograficos.estadoSeleccionado
            this.datosGeograficos.icve_municipio = this.icve_municipio
            this.datosGeograficos.localidades = this.datosGeograficos.localidadesSeleccionadas
            this.datosGeograficos.ilocalidades_municipio = this.datosGeograficos.localidadesSeleccionadas.length
            this.datosGeograficos.ip_poblacion_total_localidades = 314159
            this.datosGeograficos.poblacion_indigena = "314159"
            this.datosGeograficos.totpoblacion = 314159
            this.datosGeograficos.marginacion = 314159
            this.datosGeograficos.ipoblacion_municipio = 314159
            console.log(this.datosGeograficos);

            this.$emit("set-icveEdo", {
                datos: this.datosGeograficos
            });
        },
        async fetchMunicipalities() {
            try {
                this.municipalities = []
                this.municipalities = await getMunicipios(this.selectedStateObject.clave_agee)
            } catch (error) {
                console.error(error)
                this.$emit("show-error", error)
            }
        },
        async obtenerLocalidades() {
            try {
                this.localities = await getLocalidades(this.selectedMunicipalityObject.id)
            } catch (error) {
                console.error(error)
                this.$emit('show-error', error)
            }
        },
        formatNum(num) {
            return new Intl.NumberFormat().format(num);
        },
    },
    async created() {
        try {
            this.states = await getEdos()
        } catch (error) {
            console.error('error al obtener estados')
            this.$emit("show-error", error)
        }
    },
    computed: {
        datosGeograficos() {
            return {
                tipo_camino: this.typeOfRoad.tipo_camino,
                camino_otro: this.typeOfRoad.otroTipoCamino,
                estadoSeleccionado: this.selectedState,
                municipioSeleccionado: this.selectedMunicipality,
                localidadesSeleccionadas: this.selectedLocalitiesArray,
                cve_agee: null,
                icve_estado_inegi: this.selectedStateObject.clave_agee,
                icve_municipio: this.selectedMunicipalityObject.clave_agem,
                ip_poblacion_total_localidades: 314159,
                iso: "",
                marginacion: this.gradoMarginacion,
                poblacion_indigena: this.selectedLocalitiesArray.reduce((a, b) => a + b.poblacion_indigena, 0),
                abreviaturaEdo: "",
                localidades: [],
                icveestados: "",
                region: this.region,
                ubicacion: this.ubicacion,
                totpoblacion: this.selectedMunicipalityObject.poblacion,
                ipoblacion_municipio: this.selectedLocalitiesArray.reduce((a, b) => a + b.poblacion, 0),
                ilocalidades_municipio: this.selectedLocalitiesArray.length,
            }
        },
        selectedStateObject() {
            return this.states.find(state => state.id === this.selectedState) || {}
        },
        selectedMunicipalityObject() {
            return this.municipalities.find(municipality => municipality.id === this.selectedMunicipality) || {}
        },
        selectedLocalitiesArray() {
            if (this.esTipoCabeceraElCamino) {
                return this.localities
            } else {
                return this.localities.filter(locality => this.selectedLocalities.includes(locality.id))
            }
        },
        gradoMarginacion() {
            const gradosMarginacion = this.selectedLocalitiesArray.map(municipality => this.gradosMarginacion[municipality.grado_marginacion])
            const maximoGradoMarginacion = Math.max(...gradosMarginacion)
            return Object.keys(this.gradosMarginacion).find(key => this.gradosMarginacion[key] === maximoGradoMarginacion)
        },
        esTipoCabeceraElCamino() {
            return this.typeOfRoad.tipo_camino === 'C'
        },
    },
    beforeMount() {
        this.typeOfRoad.tipo_camino = 'C'
    },
    /* watch: {
        esTipoCabeceraElCamino(newType, oldType) {
            console.log(newType, oldType)
            if (this.esTipoCabeceraElCamino) {
                console.log('all');
                this.selectedLocalities = this.localities
            } else {
                console.log('empty');
                this.selectedLocalities = []
            }
        },
    }, */
}
</script>

<style>
@import "./../../../node_modules/@syncfusion/ej2-bootstrap-theme/styles/bootstrap.css";

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
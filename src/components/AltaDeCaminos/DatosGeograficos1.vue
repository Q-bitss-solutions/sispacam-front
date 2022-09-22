<template>
    <div>

        <!-- TIPO DE CAMINO -->
        <div class="row">
            <div class="col-md-12">
                <h2>Tipo de Camino WIUIU</h2>
                <hr class="red">
            </div>
            <div class="col-md-12">
                <label for="tipoCamino">Tipo de Camino:</label>
                <div id="tipoCamino">
                    <label class="radio-inline">
                        <input v-model="tipoCamino" type="radio" id="cabecera" name="tipo_camino" value="C"
                            :disabled="isCanceled" />
                        Cabecera
                    </label>
                    <label class="radio-inline">
                        <input v-model="tipoCamino" type="radio" id="agencia" name="tipo_camino" value="A"
                            :disabled="isCanceled" />
                        Agencia
                    </label>
                    <label class="radio-inline">
                        <input v-model="tipoCamino" type="radio" id="otro" name="tipo_camino" value="O"
                            :disabled="isCanceled"> Otro
                    </label>
                    <label class="radio-inline">
                        <input v-model="tipoCaminoOtro" v-if="tipoCamino == 'O'" placeholder="Especificar otro" />
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
                <ejs-combobox :class="{'form-control-error': $v.selectedEstado.$error}" id="estado"
                    :dataSource="estadosData.list" :fields="estadosData.fields" placeholder="Selecciona un estado"
                    :change="updateEstado" v-model="selectedEstado" ref="refEstado">
                </ejs-combobox>
                <div class="row col-md-10">
                    <small v-if="!$v.selectedEstado.required && $v.selectedEstado.$error"
                        class="form-text form-text-error">
                        Este campo es obligatorio
                    </small>
                </div>
            </div>

            <div class="col-md-6">

                <!-- MUNICIPIO -->
                <label class="control-label" for="municipio">Municipio</label>
                <ejs-combobox :class="{'form-control-error': $v.selectedMunicipioData.$error}" id="municipio"
                    :dataSource="municipioData.list" :fields="municipioData.fields"
                    placeholder="Selecciona un municipio" :change="updateMunicipio"
                    :enabled="localState.municipiosHabilitado" v-model="selectedMunicipioData.municipio"
                    ref="refMunicipio">
                </ejs-combobox>
                <div class="row col-md-10" v-if="!$v.selectedMunicipioData.required && $v.selectedMunicipioData.$error">
                    <small class="form-text form-text-error">
                        Este campo es obligatorio
                    </small>
                </div>

                <!-- LOCALIDADES -->
                <div v-if="'AO'.includes(tipoCamino)">
                    <label class="control-label">Localidad</label>
                    <ejs-multiselect :dataSource="localidadesData.list" :fields="localidadesData.fields"
                        placeholder="Selecciona una localidad" :enabled="localState.localidadesHabilitado"
                        v-model="selectedLocalidadesData.localidades" id="localidades" ref="localidades"
                        :change="updateLocalidades">
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
                                    <input id="region" v-model="region" placeholder="Región" maxlength="40"
                                        class="form-control">
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Ubicación:</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="ubicacion" v-model="ubicacion" placeholder="Ubicación"
                                        class="form-control">
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Población indígena</label>
                                </div>
                                <div class="col-md-6">
                                    <input v-model="selectedMunicipioData.poblacionIndigena" class="form-control"
                                        type="text" placeholder="Población indígena" id="poblacion_indigena" disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Grado de marginación:</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" v-model="selectedMunicipioData.marginacion" class="form-control"
                                        disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Total de población indígena:</label>
                                </div>
                                <div class="col-md-6">
                                    <input :value="selectedMunicipioData.totalPoblacionIndigena"
                                        placeholder="Total de población indígena" class="form-control" disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Clave INEGI estado:</label>
                                </div>
                                <div class="col-md-6">
                                    <input v-model.number="selectedEstado" class="form-control" type="number" disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Clave INEGI municipio:</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="icve_municipio" v-model.number="selectedMunicipioData.municipio"
                                        class="form-control" type="number" disabled>
                                </div>
                                <div class="col-md-12 help-block"></div>
                                <div class="col-md-6">
                                    <label>Poblacion de municipio:</label>
                                </div>
                                <div class="col-md-6">
                                    <ejs-numerictextbox format='n' :showSpinButton='false'
                                        v-model.number="selectedMunicipioData.poblacionMunicipio" :enabled='false'
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
                                                    <input id="noLocalidadesMun"
                                                        v-model.number="selectedMunicipioData.totalLocalidades"
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
                                                    v-model.number="selectedLocalidadesData.poblacionTotalLocalidades"
                                                    :enabled='false' value="0">
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
                    <a type="button" class="btn btn-default pull-right vertical-buffer" href="#datosCamino"
                        aria-controls="profile" role="tab" data-toggle="tab" id="input-1" aria-expanded="true">
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
            tipoCamino: '',
            tipoCaminoOtro: '',
            estadosData: {
                fields: {
                    text: 'nom_agee',
                    value: 'cve_agee'
                },
                list: []
            },
            selectedEstado: '',
            selectedMunicipioData: {
                municipio: '',
                totalLocalidades: 0,
                poblacionMunicipio: 0,
                marginacion: '',
                poblacionIndigena: '',
                totalPoblacionIndigena: 0,
            },
            selectedLocalidadesData: {
                localidades: [],
                poblacionTotalLocalidades: 0,
            },
            municipioData: {
                fields: {
                    text: 'nom_agem',
                    value: 'cve_agem',
                    custom: 'cve_agee'
                },
                list: []
            },
            localidadesData: {
                fields: {
                    text: 'nom_loc',
                    value: 'cve_loc'
                },
                list: []
            },
            localidadesTabla: [],
            region: '',
            ubicacion: '',
            localState: {
                municipiosHabilitado: false,
                localidadesHabilitado: false,
            }
        }
    },
    validations: {
        selectedEstado: {
            required,

        },
        selectedMunicipioData: {
            required,
        },
    },
    methods: {
        // Función que recibe el catalogo de estados del INEGI
        async initData() {
            try {
                const res = await getEdos()
                const results = res.results;
                this.estadosData.list = results;
                console.log(results);

            } catch (error) {
                console.log('error al obtener estados')
                console.log(error);
                this.$emit("show-error", error);
            }
        },

        // Obtiene municipios
        async updateEstado() {
            this.$emit("show-error", false);
            this.localState.municipiosHabilitado = true;
            this.clearLocalidades();
            try {
                const { results } = await getMunicipios(this.selectedEstado)
                this.municipioData.list = results
            } catch (err) {
                console.log('error al obtener municipios')
                console.log(err)
                this.$emit("show-error", err);
            }
        },

        // Actualiza la info del estado 
        async updateMunicipio() {
            try {
                // TODO : investigar el emit : show error
                this.$emit("show-error", false);
                this.clearLocalidades();
                const res = await getLocalidades(this.selectedEstado,
                    this.selectedMunicipioData.municipio)
                this.localState.localidadesHabilitado = true;
                this.localidadesData.list = res
                this.getPopulationInfo()
                // TODO: Checar si este método es útil
                this.setEdoIso()
            } catch (error) {
                console.log('error al obtener localidades')
                console.log(error);
                this.$emit("show-error", error);
            }
        },
        updateLocalidades() {
            this.getPopulationInfo()

        },

        clearLocalidades() {
            this.selectedLocalidadesData = {
                localidades: [],
                poblacionTotalLocalidades: 0,
            }
        },

        async getPopulationInfo() {

            const res = await getLocalidades(this.selectedEstado, this.selectedMunicipioData.municipio)

            this.selectedMunicipioData.totalLocalidades = res.length;
            this.selectedLocalidadesData.poblacionTotalLocalidades = res.reduce((x, y) => {
                return x + y.pob;
            }, 0)

            console.log(res[0]);
            this.selectedMunicipioData.marginacion = res[0].grado_marginacion.descripcion
            this.selectedMunicipioData.poblacionIndigena = res[0].poblacion_indigena.descripcion
            this.selectedMunicipioData.totalPoblacionIndigena = res[0].total_poblacion_indigena


            if (this.selectedLocalidadesData.localidades.length > 0) {
                const locData = this.localidadesData.list;
                this.localidadesTabla = locData
                    .filter(a => this.localidades.includes(a.cve_loc));

                this.selectedMunicipioData.poblacionMunicipio = localidadesData
                    .filter(a => this.localidades.includes(a.cve_loc))
                    .map(a => a.pob)
                    .reduce((a, b) => (a + b), 0);

                //TODO: Checar que hace
                this.$emit("set-icveEdo", {
                    datos: this.DatosGeograficos
                });
            } else {
                this.localidadesTabla = [];
                this.selectedMunicipioData.poblacionMunicipio = 0;
            }
        },
    },
    async created() {
        await this.initData()
    },
}

</script>
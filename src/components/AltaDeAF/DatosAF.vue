<template>

    <div>
        <table ref="datosPersonales" id="datosPersonales" class="tableContenido" width="100%" border="0">

            <tbody>
                <tr>
                    <td>

                        <div class="col-md-12 " id="logotipoX">
                            <center>
                                <img :src="this.simg" id="imgancho" alt="Ancho de Camino" />
                            </center>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h2>Superficie de rodamiento​​</h2>
                        <hr class="red">
                    </td>
                </tr>
                <tr>
                    <div class="form-group">
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Izquierda</th>
                                    <th>Empedrado Central​</th>
                                    <th>Derecha</th>
                                </tr>
                            </thead>
                            <tr>
                                <td>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <label class="control-label" for="roderaizq">Rodera 1 (m)​</label>
                                                <input class="form-control" v-model="FrmRodamiento.rodera1_izquierda"
                                                    id="roderaizq" placeholder=" " type="number" :disabled="editmode">
                                            </div>
                                            <div class="col-sm-4">
                                                <label class="control-label" for="empedradoizq">Empedrado (m)​</label>
                                                <input class="form-control" v-model="FrmRodamiento.empedrado_izquierda"
                                                    id="empedradoizq" placeholder=" " type="number">
                                            </div>
                                            <div class="col-sm-4">
                                                <label class="control-label" for="roderader">Rodera 2 (m)​</label>
                                                <input class="form-control" v-model="FrmRodamiento.rodera2_izquierda"
                                                    id="roderaeder" placeholder=" " type="number">
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group">
                                        <div class="row">

                                            <div class="col-sm-12">
                                                <label class="control-label" for="Empedradocen">Empedrado
                                                    central</label>
                                                <input class="form-control" v-model="FrmRodamiento.empedrado_central"
                                                    id="Empedradocen" placeholder=" " type="number"
                                                    :disabled="editmodecen">
                                            </div>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <label class="control-label" for="rodera1der">Rodera 1 (m)​</label>
                                                <input class="form-control" v-model="FrmRodamiento.rodera1_derecha"
                                                    id="rodera1der" placeholder=" " type="number">
                                            </div>
                                            <div class="col-sm-4">
                                                <label class="control-label" for="empedradoder">Empedrado (m)​</label>
                                                <input class="form-control" v-model="FrmRodamiento.empedrado_derecha"
                                                    id="empedradoder" placeholder=" " type="number">
                                            </div>
                                            <div class="col-sm-4">
                                                <label class="control-label" for="rodera2der">Rodera 2 (m)​</label>
                                                <input class="form-control" v-model="FrmRodamiento.rodera2_derecha"
                                                    id="rodera2der" placeholder=" " type="number" :disabled="editmode">
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </tr>
                <tr>
                    <td>
                        <h2>Avance Físico​​</h2>
                        <hr class="red">
                    </td>
                </tr>
                <tr>
                    <div class="form-group">
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Avance ponderado​ semana pasada​</th>
                                    <th>Avance ponderado de la semana​</th>
                                    <th>Avance ponderado acumulado​</th>
                                </tr>
                            </thead>
                            <tr>
                                <td align="center">
                                    <div class="col-sm-4 ">
                                        <label class="control-label" for="kmpsp">Km​​</label>
                                        <input class="form-control" v-model="kmpsp" id="kmpsp" placeholder=" "
                                            type="number" disabled>
                                    </div>
                                    <div class="col-sm-4 ">
                                        <label class="control-label" for="porcenpsp">%</label>
                                        <input class="form-control" v-model="porcenpsp" id="porcenpsp" placeholder=" "
                                            type="number" disabled>
                                    </div>
                                </td>
                                <td align="center">
                                    <div class="col-sm-4">
                                        <label class="control-label" for="kmps">Km​​</label>
                                        <input class="form-control" v-model="kmps" id="kmps" placeholder=" "
                                            type="number" disabled>
                                    </div>
                                    <div class="col-sm-4">
                                        <label class="control-label" for="porcenps">%</label>
                                        <input class="form-control" v-model="porcenps" id="porcenps" placeholder=" "
                                            type="number" disabled>
                                    </div>

                                </td>
                                <td align="center">
                                    <div class="col-sm-4 ">
                                        <label class="control-label" for="kmpa">Km​​</label>
                                        <input class="form-control" v-model="kmpspa" id="kmps" placeholder=" "
                                            type="number" disabled>
                                    </div>
                                    <div class="col-sm-4 ">
                                        <label class="control-label" for="porcenpa">%</label>
                                        <input class="form-control" v-model="porcenpa" id="porcenpa" placeholder=" "
                                            type="number" disabled>
                                    </div>

                                </td>
                            </tr>
                        </table>

                    </div>
                </tr>



                <div class="col-md-12 text-right">

                    <button class="btn btn-default" type="button" v-on:click="guardaInfoRodamiento">Guardar </button>
                    <button class="btn btn-default" type="button" v-on:click="cancelarRodamiento">Cancelar</button>
                </div>


            </tbody>
        </table>
    </div>
</template>

<script>
import Vue from "vue";
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { ComboBoxPlugin, MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { getEdos, getMunicipios, getLocalidades, guardaRodamiento } from '@/api/alta-camino'
import { getupdate } from '@/api/alta-camino';

import { required } from 'vuelidate/lib/validators'
import { Message } from 'element-ui'

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
            simg: '',
            valueEstado: 0,
            ip_poblacion_total_localidades: 0,
            ipoblacion_municipio: 0,
            ilocalidades_municipio: 0,
            ubicacion: '',
            region: '',
            icve_estado_inegi: null,
            estadosHabilitado: false,
            estadosData: [],
            estadosFields: { text: 'nom_agee', value: 'cve_agee' },
            icve_municipio: null,
            municipiosHabilitado: false,
            municipiosData: [],
            municipiosFields: { text: 'nom_agem', value: 'cve_agem', custom: 'cve_agee' },
            localidades: [],
            localidadesHabilitado: false,
            localidadesData: [],
            localidadesFields: { text: 'nom_loc', value: 'cve_loc' },
            localidadesTabla: [],
            iTotalPoblacionIndigena: null,
            poblacion: 0,
            marginacion: null,
            poblacion_indigena: null,
            isoEdo: '',
            editmode: false,
            editmodecen: false,
            editimg: false,
            cons: false,
            clave: '',
            kmps: null,
            porcenps: null,
            kmpspa: null,
            porcenpa: null,



            FrmRodamiento:
            {
                clave: null,
                rodera1_izquierda: null,
                empedrado_izquierda: null,
                rodera2_izquierda: null,
                empedrado_central: null,
                rodera1_derecha: null,
                empedrado_derecha: null,
                rodera2_derecha: null

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
        enviardatos_r() {
            this.$emit("set-icveEdo", {
                datos: this.DatosGeograficos
            });
        },
        cancelarRodamiento() {
            top.location = '/avancefinanciero'
        },
        async guardaInfoRodamiento() {
            console.log("this.FrmRodamiento")
            console.log(this.FrmRodamiento)
            console.log(this.idcamino)
            this.FrmRodamiento.clave = this.idcamino
            try {
                //alert(JSON.stringify(this.FrmInventario))
                console.log("antes de peticion")
                let rs = await guardaRodamiento(this.FrmRodamiento)
                console.log("rs")
                console.log(rs)
                Message({
                    message: 'Se guardo correctamente la información',
                    type: 'success',
                    duration: 3 * 1000
                })
                this.kmps = rs.data.avance_semanal_kilometro
                this.porcenps = rs.data.avance_semanal_porcentaje
                this.kmpspa = rs.data.avance_acumulado_kilometro
                this.porcenpa = rs.data.avance_acumulado_porcentaje
            }
            catch (error) {
                Message({
                    message: rs.Message,
                    type: 'error',
                    duration: 3 * 1000
                })
            }
            //top.location ='/busqueda'
        },
        async CargaDatos(clave) {
            const response = await getupdate(clave)
            this.ciit = response.ciit
            this.tren_maya = response.tren_maya
            this.caminosOriginales = response.caminos_originales
            this.tipo_camino = response.tipo_camino
            this.idcamino = response.clave
            this.nombre_camino = response.nombre_camino
            this.fLongitdTotal = response.longitud
            this.fLongitdTotalAPavimentar = response.longitud_pavimentar
            //this.anchoCaminoData = response.ancho_camino
            this.anchoCaminoFields = response.ancho_camino
            this.ubicacionCamino = response.ubicacion
            this.caracteristicasCamino = response.caracteristicas
            this.beneficiosCamino = response.beneficios
            this.pini = response.pini
            this.pfin = response.pfin
            this.lat = response.lat
            this.latf = response.latf
            this.long = response.long
            this.longf = response.longf

            this.ancho_camino = response.ancho_camino.id

            this.$store.commit('setAnchoCamino', this.ancho_camino)
            // this.$refs.refAncho.ej2Instances.value = response.ancho_camino


            if (response.ancho_camino == 1) this.ancho_camino = 1
            if (response.ancho_camino == 2) this.ancho_camino = 2
            if (response.ancho_camino == 3) this.ancho_camino = 3
            if (response.ancho_camino == 4) this.ancho_camino = 4
            if (response.ancho_camino == 5) this.ancho_camino = 5

            if (this.ancho_camino == 1) this.Presup = "$ 2,700,104.59"
            if (this.ancho_camino == 2) this.Presup = "$ 3,100,198.29"
            if (this.ancho_camino == 3) this.Presup = "$ 3,507,565.95"
            if (this.ancho_camino == 4) this.Presup = "$ 3,929,902.41"
            if (this.ancho_camino == 5) this.Presup = "$ 4,300,019.57"

            if (this.ancho_camino == 1) { this.editmode = true }
            if (this.ancho_camino == 2) { this.editmode = true }
            if (this.ancho_camino == 3) { this.editmodecen = true }

            if (this.ancho_camino == 1) this.simg = '/img/ancho4.jpg'
            if (this.ancho_camino == 2) this.simg = "/img/ancho4-5.jpg"
            if (this.ancho_camino == 3) this.simg = "/img/ancho5.jpg"
            if (this.ancho_camino == 4) this.simg = "/img/ancho5-5.jpg"
            if (this.ancho_camino == 5) this.simg = "/img/ancho6.jpg"

            document.getElementById("imgancho").src = this.simg;
            //$('#logotipoX').html('<img src="require('+ this.simg +')" id="imgancho" alt="Ancho de Camino" width="500" height="1000" />')


            console.log("this.ancho_camino")
            console.log(this.ancho_camino)

            console.log("-------")
            console.log(this.simg)

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
                const results = res.results;
                this.estadosData = res.results;//new DataManager(results);
                this.estadosHabilitado = true;
                this.icve_estado_inegi = null;
            } catch (error) {
                console.log('error al obtener estados')
                console.log(error);
                this.$emit("show-error", error);
            }
        },
        //municipios
        async obtenerMunicipios() {
            this.$emit("show-error", false);
            this.icve_municipio = null;
            //this.municipiosData = new DataManager([]);
            this.municipiosHabilitado = true;
            this.clearLocalidades();
            try {
                const { results } = await getMunicipios(this.icve_estado_inegi)
                this.municipiosData = results//new DataManager(results);
                this.municipiosHabilitado = true;
            } catch (err) {
                console.log('error al obtener municipios')
                console.log(err)
                this.$emit("show-error", err);
            }
        },
        //localidades
        async obtenerLocalidades() {
            try {
                this.$emit("show-error", false);
                this.clearLocalidades();
                const res = await getLocalidades(this.icve_estado_inegi,
                    this.icve_municipio)
                this.ilocalidades_municipio = res.length;
                this.ip_poblacion_total_localidades = res.reduce((x, y) => {
                    return x + y.pob;
                }, 0)

                this.localidadesHabilitado = true;
                this.localidadesData = res//new DataManager(res);
                this.setEdoIso()
                this.DatosGeograficos.localidades = this.localidades
                this.DatosGeograficos.icveestados = this.icveestados
                this.DatosGeograficos.region = this.region
                this.DatosGeograficos.ubicacion = this.ubicacion
                this.DatosGeograficos.poblacion_indigena = this.poblacion_indigena
                this.DatosGeograficos.totpoblacion = this.ipoblacion_municipio
                this.DatosGeograficos.icve_estado_inegi = this.icve_estado_inegi
                this.DatosGeograficos.icve_municipio = this.icve_municipio
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
                this.DatosGeograficos.localidades = this.localidades
                this.DatosGeograficos.icveestados = this.icveestados
                this.DatosGeograficos.region = this.region
                this.DatosGeograficos.ubicacion = this.ubicacion
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
                    datos: this.DatosGeograficos
                });

            } else {
                this.localidadesTabla = [];
                this.ipoblacion_municipio = 0;
            }
        },
        updateLocalidades(e) {
            this.localidades = this.$refs.localidades.ej2Instances.value
            this.recalcularPoblacionTotal()

        },

        clearLocalidades() {
            this.localidadesData = null;
            this.localidadesHabilitado = false;
            this.localidades = [];
            this.localidadesTabla = [];
        },

        formatNum(num) {
            return new Intl.NumberFormat().format(num);
        },

        setEdoIso() {

            const edoSelect = this.estadosData
                .filter(a => a.cve_agee == this.icve_estado_inegi)
            this.DatosGeograficos.iso = edoSelect[0].iso
            this.DatosGeograficos.cve_agee = this.icve_estado_inegi
            /*           this.$emit("set-icveEdo", {
                           edo:{
                               abreviaturaEdo:this.icve_estado_inegi,
                               iso:edoSelect[0].iso
                           }
                           }); 
            */
            const munSelect = this.municipiosData
                .filter(a => a.cve_agem == this.icve_municipio)
            this.marginacion = munSelect[0].grado_marginacion.descripcion
            this.poblacion_indigena = munSelect[0].poblacion_indigena.descripcion
            this.iTotalPoblacionIndigena = munSelect[0].total_poblacion_indigena
            this.iTotalPoblacionIndigena = this.formatNum(this.iTotalPoblacionIndigena)
            var str = JSON.stringify(munSelect, null, 2); // spacing level = 2                      
        },
        actualizadatos() {
            this.DatosGeograficos.localidades = this.localidades
            this.DatosGeograficos.icveestados = this.icveestados
            this.DatosGeograficos.region = this.region
            this.DatosGeograficos.ubicacion = this.ubicacion
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
        if (this.$route.params.obraId) {
            this.estadosHabilitado = false
            this.CargaDatos(this.$route.params.obraId)
            //this.editmode = true
        }
    },
    beforeMount: function () {
        this.cons = this.isCanceled
    },
    computed: {
        getEditmode() {
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

.e-control.e-numerictextbox.e-lib.e-input {
    color: black !important;
    font-size: 18px;
    border: 0px;
}
</style>
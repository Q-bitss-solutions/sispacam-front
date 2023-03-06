<template>
    <div>
        <table id="datosCamino" class="tableContenido" width="100%" border="0">
            <tr>
                <td>
                    <h2>Datos del Camino</h2>
                    <h2>{{ idcamino }}</h2>
                    <hr class="red">
                </td>
            </tr>
            <tr>
                <td>
                    <div v-if="this.$store.getters['user/StateRol'] == 'NORMATIVO' ? true : false" class="form-group">
                        <div class="col-md-6">
                            <!-- MUNICIPIO -->
                            <label class="control-label" for="municipio">Municipio</label>
                            <ejs-combobox id="municipio" :dataSource="municipioDataList" :fields="municipioDataFields"
                                placeholder="Selecciona un municipio" v-model="municipioData" ref="refMunicipio"
                                @change="LocalidadesMunicipio()">
                            </ejs-combobox>
                        </div>
                        <div class="col-md-6">
                            <!-- LOCALIDADES -->
                            <label class="control-label">Localidad</label>
                            <ejs-multiselect :dataSource="localidadesData.list" :fields="localidadesData.fields"
                                placeholder="Selecciona una localidad" v-model="localidadesData.data" id="localidades"
                                ref="localidades">
                            </ejs-multiselect>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label>Estrategia Gobierno Federal:</label>
                        <div>
                            <label class="checkbox-inline">
                                <input type="checkbox" id="ciit" value="true" name="ciit" v-model="ciit"
                                    :disabled="isCanceled">
                                CIIT
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" id="trenMaya" value="trenMaya" name="trenMaya" v-model="tren_maya"
                                    :disabled="isCanceled">
                                Tren Maya
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" id="caminosOriginales" value="caminosOriginales"
                                    name="caminosOriginales" v-model="caminosOriginales" :disabled="isCanceled">
                                Caminos Originales
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-4" v-show="false">
                            <div>
                                <label for="camino">ID Camino:</label>
                                <input id="camino" name="LADA3" class="form-control" placeholder="Id Camino" value=""
                                    :disabled="isCanceled" v-model="idcamino">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label for="nombrecamino">Nombre del Camino:</label>
                            <input v-model="nombre_camino" :class="{ 'form-control-error': $v.nombre_camino.$error }"
                                id="nombre_camino" name="nombre_camino" v-model.trim="$v.nombre_camino.$model"
                                class="form-control" type="text" placeholder="Nombre del Camino" :disabled="isCanceled"
                                value="" />
                            <div class="row col-md-10">
                                <small v-if="!$v.nombre_camino.required && $v.nombre_camino.$error"
                                    class="form-text form-text-error">
                                    Este campo es obligatorio
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 help-block" />

                    <div class="form-group">

                        <div class="col-md-4">
                            <label>Longitud total(km):</label>
                            <div>
                                <ejs-numerictextbox :class="{ 'form-control-error': $v.longitud_camino.$error }"
                                    id="longitud" placeholder="Longitud total(km)" v-model="longitud_camino" :min="min"
                                    :max="max" :disabled="isCanceled" :showSpinButton='false'>
                                </ejs-numerictextbox>
                                <div class="row col-md-10">
                                    <small v-if="!$v.longitud_camino.required && $v.longitud_camino.$error"
                                        class="form-text form-text-error">
                                        Este campo es obligatorio
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label>Longitud a pavimentar 2019-2024(km):</label>
                            <div>
                                <ejs-numerictextbox :class="{ 'form-control-error': $v.longitud_pavimentar.$error }"
                                    id="longitud_pavimentar" placeholder="Longitud a pavimentar 2019-2024(km)"
                                    v-model="longitud_pavimentar" :min="min" :max="max" :disabled="isCanceled"
                                    :showSpinButton='false'>
                                </ejs-numerictextbox>
                                <div class="row col-md-10">
                                    <small v-if="!$v.longitud_pavimentar.required && $v.longitud_pavimentar.$error"
                                        class="form-text form-text-error">
                                        Este campo es obligatorio
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <label>Ancho del Camino:</label>
                            <ejs-dropdownlist :class="{ 'form-control-error': $v.ancho_camino.$error }" id="ancho_camino"
                                :dataSource="anchoCaminoData" :change="obteneranchocamino" :fields="anchoCaminoFields"
                                placeholder="Selecciona el ancho del camino" v-model="ancho_camino"
                                v-model.trim="$v.ancho_camino.$model" ref="refAncho" :enabled="!isCanceled">
                            </ejs-dropdownlist>
                            <div class="row col-md-10">
                                <small v-if="!$v.ancho_camino.required && $v.ancho_camino.$error"
                                    class="form-text form-text-error">
                                    Este campo es obligatorio
                                </small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label>Presupuesto Base por Kilometro:</label>
                            <input id="Presup" type="text" class="form-control" placeholder="" value=""
                                :disabled="isCanceled" v-model="Presup">
                        </div>
                        <div class="col-md-4">
                            <label>Presupuesto Base de obra total:</label>
                <td>
                    <vue-numeric v-bind:precision="2" currency="$" separator="," class="form-control" v-model="resul"
                        :read-only="true">
                    </vue-numeric>
                </td>
    </div>
    </div>
    </td>
    </tr>
    </table>

    <!-- Datos Georeferenciales -->
    <div class="row">
        <TituloSeccion title="Datos Georeferenciales" />

        <!-- Punto Inicial -->
        <div class="col-md-6">
            <div class="col-md-12">
                <h4>Punto Inicial</h4>
            </div>
            <div class="form-group col-md-6 pt-4">
                <label>Lat:</label>
                <div class="mt-2">
                    <ejs-numerictextbox :class="{ 'form-control-error': $v.lat_inicial.$error }" id="latitud"
                        placeholder="Lat" v-model="lat_inicial" format='n5' :min="min" :max="max" :disabled="isCanceled"
                        :showSpinButton='false'>
                    </ejs-numerictextbox>
                    <div class="row col-md-10">
                        <small v-if="!$v.lat_inicial.required && $v.lat_inicial.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                        </small>
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <label>Long:</label>
                <div>
                    <ejs-numerictextbox :class="{ 'form-control-error': $v.lon_inicial.$error }" placeholder="Long"
                        format='n5' v-model="lon_inicial" :min="min" :max="max" :disabled="isCanceled"
                        :showSpinButton='false'>
                    </ejs-numerictextbox>
                    <div class="row col-md-10">
                        <small v-if="!$v.lon_inicial.required && $v.lon_inicial.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                        </small>
                    </div>
                </div>

            </div>
        </div>

        <!-- Punto Final -->
        <div class="col-md-6">
            <div class="col-md-12">
                <h4>Punto Final</h4>
            </div>
            <div class="form-group col-md-6 pt-4">
                <label>Lat:</label>
                <div class="mt-2">
                    <ejs-numerictextbox :class="{ 'form-control-error': $v.lat_final.$error }" id="latitud"
                        placeholder="Lat" v-model="lat_final" format='n5' :min="min" :max="max" :disabled="isCanceled"
                        :showSpinButton='false'>
                    </ejs-numerictextbox>
                    <div class="row col-md-10">
                        <small v-if="!$v.lat_final.required && $v.lat_final.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                        </small>
                    </div>
                </div>
            </div>
            <div class="form-group col-md-6">
                <label>Long:</label>
                <div>
                    <ejs-numerictextbox :class="{ 'form-control-error': $v.lon_final.$error }" placeholder="Long"
                        format='n5' v-model="lon_final" :min="min" :max="max" :disabled="isCanceled"
                        :showSpinButton='false'>
                    </ejs-numerictextbox>
                    <div class="row col-md-10">
                        <small v-if="!$v.lon_final.required && $v.lon_final.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                        </small>
                    </div>
                </div>

            </div>
        </div>

    </div>

    <table width="100%" border="0">
        <tr>
            <td>
                <div class="form-group">
                    <div class="col-md-12">
                        <label>Características actuales del camino:</label>
                        <div>
                            <textarea rows="3" maxlength="350" id="caracteristicasCamino" name="caracteristicasCamino"
                                class="form-control" value="" :disabled="isCanceled"
                                placeholder="Ingrese las características actuales del camino" v-model="caracteristicas">
                                        </textarea>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    </table>

    <table width="100%" border="0">
        <tr>
            <td>
                <div class="col-md-12 help-block" />
                <div class="form-group">
                    <div class="col-md-12">
                        <label>Beneficios del Camino:</label>
                        <div>
                            <textarea rows="3" maxlength="350" id="beneficiosCamino" name="beneficiosCamino"
                                class="form-control" value="" :disabled="isCanceled"
                                placeholder="Ingrese los beneficios del camino" v-model="beneficios">
                                            </textarea>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    </table>
    <div class="modal fade" id="addCamino" tabindex="-1" role="dialog" aria-labelledby="addConcept" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Aviso del Sistema</h4>
                </div>
                <div class="modal-body">
                    <p>Se guardaron correctamente los datos del camino,</p>
                    <p>El identificador del camino es:<strong class="alert">{{ idcamino }}</strong></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"
                        @click="$router.push('/caminos')">Cerrar</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!--Actualizar -->
    <div class="modal fade" id="UpdateCamino" tabindex="-1" role="dialog" aria-labelledby="addConcept" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Aviso del Sistema</h4>
                </div>
                <div class="modal-body">
                    <p>Se actualizarón correctamente los datos del camino,</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"
                        @click="$router.push('/caminos')">Cerrar</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div class="form-group">
        <div class="row" v-if="!isCanceled">
            <button type="button" class="btn btn-default pull-right vertical-buffer" data-toggle="modal"
                v-on:click="GuardaDatos" :disabled="btnSaveDisabled">
                Guardar Datos
            </button>
        </div>
    </div>
    <div id="alertModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content ">
                <div class="alert alert-danger">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <div class="">Ocurrio un error</div>
                </div>
                <div class="modal-body">
                    <p>El camino no pudo ser guardado favor de intentarlo mas tarde o contactar al
                        area de sistemas</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default" data-dismiss="modal">
                        Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <div id="alertlong" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content ">
                <div class="alert alert-danger">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <div class="">Ocurrio un error</div>
                </div>
                <div class="modal-body">
                    <p>La obra que estás intentando registrar es de tipo Agencia Municipal,
                        y por lo tanto solo debe tener una sola localidad, favor de corregir y reintentar
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default" data-dismiss="modal">
                        Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <div id="alertvalnum" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content ">
                <div class="alert alert-danger">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <div class="">Ocurrio un error</div>
                </div>
                <div class="modal-body">
                    <p>La Longitud a pavimentar no puede ser mayor a la Longitud total
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default" data-dismiss="modal">
                        Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { DataManager } from "@syncfusion/ej2-data";
import { Loading } from 'element-ui';
import { generarId, getupdate, CaminoPut } from '@/api/alta-camino';
import { editarCamino, getDetalleCamino } from '@/api/caminos';
import { getEdos, getMunicipios, getLocalidades } from '@/api/alta-camino'
import Vue from "vue";
import { required } from 'vuelidate/lib/validators'
import VueCurrencyFilter from 'vue-currency-filter'
import TituloSeccion from '@/components/Shared/TituloSeccion.vue';
import { async } from "q";



Vue.use(DropDownListPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(VueCurrencyFilter, {
    symbol: '$', // El símbolo, por ejemplo €
    thousandsSeparator: ',', // Separador de miles
    fractionCount: 4, // ¿Cuántos decimales mostrar?
    fractionSeparator: '.', // Separador de decimales
    symbolPosition: 'front', // Posición del símbolo. Puede ser al inicio ('front') o al final ('') es decir, si queremos que sea al final, en lugar de front ponemos una cadena vacía ''
    symbolSpacing: true // Indica si debe poner un espacio entre el símbolo y la cantidad
})
export default {
    name: 'FormEditarCamino',
    decimals: 5,
    value: 10,
    props: {
        isCanceled: {
            required: true,
            default: false
        }
    },
    components: {
        TituloSeccion
    },
    data() {
        return {
            idcamino: "",
            clave_camino: "",
            clave_estado: "",
            ciit: '',
            tren_maya: '',
            caminosOriginales: '',
            nombre_camino: '',
            longitud_camino: "",
            longitud_pavimentar: "",
            caracteristicas: '',
            beneficios: '',
            lat_inicial: "",
            lon_inicial: "",
            lat_final: "",
            lon_final: "",
            ancho_camino: '',
            min: 0,
            max: 999999,
            resul: '',
            btnSaveDisabled: false,
            Presup: '',
            cons: "true",
            anchoCaminoFields: { text: 'name', value: 'id' },
            anchoCaminoData: [
                { id: 1, name: '4.0' },
                { id: 2, name: '4.5' },
                { id: 3, name: '5.0' },
                { id: 4, name: '5.5' },
                { id: 5, name: '6.0' },
            ],
            municipioDataFields: {
                value: 'id',
                text: 'nombre'
            },
            municipioDataList: [],
            municipioData: '',
            localidadesData: {
                list: [],
                fields: {
                    value: 'id',
                    text: 'nombre'
                },
                data: ''
            },
        }
    },
    validations: {
        nombre_camino: {
            required,

        },
        ancho_camino: {
            required,

        },
        longitud_pavimentar: {
            required,
        },
        longitud_camino: {
            required,
        },
        lat_inicial: {
            required,
        },
        lat_final: {
            required,
        },
        lon_inicial: {
            required,
        },
        lon_final: {
            required,
        },
    },
    methods: {
        async obteneranchocamino() {
            if (this.ancho_camino == 1)
                this.Presup = "$ 2,700,104.59"
            if (this.ancho_camino == 2)
                this.Presup = "$ 3,100,198.29"
            if (this.ancho_camino == 3)
                this.Presup = "$ 3,507,565.95"
            if (this.ancho_camino == 4)
                this.Presup = "$ 3,929,902.41"
            if (this.ancho_camino == 5)
                this.Presup = "$ 4,300,019.57"
            const resultado = (this.Presup.replaceAll('$', '').replaceAll(',', ''))
            this.resul = resultado * (this.fLongitdTotalAPavimentar)
        },

        async CargaDatos(clave) {
            const response = await getDetalleCamino(clave)
            const municipiosEstados = await getMunicipios(response.clave_estado)
            console.log('response', response)

            this.idcamino = response.clave_camino
            this.nombre_camino = response.nombre_camino
            this.clave_estado = response.clave_estado
            this.longitud_camino = response.longitud_camino
            this.longitud_pavimentar = response.longitud_pavimentar
            this.caracteristicas = response.caracteristicas
            this.beneficios = response.beneficios
            this.ciit = response.ciit
            this.tren_maya = response.tren_maya
            this.caminosOriginales = response.caminos_originales
            this.ancho_camino = response.id_ancho_camino
            this.lat_inicial = response.lat_inicial
            this.lon_inicial = response.lon_inicial
            this.lat_final = response.lat_final
            this.lon_final = response.lon_final

            this.municipioDataList = municipiosEstados
            // this.fLongitdTotal = response.longitud
            // this.fLongitdTotalAPavimentar = response.longitud_pavimentar
            // //this.anchoCaminoData = response.ancho_camino
            // this.anchoCaminoFields = response.ancho_camino
            // this.ubicacionCamino = response.ubicacion
            // this.caracteristicasCamino = response.caracteristicas
            // this.beneficiosCamino = response.beneficios
            // this.latitud = response.datos_geograficos.latitud
            // this.punto_inicial = response.datos_geograficos.punto_inicial
            // this.longituddg = response.datos_geograficos.longitud
            // this.punto_final = response.datos_geograficos.punto_final


            this.$store.commit('setAnchoCamino', this.ancho_camino)
            this.$refs.refAncho.ej2Instances.value = response.ancho_camino


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
        },

        async GuardaDatos() {
            this.$emit("show-error", false);
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = "Error";
            } else {
                this.btnSaveDisabled = true
                try {
                    const data = {
                        // Datos Camino
                        nombre_camino: this.nombre_camino,
                        longitud_camino: this.longitud_camino,
                        longitud_pavimentar: this.longitud_pavimentar,
                        caracteristicas: this.caracteristicas,
                        beneficios: this.beneficios,
                        ciit: this.ciit == "" ? false : true,
                        tren_maya: this.tren_maya == "" ? false : true,
                        caminos_originales: this.caminosOriginales == "" ? false : true,
                        id_ancho_camino: this.ancho_camino,
                        lat_inicial: this.lat_inicial,
                        lon_inicial: this.lon_inicial,
                        lat_final: this.lat_final,
                        lon_final: this.lon_final,
                        municipio: this.municipioData,
                        localidad: this.localidadesData.data

                    }
                    if (this.longitud_pavimentar > this.longitud_camino) {
                        $('#alertvalnum').modal('show')
                        this.btnSaveDisabled = false
                        return
                    }
                    let loadingInstance = Loading.service({
                        fullscreen: false,
                        lock: true,
                    });
                    // NUEVO ENDPOINT
                    console.log("DATA");
                    console.log(data);
                    const response = await editarCamino(this.clave_camino, data).finally(() => {
                        loadingInstance.close()
                    })
                    this.idcamino = response.clave
                    $('#addCamino').modal('show')
                    this.btnSaveDisabled = false

                }
                catch (err) {
                    this.btnSaveDisabled = false
                    console.log('error al obtener el Id-Camino')
                    console.log(err)
                    this.$emit("show-error", 'Error al guardar camino por');
                }
            }
        },

        async LocalidadesMunicipio() {
            if (this.municipioData === null) {
                this.localidadesData.list = []
                this.localidadesData.data = ''
            } else {
                const localidadesMunicipioEstado = await getLocalidades(this.municipioData)
                this.localidadesData.list = localidadesMunicipioEstado
            }

        }
    },
    created() {
        this.clave_camino = this.$route.params.obraId
        this.CargaDatos(this.$route.params.obraId)

        if (this.$route.params.obraId) {
            this.editmode = true
        }
    },

    beforeMount: function () {
        this.cons = this.isCanceled
    },
}
</script>

<style >
.form-control-idCamino {
    width: 50%;
    margin-right: 6%;
}

.form-control-nombre_camino {
    width: 50%;

}

.e-input[disabled],
.e-input-group .e-input[disabled],
.e-input-group.e-control-wrapper .e-input[disabled],
.e-input-group.e-disabled,
.e-input-group.e-control-wrapper.e-disabled,
.e-float-input input[disabled],
.e-float-input.e-control-wrapper input[disabled],
.e-float-input textarea[disabled],
.e-float-input.e-control-wrapper textarea[disabled],
.e-float-input.e-disabled,
.e-float-input.e-control-wrapper.e-disabled {
    -webkit-text-fill-color: #555;
    background: #eee;
    color: #999;
    border-color: #ccc;
}
</style>
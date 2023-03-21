<template>
    <div>
        <div>
            <div class="menuDesplegable" v-if="data.estatus.id === 1">
                <ul><a>
                        <el-button size="small" type="success" @click="classMenuDespegable()">
                            <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                        </el-button>
                    </a>
                    <div class="itemList">
                        <li v-for="item in optionsActivo" :key="item.id" :style="styledoc">
                            <el-button v-if="item.value === 1" type="" text="plain" size="small"
                                @click="setIdReactivacion(data.id), suspenderModal = true">
                                {{ item.text }}
                            </el-button>
                            <el-button v-if="item.value === 2" type="" text="plain" size="small"
                                @click="setId(data.clave), cancelarModal = true">
                                {{ item.text }}
                            </el-button>
                        </li>
                        <li :style="styledoc">
                            <el-button type="" text="plain" size="small"
                                @click="historicoModal = true, historicoEstatus(data.clave)">
                                Historico
                            </el-button>
                        </li>
                    </div>
                </ul>
            </div>
            <div class="menuDesplegable" v-if="data.estatus.id === 2">
                <ul><a>
                        <el-button size="small" type="danger" @click="classMenuDespegable()">
                            <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                        </el-button>
                    </a>
                    <div class="itemList">
                        <li v-for="item in optionsCancelado" :key="item.id" :style="styledoc">
                            <el-button v-if="item.value === 1" type="" text="plain" size="small"
                                @click="setIdReactivacion(data.id), suspenderModal = true">
                                {{ item.text }}
                            </el-button>
                            <el-button v-if="item.value === 3" type="" text="plain" size="small"
                                @click="setId(data.clave), reactivarModal = true">
                                {{ item.text }}
                            </el-button>
                        </li>
                        <li :style="styledoc">
                            <el-button type="" text="plain" size="small"
                                @click="historicoModal = true, historicoEstatus(data.clave)">
                                Historico
                            </el-button>
                        </li>
                    </div>
                </ul>
            </div>
            <div class="menuDesplegable" v-if="data.estatus.id === 3">
                <ul><a>
                        <el-button size="small" style="background: #FFFF33" class="btn btn-sm"
                            @click="classMenuDespegable()">
                            <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                        </el-button>
                    </a>
                    <div class="itemList">
                        <li v-for="item in optionsSuspendido" :key="item.id" :style="styledoc">
                            <el-button v-if="item.value === 4" type="" text="plain" size="small"
                                @click="setId(data.clave), reanudarModal = true">
                                {{ item.text }}
                            </el-button>
                            <el-button v-if="item.value === 2" type="" text="plain" size="small"
                                @click="setId(data.clave), cancelarModal = true">
                                {{ item.text }}
                            </el-button>
                        </li>
                        <li :style="styledoc">
                            <el-button type="" text="plain" size="small"
                                @click="historicoModal = true, historicoEstatus(data.clave)">
                                Historico
                            </el-button>
                        </li>
                    </div>
                </ul>
            </div>
            <div class="menuDesplegable" v-if="data.estatus.id === 4">
                <ul><a>
                        <el-button size="small"
                            style="background: linear-gradient(90deg, rgba(0,255,34,1) 0%, rgba(232,15,15,1) 100%);"
                            @click="classMenuDespegable()">
                            <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                        </el-button>
                    </a>
                    <div class="itemList">
                        <li v-for="item in optionsActivo" :key="item.id" :style="styledoc">
                            <el-button v-if="item.value === 1" type="" text="plain" size="small"
                                @click="setIdReactivacion(data.id), suspenderModal = true">
                                {{ item.text }}
                            </el-button>
                            <el-button v-if="item.value === 2" type="" text="plain" size="small"
                                @click="setId(data.clave), cancelarModal = true">
                                {{ item.text }}
                            </el-button>
                        </li>
                        <li :style="styledoc">
                            <el-button type="" text="plain" size="small"
                                @click="historicoModal = true, historicoEstatus(data.clave)">
                                Historico
                            </el-button>
                        </li>
                    </div>
                </ul>
            </div>
            <div class="menuDesplegable" v-if="data.estatus.id === 5">
                <ul><a>
                        <el-button size="small"
                            style="background: linear-gradient(90deg, rgba(0,255,34,1) 0%, rgba(216,239,25,1) 48%, rgba(232,222,15,1) 100%);"
                            @click="classMenuDespegable()">
                            <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                        </el-button>
                    </a>
                    <div class="itemList">
                        <li v-for="item in optionsReactivado" :key="item.id" :style="styledoc">
                            <el-button v-if="item.value === 1" type="" text="plain" size="small"
                                @click="setIdReactivacion(data.id), suspenderModal = true">
                                {{ item.text }}
                            </el-button>
                            <el-button v-if="item.value === 2" type="" text="plain" size="small"
                                @click="setId(data.clave), cancelarModal = true">
                                {{ item.text }}
                            </el-button>
                        </li>
                        <li :style="styledoc">
                            <el-button type="" text="plain" size="small"
                                @click="historicoModal = true, historicoEstatus(data.clave)">
                                Historico
                            </el-button>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
        <ModalSCT v-if="cancelarModal">
            <h3 slot="header">Cancelación de Obra {{ data.clave }}</h3>
            <div slot="body">
                <p>Escriba el motivo de cancelación</p>
                <div class="form-group">
                    <textarea rows="3" maxlength="350" id="motivoCancelacion" class="form-control" value=""
                        placeholder="Ingrese el motivo de la cancelación"
                        v-model="formCancelacion.motivoCancelacion"></textarea>
                    <small v-if="!$v.formCancelacion.motivoCancelacion.required" class="form-text form-text-error">
                        Este campo es obligatorio
                    </small>
                </div>
                <div class="form-group">
                    <label class="control-label" for="file-01">Cargar archivo:</label>
                    <input id="file-motivo" type="file" @change="onFileCancelar" accept=".pdf">
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-danger" @click="cancelarModal = false">
                    Cerrar
                </button>
                <button class="btn btn-primary active" @click="cancelarModal = false, cancelarCamino(data)">
                    Aceptar
                </button>
            </div>
        </ModalSCT>

        <ModalSCT v-if="suspenderModal">
            <h3 slot="header">Suspender Obra {{ data.clave }}</h3>
            <div slot="body">
                <div class="modal-body text-left">
                    <p>Escriba la justificación de suspencion:</p>
                    <div class="form-group">
                        <textarea rows="3" maxlength="350" id="motivoReactivacion" class="form-control" value=""
                            placeholder="Justificación de suspencion" v-model="formSuspencion.motivoSuspencion"></textarea>
                        <small v-if="!$v.formSuspencion.motivoSuspencion.required" class="form-text form-text-error">
                            Este campo es obligatorio
                        </small>
                    </div>
                    <div class="form-group text-left">
                        <label class="control-label" for="reactivacion">Cargar archivo:</label>
                        <input id="reactivacion" type="file" @change="onFileSuspender" accept=".pdf">
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-danger" @click="suspenderModal = false">
                    Cerrar
                </button>
                <button class="btn btn-primary active" @click="suspenderModal = false, suspenderCamino(data)">
                    Aceptar
                </button>
            </div>
        </ModalSCT>

        <ModalSCT v-if="reactivarModal">
            <h3 slot="header">Reactivar Obra {{ data.clave }}</h3>
            <div slot="body">
                <div class="form-group">
                    <textarea rows="3" maxlength="350" id="motivoReactivacion" class="form-control" value=""
                        placeholder="Justificación de reactivación" v-model="formReactivar.motivoReactivacion"></textarea>
                    <small v-if="!$v.formReactivar.motivoReactivacion.required" class="form-text form-text-error">
                        Este campo es obligatorio
                    </small>
                </div>
                <div class="form-group text-left">
                    <label class="control-label" for="reactivacion">Cargar archivo:</label>
                    <input id="reactivacion" type="file" @change="onFileReactivacion" accept=".pdf">
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-danger" @click="reactivarModal = false">
                    Cerrar
                </button>
                <button class="btn btn-primary active" @click="reactivarModal = false, reactivarCamino(data)">
                    Aceptar
                </button>
            </div>
        </ModalSCT>

        <ModalSCT v-if="reanudarModal">
            <h3 slot="header">Reanudar de Obra {{ data.clave }}</h3>
            <div slot="body">
                <p>Escriba el motivo de reanudacion</p>
                <div class="form-group">
                    <textarea rows="3" maxlength="350" id="motivoCancelacion" class="form-control" value=""
                        placeholder="Ingrese el motivo de la cancelación"
                        v-model="formReanudar.motivoReanudacion"></textarea>
                    <small v-if="!$v.formReanudar.motivoReanudacion.required" class="form-text form-text-error">
                        Este campo es obligatorio
                    </small>
                </div>
                <div class="form-group">
                    <label class="control-label" for="file-01">Cargar archivo:</label>
                    <input id="file-motivo" type="file" @change="onFileReanudar" accept=".pdf">
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-danger" @click="reanudarModal = false">
                    Cerrar
                </button>
                <button class="btn btn-primary active" @click="reanudarModal = false, reanudarCamino(data)">
                    Aceptar
                </button>
            </div>
        </ModalSCT>

        <ModalSCT v-if="historicoModal">
            <h3 slot="header">Historico de {{ data.clave }} </h3>
            <span slot="body">
                <div>
                    <el-table :data="tableData" style="width: 100%;">
                        <el-table-column prop="timestamp" label="Fecha" width="180" />
                        <el-table-column prop="estatus_descripcion" label="Estatus" width="180" />
                        <el-table-column prop="justificacion" label="Motivo" />
                    </el-table>
                </div>
            </span>
            <div slot="footer">
                <button class="btn btn-danger" @click="historicoModal = false">
                    Cerrar
                </button>
                <button class="btn btn-primary active" @click="historicoModal = false">
                    Aceptar
                </button>
            </div>
        </ModalSCT>

    </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { Loading } from 'element-ui';
import { required } from 'vuelidate/lib/validators'
import { getHistorialEstatus, cambioEstatus } from '@/api/obras'
import ModalSCT from "@/components/Modals/SCTModal.vue";

Vue.use(Vuelidate)

export default {
    components: { ModalSCT },
    name: 'CancelaObra',
    data() {
        return {
            valueItem: '',
            idReactivacion: null,
            motivoCancelacion: '',
            motivoReanudacion: '',
            id: null,
            actionButonMenu: false,
            historicoModal: false,
            cancelarModal: false,
            suspenderModal: false,
            reactivarModal: false,
            reanudarModal: false,
            styledoc: '',
            data: {
                data: {
                }
            },
            formReactivar: {
                motivoReactivacion: null,
                file: null
            },
            formReanudar: {
                motivoReanudacion: null,
                file: null
            },
            formSuspencion: {
                motivoSuspencion: null,
                file: null
            },
            formCancelacion: {
                motivoCancelacion: null,
                file: null
            },
            optionsActivo: [
                { value: 1, text: 'Suspender' },
                { value: 2, text: 'Cancelar' }
            ],
            optionsReanudado: [
                { value: 1, text: 'Suspender' },
                { value: 2, text: 'Cancelar' }
            ],
            optionsReactivado: [
                { value: 1, text: 'Suspender' },
                { value: 2, text: 'Cancelar' }
            ],
            optionsCancelado: [
                { value: 1, text: 'Suspender' },
                { value: 3, text: 'Reactivar' }
            ],
            optionsSuspendido: [
                { value: 4, text: 'Reanudar' },
                { value: 2, text: 'Cancelar' }
            ],
            tableData: []
        };
    },
    validations: {
        formReactivar: {
            motivoReactivacion: {
                required
            }
        },
        formCancelacion: {
            motivoCancelacion: {
                required
            }
        },
        formReanudar: {
            motivoReanudar: {
                required
            }
        },
        formSuspencion: {
            motivoSuspencion: {
                required
            }
        }
    },
    methods: {
        classMenuDespegable() {
            if (this.actionButonMenu === false) {
                this.styledoc = ' display: block;'
                this.actionButonMenu = true
            } else {
                this.styledoc = ' display: none;'
                this.actionButonMenu = false
            }
        },
        async suspenderCamino(data) {
            let formData = new FormData();
            formData.append("id_camino", data.id);
            formData.append("id_estatus", 3);
            formData.append("justificacion", this.formSuspencion.motivoSuspencion);
            formData.append("archivo", this.formSuspencion.file);
            console.log('dataEndpoint suspender: ', data.clave, formData)
            await cambioEstatus(data.clave, formData)
        },
        async cancelarCamino(data) {
            let formData = new FormData();
            formData.append("id_camino", data.id);
            formData.append("id_estatus", 2);
            formData.append("justificacion", this.formCancelacion.motivoCancelacion);
            formData.append("archivo", this.formCancelacion.file);
            console.log('dataEndpoint suspender: ', data.clave, formData)
            await cambioEstatus(data.clave, formData)
        },
        async reactivarCamino(data) {
            let formData = new FormData();
            formData.append("id_camino", data.id);
            formData.append("id_estatus", 5);
            formData.append("justificacion", this.formReactivar.motivoReactivacion);
            formData.append("archivo", this.formReactivar.file);
            console.log('dataEndpoint suspender: ', data.clave, formData)
            await cambioEstatus(data.clave, formData)
        },
        async historicoEstatus(data) {
            console.log('data:', data)
            this.tableData = await getHistorialEstatus(data)
            console.log('tableData: ', this.tableData)
        },
        async reanudarCamino(data) {
            let formData = new FormData();
            formData.append("id_camino", data.id);
            formData.append("id_estatus", 4);
            formData.append("justificacion", this.formReanudar.motivoReanudacion);
            formData.append("archivo", this.formReanudar.file);
            console.log('dataEndpoint suspender: ', data.clave, formData)
            await cambioEstatus(data.clave, formData)
        },
        setId(clave) {
            this.$store.commit('setIdCancelacion', clave)
        },
        setIdReactivacion(clave) {
            this.formReactivar.motivoReactivacion = null,
                this.formReactivar.file = null
            this.$store.commit('setIdReactivacion', clave)
        },
        onFileCancelar(event) {
            this.formCancelacion.file = event.target.files[0];
        },
        onFileReactivacion(event) {
            this.formReactivar.file = event.target.files[0];
        },
        onFileSuspender(event) {
            this.formSuspencion.file = event.target.files[0];
        },
        onFileReanudar(event) {
            this.formReanudar.file = event.target.files[0];
        },
    },

}
</script>

<style scoped>
ul,
ol {
    list-style: none;
    padding: 10%;
}

.menuDesplegable ul a {
    color: black;
    text-decoration: none;
}

.menuDesplegable ul a:hover {
    background-color: darkgrey;
}

.menuDesplegable ul li:hover {
    background-color: darkgrey;
}

.menuDesplegable ul .itemList li {
    display: none;
    position: flex;
    background-color: #f0f0f0;
    z-index: 10;
    padding: 0;
    margin: 0;
}

/* .menuDesplegable ul:hover .itemList > li {
    display: block;
    z-index: 10;

}*/


.itemList {
    position: absolute;
    z-index: 1000;
}

.menuDesplegable>li {
    float: left;

}
</style>
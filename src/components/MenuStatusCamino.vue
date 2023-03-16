<template>
    <div>
        <div>
            <div class="menuDesplegable" v-if="data.estatus.id === 1">
                <ul><a>
                        <el-button size="small" type="success"  @click="classMenuDespegable()">
                            <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                        </el-button>
                    </a>
                    <div class="itemList">
                        <li v-for="item in optionsActivo" :key="item.id" :style="styledoc">
                            <!-- <el-button v-if="item.value === 1" type="" text="plain" size="small" aria-label="Editar datos"
                                data-toggle="modal" data-target="#mdlSuspenderObra" @click="setIdReactivacion(data.id)">
                                {{ item.text }}
                            </el-button> -->
                            <el-button v-if="item.value === 1" type="" text="plain" size="small"
                                @click="setIdReactivacion(data.id), suspenderModal = true">
                                {{ item.text }}
                            </el-button>
                            <!--  <el-button v-if="item.value === 2" type="" text="plain" size="small" aria-label="Editar datos"
                                data-toggle="modal" data-target="#mdlCancelarObra" @click="setId(data.clave)">
                                {{ item.text }}
                            </el-button> -->
                            <el-button v-if="item.value === 2" type="" text="plain" size="small"
                                @click="setId(data.clave), cancelarModal = true">
                                {{ item.text }}
                            </el-button>
                        </li>
                        <li :style="styledoc">
                            <el-button type="" text="plain" size="small" @click="historicoModal = true" >
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
                            <!-- <el-button v-if="item.value === 3" type="" text="plain" size="small" aria-label="Editar datos"
                                data-toggle="modal" data-target="#mdlReactivarObra" @click="setId(data.clave)">
                                {{ item.text }}
                            </el-button> -->
                            <el-button v-if="item.value === 3" type="" text="plain" size="small"
                                @click="setId(data.clave), reactivarModal = true">
                                {{ item.text }}
                            </el-button>
                        </li>
                        <li :style="styledoc">
                            <el-button type="" text="plain" size="small" @click="historicoModal = true">
                                Historico
                            </el-button>
                        </li>
                    </div>
                </ul>
            </div>
            <div class="menuDesplegable" v-if="data.estatus.id === 3">
                <ul><a>
                        <el-button size="small" type="warning" class="btn btn-sm" @click="classMenuDespegable()">
                            <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                        </el-button >
                    </a>
                    <div class="itemList">
                        <li v-for="item in optionsSuspendido" :key="item.id" :style="styledoc">
                            <!-- <el-button v-if="item.value === 5" type="" text="plain" size="small" aria-label="Editar datos"
                                data-toggle="modal" data-target="#mdlSuspenderObra" @click="setIdReactivacion(data.id)">
                                {{ item.text }}
                            </el-button> -->
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
                            <el-button type="" text="plain" size="small" aria-label="Menu" data-toggle="modal"
                                data-target="#mdlHistorico">
                                Historico
                            </el-button>
                        </li>
                    </div>
                </ul>
            </div>
            <div class="menuDesplegable" v-if="data.estatus.id === 4">
                <ul><a>
                        <el-button size="small" style="background: linear-gradient(90deg, rgba(0,255,34,1) 0%, rgba(232,15,15,1) 100%);" @click="classMenuDespegable()">
                            <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                        </el-button>
                    </a>
                    <div class="itemList">
                        <li v-for="item in optionsActivo" :key="item.id" :style="styledoc">
                            <!-- <el-button v-if="item.value === 1" type="" text="plain" size="small" aria-label="Editar datos"
                                data-toggle="modal" data-target="#mdlSuspenderObra" @click="setIdReactivacion(data.id)">
                                {{ item.text }}
                            </el-button> -->
                            <el-button v-if="item.value === 1" type="" text="plain" size="small"
                                @click="setIdReactivacion(data.id), suspenderModal = true">
                                {{ item.text }}
                            </el-button>
                            <!--  <el-button v-if="item.value === 2" type="" text="plain" size="small" aria-label="Editar datos"
                                data-toggle="modal" data-target="#mdlCancelarObra" @click="setId(data.clave)">
                                {{ item.text }}
                            </el-button> -->
                            <el-button v-if="item.value === 2" type="" text="plain" size="small"
                                @click="setId(data.clave), cancelarModal = true">
                                {{ item.text }}
                            </el-button>
                        </li>
                        <li :style="styledoc">
                            <el-button type="" text="plain" size="small" @click="historicoModal = true">
                                Historico
                            </el-button>
                        </li>
                    </div>
                </ul>
            </div>
            <div class="menuDesplegable" v-if="data.estatus.id === 5">
                <ul><a>
                        <el-button size="small" style="background: linear-gradient(90deg, rgba(0,255,34,1) 0%, rgba(216,239,25,1) 48%, rgba(232,222,15,1) 100%);" @click="classMenuDespegable()">
                            <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
                        </el-button>
                    </a>
                    <div class="itemList">
                        <li v-for="item in optionsReactivado" :key="item.id" :style="styledoc">
                            <!-- <el-button v-if="item.value === 1" type="" text="plain" size="small" aria-label="Editar datos"
                                data-toggle="modal" data-target="#mdlSuspenderObra" @click="setIdReactivacion(data.id)">
                                {{ item.text }}
                            </el-button> -->
                            <el-button v-if="item.value === 1" type="" text="plain" size="small"
                                @click="setIdReactivacion(data.id), suspenderModal = true">
                                {{ item.text }}
                            </el-button>
                            <!--  <el-button v-if="item.value === 2" type="" text="plain" size="small" aria-label="Editar datos"
                                data-toggle="modal" data-target="#mdlCancelarObra" @click="setId(data.clave)">
                                {{ item.text }}
                            </el-button> -->
                            <el-button v-if="item.value === 2" type="" text="plain" size="small"
                                @click="setId(data.clave), cancelarModal = true">
                                {{ item.text }}
                            </el-button>
                        </li>
                        <li :style="styledoc">
                            <el-button type="" text="plain" size="small" @click="historicoModal = true">
                                Historico
                            </el-button>
                        </li>
                    </div>
                </ul>
            </div>
        </div>

        <!--CANCELAR-->
        <!-- <div class="modal fade" ref="mdlCancelarObra" id="mdlCancelarObra" tabindex="-1" role="dialog"
            aria-labelledby="mdlCancelarObra" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Cancelación de Obra</h4>
                    </div>
                    <div class="modal-body">
                        <p>Escriba el motivo de cancelación</p>
                        <div class="form-group">
                            <textarea rows="3" maxlength="350" id="motivoCancelacion" class="form-control" value=""
                                placeholder="Ingrese el motivo de la cancelación" v-model="motivoCancelacion"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="file-01">Cargar archivo:</label>
                            <input id="file-motivo" type="file" @change="onFileSelected" accept=".pdf">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="cerrarCnclObra" class="btn btn-default"
                            data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="CancelarObra(data.clave)">Guardar</button>
                    </div>
                </div>
            </div>
        </div> -->

        <!--SUSPENDER-->
        <!-- <div class="modal fade" ref="mdlSuspenderObra" id="mdlSuspenderObra" tabindex="-1" role="dialog"
            aria-labelledby="mdlSuspenderObra" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Suspender Obra</h4>
                    </div>
                    <div class="modal-body text-left">
                        <p>Escriba la justificación de suspencion:</p>
                        <div class="form-group">
                            <textarea rows="3" maxlength="350" id="motivoReactivacion" class="form-control" value=""
                                placeholder="Justificación de suspencion"
                                v-model="formSuspencion.motivoSuspencion"></textarea>
                            <small v-if="!$v.formSuspencion.motivoSuspencion.required" class="form-text form-text-error">
                                Este campo es obligatorio
                            </small>
                        </div>
                        <div class="form-group text-left">
                            <label class="control-label" for="reactivacion">Cargar archivo:</label>
                            <input id="reactivacion" type="file" @change="onFileReactivacion" accept=".pdf">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="cerrarCnclObra" class="btn btn-default"
                            data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="reactivar(data)"
                            id="btn-sbmt-reactivar">Guardar</button>
                    </div>
                </div>
            </div>
        </div> -->

        <!--REACTIVAR-->
        <!-- <div class="modal fade" ref="mdlReactivarObra" id="mdlReactivarObra" tabindex="-1" role="dialog"
            aria-labelledby="mdlReactivarObra" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Reactivar Obra</h4>
                    </div>
                    <div class="modal-body text-left">
                        <p>Escriba la justificación de reactivación:</p>
                        <div class="form-group">
                            <textarea rows="3" maxlength="350" id="motivoReactivacion" class="form-control" value=""
                                placeholder="Justificación de reactivación"
                                v-model="formReactivar.motivoReactivacion"></textarea>
                            <small v-if="!$v.formReactivar.motivoReactivacion.required" class="form-text form-text-error">
                                Este campo es obligatorio
                            </small>
                        </div>
                        <div class="form-group text-left">
                            <label class="control-label" for="reactivacion">Cargar archivo:</label>
                            <input id="reactivacion" type="file" @change="onFileReactivacion" accept=".pdf">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="cerrarCnclObra" class="btn btn-default"
                            data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="reactivar(data)"
                            id="btn-sbmt-reactivar">Guardar</button>
                    </div>
                </div>
            </div>
        </div> -->

        <ModalSCT v-if="cancelarModal">
            <h3 slot="header">Cancelación de Obra {{ data.clave }}</h3>
            <div slot="body">
                <p>Escriba el motivo de cancelación</p>
                <div class="form-group">
                    <textarea rows="3" maxlength="350" id="motivoCancelacion" class="form-control" value=""
                        placeholder="Ingrese el motivo de la cancelación" v-model="motivoCancelacion"></textarea>
                </div>
                <div class="form-group">
                    <label class="control-label" for="file-01">Cargar archivo:</label>
                    <input id="file-motivo" type="file" @change="onFileSelected" accept=".pdf">
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-danger" @click="cancelarModal = false">
                    Cerrar
                </button>
                <button class="btn btn-primary active" @click="cancelarModal = false, CancelarObra(data.clave)">
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
                        <input id="reactivacion" type="file" @change="onFileReactivacion" accept=".pdf">
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-danger" @click="suspenderModal = false">
                    Cerrar
                </button>
                <button class="btn btn-primary active" @click="suspenderModal = false">
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
                <button class="btn btn-primary active" @click="reactivarModal = false, reactivar(data)">
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
                        placeholder="Ingrese el motivo de la cancelación" v-model="motivoReanudacion"></textarea>
                </div>
                <div class="form-group">
                    <label class="control-label" for="file-01">Cargar archivo:</label>
                    <input id="file-motivo" type="file" @change="onFileSelected" accept=".pdf">
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-danger" @click="reanudarModal = false">
                    Cerrar
                </button>
                <button class="btn btn-primary active" @click="reanudarModal = false">
                    Aceptar
                </button>
            </div>
        </ModalSCT>

        <ModalSCT v-if="historicoModal">
            <h3 slot="header">Historico</h3>
            <span slot="body">
                <div>
                    <el-table :data="tableData" style="width: 100%;">
                        <el-table-column prop="date" label="Fecha" width="180" />
                        <el-table-column prop="name" label="Estatus" width="180" />
                        <el-table-column prop="address" label="Motivo"  />
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
import { cancelarObra, reactivarObra } from '@/api/obras'
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
            formSuspencion: {
                motivoSuspencion: null,
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
            tableData: [
                {
                    date: '2016-05-03',
                    name: 'Cancelado',
                    address: 'Razon o motivo 1',
                },
                {
                    date: '2016-05-02',
                    name: 'Reactivado',
                    address: 'Razon o motivo 1',
                },
                {
                    date: '2016-05-04',
                    name: 'Suspendido',
                    address: 'Razon o motivo 1',
                },
                {
                    date: '2016-05-01',
                    name: 'Reactivado',
                    address: 'Razon o motivo 1',
                },
            ]
        };
    },
    validations: {
        formReactivar: {
            motivoReactivacion: {
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
        async CancelarObra(myId) {
            $(this.$refs['mdlCancelarObra']).modal('hide')
            let formData = new FormData();
            formData.append("motivoCancelacion", this.motivoCancelacion);
            if (this.file) {
                formData.append("archivo", this.file);
            }
            await cancelarObra(this.$store.state.cancel.id, formData).then(_ => {
                this.$parent.$parent.populate()
                this.$alert('La Obra se ha Cancelado', '', {
                    confirmButtonText: 'Cerrar',
                    callback: action => {
                    }
                });
            })


        },
        async reactivar(data) {
            if (!this.$v.formReactivar.$invalid) {
                let loadingInstance = Loading.service({ fullscreen: true, lock: true });
                let formData = new FormData();
                formData.append("justificacion", this.formReactivar.motivoReactivacion);
                formData.append("direccion", 'reactivar');
                formData.append("obra", this.$store.state.reactivar.id);
                if (this.formReactivar.file) {
                    formData.append("archivo", this.formReactivar.file);
                }
                await reactivarObra(formData)
                    .then(_ => {
                        $(this.$refs['mdlSuspenderObra']).modal('hide')
                        this.$parent.$parent.populate()
                        this.$alert('La Obra se ha Reactivado', '', {
                            confirmButtonText: 'Cerrar',
                            callback: action => {
                            }
                        });
                    }).finally(_ => {
                        loadingInstance.close();
                    })
            }
        },
        setId(clave) {
            this.$store.commit('setIdCancelacion', clave)
        },
        setIdReactivacion(clave) {
            this.formReactivar.motivoReactivacion = null,
                this.formReactivar.file = null
            this.$store.commit('setIdReactivacion', clave)
        },
        onFileSelected(event) {
            this.file = event.target.files[0];
        },
        onFileReactivacion(event) {
            this.formReactivar.file = event.target.files[0];
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
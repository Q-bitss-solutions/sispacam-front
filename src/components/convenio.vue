<template>
  <div>
    <div class="col-md-12 mx-auto">
      <div class="row">
        <h3>Programación de Obra </h3>
        <hr class="red">
        <form role="form">
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-left to-left">
        <button :disabled="cons" type="button" id="bt-nvo-convenio" v-on:click="openModalAddConvenio"
          class="btn btn-default pull-right" data-toggle="modal">
          Nuevo Convenio
        </button>
      </div>
      <div>
      </div>
      <div class="col-md-12">
        <h5 class="small-top-buffer small-bottom-buffer">Programación de Obras agregadas</h5>
      </div>
    </div>

    <div>
      <p v-for="convenio in convenios" :key="convenio.id">{{ convenio.tramo }}</p>
    </div>

    <div class="row">
      <div class="col-md-12 table-responsive">
        <ejs-treegrid :dataSource="convenios" childMapping="modificatorio" :treeColumnIndex="1" ref="gridConvenios"
          :allowResizing='true' :allowTextWrap='true'>
          <e-columns>
            <e-column field='id' headerText='id' :visible='false' textAlign='Center'></e-column>
            <e-column :template="editTemplate" headerText='Editar' width=110></e-column>
            <e-column :template="deleteTemplate" headerText='Eliminar <br> Tramo' :disableHtmlEncode='false'
              width=140></e-column>
            <e-column field='anio' headerText='Año <br> del Convenio' :disableHtmlEncode='false' textAlign='Center'
              width=160></e-column>
            <e-column :template="tramoTemplate" field='tramo' headerText='Tramo' textAlign='Center'
              width='90'></e-column>
            <e-column :template="montoTemplate" field='monto' headerText='Monto(mdp)' textAlign='right'
              width=90></e-column>
            <e-column :template="origenTemplate" field='origen' headerText='Origen  <br> del recurso'
              :disableHtmlEncode='false' textAlign='Center' width=160></e-column>
            <e-column field='meta' headerText='Meta(km)' textAlign='right' width=80></e-column>
            <e-column :template="modificatorioTemplate" headerText='Tiene Convenio <br> Modificatorio'
              :disableHtmlEncode='false' textAlign='Center' width=160></e-column>
            <e-column :template="fileTemplate" headerText='Archivo' textAlign='Center' width=100></e-column>
            <e-column :template="budgetTemplate" headerText='Presupuesto' width=130> </e-column>
          </e-columns>
          <e-aggregates>
            <e-aggregate :showChildSummary='false'>
              <e-columns>
                <e-column type="Sum" field="anio" :footerTemplate='footerTotal'></e-column>
                <e-column type="Custom" columnName="monto" :customAggregate="customAggregateMontoFn"
                  :footerTemplate='footerMonto'></e-column>
                <e-column type="Custom" :customAggregate="customAggregateMetaFn" field="meta"
                  :footerTemplate='footerMeta'></e-column>
              </e-columns>
            </e-aggregate>
          </e-aggregates>
        </ejs-treegrid>
      </div>
    </div>

    <!--Convenio Nuevo & Edit--->
    <Modal :title="modalTitle" modal-class="modal2" wrapper-class="modal-wrapper" v-model="showAdminModalConvenio"
      @before-open="beforeOpen" @before-close="beforeClose">
      <form class="scrollable-content">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="anio">Año del Convenio:</label>
            <select :disabled="isDisabled" v-model="form.anio" id="anio" class="form-control"
              :class="!$v.form.anio.required ? 'form-control-error' : ''">
              <option value="">Seleccionar...</option>
              <option v-for="(item, index) in anios" :key="index" :value='item.anio'>{{ item.anio }}</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="tramo">Tramo:</label>
            <input autocomplete="off" id="tramo" :disabled="isDisabled" v-model="form.tramo" type="text"
              placeholder="Ingresar el tramo" class="form-control" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="monto">Monto(mdp):</label>
            <input id="monto" autocomplete="off" v-model="form.monto" type="number" :disabled="isDisabled"
              placeholder="Ingresar el monto(mdp)" class="form-control "
              :class="!$v.form.monto.maxValue ? 'form-control-error' : ''" />
          </div>
          <div class="form-group col-md-6">
            <label for="meta">Meta:</label>
            <input autocomplete="off" class="form-control convenio" v-model="form.meta" id="meta" type="number"
              :disabled="isDisabled" placeholder="Ingrese la Meta(km)"
              :class="!$v.form.meta.required ? 'form-control-error' : ''" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="tramo">Origen del recurso:</label>
            <select :disabled="isDisabled" v-model="form.origen" id="origen" class="form-control">
              <option value=''>Seleccionar...</option>
              <option value='PEF'>PEF</option>
              <option value='INDEP'>INDEP</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label class="control-label">Convenio (PDF):</label>
            <input class="form-control" :disabled="isDisabled" type="file" accept=".pdf" @change="onFileSelected"
              name="myfile" id="f-convenio" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-5">
            <label class="control-label">Longitud a Pavimentar</label>
            <input type="number" :value="longitudP" class="form-control" disabled id="inpt-longitud">
          </div>
          <div class="form-group col-md-5">
            <label class="control-label">Longitud por programar</label>
            <input v-model="getSumMeta" type="number" class="form-control" disabled>
          </div>
        </div>
        <div>
          <div v-for="(error, index) in  convenioErrors" :key="index" class="col-md-12">
            <small style="color: red!important;" class="form-text form-text-error">
              {{ error.error }}
            </small>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-5">
            <button class="btn btn-default btn-sm active" type="button" id="btn-mdl-beneficiario"
              @click="openModalBeneficiario()" :disabled="(mode === 'delete')">
              Datos del Beneficiario
            </button>
          </div>
          <div class="form-group col-md-6">
            <button class="btn btn-default btn-sm active" type="button" id="btn-open-calendario"
              @click="openModalCalendarioObra()" :disabled="((mode === 'delete'))">
              Calendario de Obra
            </button>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12" v-if="mode == 'edit'
          && !form.es_modificatorio
          && form.modificatorio == 0
          && isNormativo">
            <button class="btn btn-default btn-sm" type="button" id="btn-modificatorio" @click="openModalModificatorio">
              Agregar convenio modificatorio
            </button>
          </div>
        </div>

        <div class="row modal-footer text-right">
          <div class="col-md-12 text-right">
            <button class="btn btn-primary" type="button" @click="closeModal">Cancelar</button>
            <button :disabled="btnIsDisabled" v-if="mode === 'new'" class="btn btn-default" id="btn-save-convenio"
              type="button" @click="saveEditConvenio(true)">Agregar Convenio
            </button>
            <button :disabled="btnIsDisabled" v-if="mode === 'edit'" class="btn btn-default" type="button"
              @click="saveEditConvenio(false)">Actualizar Convenio
            </button>
            <button :disabled="btnIsDisabled" v-if="mode === 'delete'" class="btn btn-default" type="button"
              @click="deleteConvenio">Eliminar Convenio
            </button>
          </div>
        </div>
      </form>
    </Modal>

    <!--modificatorio--->
    <Modal title="Convenio Modificatorio" modal-class="modal2 fullscreen-modal" wrapper-class="modal-wrapper"
      v-model="showAdminModalConvenioMod" in-class="animate__backInDown" bg-class="animate__animated"
      bg-in-class="animate__fadeInUp">
      <form>
        <div class="form-row">
          <div class="form-gruop com-md-12">
            <p>
              <small class="label" style="background-color: grey;">
                Al ingresar un nuevo convenio modificatorio, el convenio original estará en modo de consulta.
              </small>
            </p>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="anio">Año del Convenio:</label>
            <select :disabled="true" v-model="formMoficatorio.anio" id="anio" class="form-control modificatorio"
              :class="!$v.formMoficatorio.anio.required ? 'form-control-error' : ''">
              <option value="">Seleccionar...</option>
              <option v-for="(item, index) in anios" :key="index" :value='item.anio'>{{ item.anio }}</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="tramo">Tramo:</label>
            <input autocomplete="off" id="tramo" :disabled="isDisabledMod" v-model="formMoficatorio.tramo" type="text"
              placeholder="Ingresar el tramo" class="form-control modificatorio" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="monto">Monto(mdp):</label>
            <input autocomplete="off" id="monto" v-model="formMoficatorio.monto" type="number" :disabled="isDisabledMod"
              placeholder="Ingresar el monto(mdp)" class="form-control modificatorio"
              :class="!$v.formMoficatorio.monto.maxValue ? 'form-control-error' : ''" />
          </div>
          <div class="form-group col-md-6">
            <label for="meta">Meta:</label>
            <input autocomplete="off" class="form-control modificatorio" v-model="form.meta" id="metaMod" type="number"
              :disabled="isDisabledMod" placeholder="Ingrese la Meta(km)"
              :class="!$v.form.meta.required ? 'form-control-error' : ''" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="tramo">Origen del recurso:</label>
            <select :disabled="isDisabledMod" v-model="formMoficatorio.origen" id="tramo"
              class="form-control modificatorio">
              <option value=''>Seleccionar...</option>
              <option value='PEF'>PEF</option>
              <option value='INDEP'>INDEP</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label class="control-label">Convenio (PDF):</label>
            <input class="form-control modificatorio" :disabled="isDisabledMod" id="fileconvenio" type="file"
              accept=".pdf" @change="onFileSelectedModificatorio" name="myfile">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-5">
            <label class="control-label">Longitud a Pavimentar</label>
            <input type="number" :value="longitudP" class="form-control" disabled>
          </div>
          <div class="form-group col-md-5">
            <label class="control-label">Longitud por programar</label>
            <input type="number" v-model="getSumMeta" class="form-control" disabled>
          </div>
        </div>
        <div>
          <div v-for="(error, index) in  convenioModificatrioErrors" :key="index" class="col-md-12">
            <small style="color: red!important;" class="form-text form-text-error">
              {{ error.error }}
            </small>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <button class="btn btn-default btn-sm modificatorio" type="button"
              @click="openModalBeneficiario(), btnIsDisabled = false" :disabled="(mode === 'delete')">
              Beneficiario
            </button>
          </div>
          <div class="form-group col-md-6">
            <button class="btn btn-default btn-sm modificatorio" type="button"
              @click="openModalCalendarioObra(); btnIsDisabled = false" :disabled="((mode === 'delete'))">
              Calendario de Obra
            </button>
          </div>
        </div>
        <div class="row modal-footer">
          <div class="col-md-12">
            <div class="float-right">
              <button class="btn btn-primary" type="button" @click="closeModalModificatorio">
                Cancelar
              </button>
              <button class="btn btn-default" type="button" id="saveCnvModificatorio" @click="confirmSaveModificatorio">
                Agregar convenio modificatorio
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
    <!--Modal Beneficiario-->
    <ModalBeneficiario ref="modalBeneficiario" :isReadOnly="btnIsDisabled" :beneficiario_id="beneficiario_id" />
    <!--Modal Calendario de Obra-->
    <Modal title="Calendario de Obra" modal-class="scrollable-modal" wrapper-class="animate__animated"
      v-model="showModalCalendarioObra" in-class="animate__backInDown" bg-in-class="animate__fadeInUp">
      <div class="scrollable-content">
        <table class="table table-responsive">
          <thead>
            <th>
              Mes
            </th>
            <th>
              Avance(Km)
            </th>
          </thead>
          <tbody>
            <tr v-for="(mes, key) in mesesMetas" :key="key">
              <td>{{ mes.descripcion }}</td>
              <td>
                <vue-numeric v-bind:precision="2" separator="," class="form-control avance-mes"
                  v-model="mesesMetas[key].avance" :read-only="btnIsDisabled">
                </vue-numeric>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td><strong>Total</strong> </td>
              <td>
                <vue-numeric v-bind:precision="2" separator="," class="form-control" :value="getTotalAvanceMeta"
                  :read-only="true">
                </vue-numeric>
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="row modal-footer text-right">
          <div class="col-md-12 text-right">
            <button class="btn btn-primary" type="button" @click="closeModalCalMeta">Cancelar</button>
            <button class="btn btn-default" :disabled="btnIsDisabled" type="button" id="btn-save-avance-meses"
              @click="saveCalendarioMeta">Aceptar</button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
  
<script>
import Vue from 'vue';
import Vuelidate from 'vuelidate'
import { Loading } from 'element-ui';
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import ModalBeneficiario from './Modals/Beneficiario.vue'
import EventBus from '../utils/EventBus.js';
import bodyScroll from 'body-scroll-freezer'
import { GridPlugin } from '@syncfusion/ej2-vue-grids';
import { CustomSummaryType } from '@syncfusion/ej2-grids';
import { required, maxValue, } from 'vuelidate/lib/validators'
import { NumericTextBoxPlugin } from '@syncfusion/ej2-vue-inputs';
import { TreeGridPlugin, Page, Aggregate, Resize } from '@syncfusion/ej2-vue-treegrid';
import { generarConvenio, updateConvenio, createModificatorio, bajaConvenio, getAvanceConvenio, getConveniosGet, getCatMeses } from '@/api/convenio';
import VueNumeric from 'vue-numeric'

Vue.use(VueNumeric)
Vue.use(Vuelidate)
Vue.use(GridPlugin);
Vue.use(TreeGridPlugin);
Vue.use(NumericTextBoxPlugin);

export default {
  name: 'DatosConvenio',
  props: {
    camino_id: {
      type: Number
    },
    isObraCanceled: {
      required: true,
      default: false
    },
    longitud_pavimentar: {
      type: Number,
      required: true,
    }
  },
  components: {
    'Modal': VueModal,
    ModalBeneficiario
  },
  data() {
    return {
      form: {
        id: -1,
        anio: '',
        tramo: '',
        monto: '',
        origen: '',
        meta: '',
        archivo: null,
        modificatorio: 0,
        padre: null,
        es_modificatorio: false,
      },
      formMoficatorio: {
        anio: '',
        tramo: '',
        monto: '',
        origen: '',
        padre: 0,
        meta: '',
        archivo: null,
        modificatorio: 0,
        es_modificatorio: false,
      },
      mode: '',
      cons: false,
      isNormativo: false,
      anios: [],
      estatus: '',
      sumMeta: 0,
      modalTitle: '',
      max: 999999,
      flag: false,
      lines: 'Both',
      sumMesAvance: 0,
      dataAvance: [],
      mesesMetas: [],
      convenios: [
        {
          "id": 6,
          "anio": 2024,
          "tramo": "Tramo 1",
          "monto": "20",
          "origen": "PEF",
          "meta": "10.000",
          "estatus": "A",
          "modificatorio": null,
          "padre": 0,
          "beneficiario_id": 0,
          "nobre_presidente_municipal": null,
          "primera_presidente_municipal": null,
          "segundoa_presidente_municipal": null
        },
        {
          "id": 7,
          "anio": 2024,
          "tramo": "Tramo 1",
          "monto": "1",
          "origen": "PEF",
          "meta": "1.000",
          "estatus": "A",
          "modificatorio": null,
          "padre": 0,
          "beneficiario_id": 0,
          "nobre_presidente_municipal": null,
          "primera_presidente_municipal": null,
          "segundoa_presidente_municipal": null
        }
      ],
      longitudP: '',
      aniosEdit: [],
      convenioErrors: [],
      isDisabled: false,
      isDisabledMod: false,
      flagEdicion: true,
      btnIsDisabled: false,
      beneficiario_id: 0,
      btnSaveDisabled: true,
      showAdminModalConvenio: false,
      showModalCalendarioObra: false,
      showAdminModalConvenioMod: false,
      convenioModificatrioErrors: [],
      pageSettings: { pageCount: 6, pageSize: 20 },

      // Parece que manda llamar un modal para editar el convenio
      editTemplate: function () {
        return {
          template: Vue.component("editTemplate", {
            template: `
                  <button
                    @click="toEdit"
                    class="btn btn-primary btn-sm edit-convenio"  
                    type="button" 
                    >
                    <span v-if="!getDisabled()" class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    <span v-if="getDisabled()" class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>                    
                  </button> 
              `,
            data: function () {
              return {
                isNormativo: false,
                data: {
                }
              };
            },
            methods: {
              toEdit() {
                this.$parent.$parent.modalTitle = 'Actualizar Datos del Convenio'
                this.$parent.$parent.mode = 'edit'
                this.$parent.$parent.form.id = this.data.id
                this.$parent.$parent.form.anio = this.data.anio
                this.$parent.$parent.form.tramo = this.data.tramo
                this.$parent.$parent.form.monto = this.data.monto
                this.$parent.$parent.form.origen = this.data.origen
                this.$parent.$parent.form.meta = this.data.meta
                this.$parent.$parent.form.archivo = this.data.archivo
                this.$parent.$parent.form.es_modificatorio = this.data.es_modificatorio
                // TODO: investigar que hace el modificatorio
                // this.$parent.$parent.form.modificatorio = (this.data.hasOwnProperty('modificatorio') ? this.data.modificatorio.length : 0)
                this.$parent.$parent.form.modificatorio = 0
                if (this.data.estatus === 'M' || this.data.archivo) {
                  this.$parent.$parent.isDisabled = true
                  this.$parent.$parent.btnIsDisabled = true

                }
                this.$parent.$parent.beneficiario_id = this.data.beneficiario_id
                this.$parent.$parent.loadMesAvence(false)
                this.$parent.$parent.showAdminModalConvenio = true
              },
              getDisabled() {
                if (this.isNormativo) {
                  if (this.data.hasOwnProperty('hasChildRecords')
                    && this.data.childRecords.length > 0) {
                    return true
                  }
                  return false
                } else {
                  return true
                }
              }
            },
            created() {
              this.isNormativo = this.$parent.$parent.isNormativo
            },
            computed: {
            }
          })
        };
      },
      deleteTemplate: function () {
        return {
          template: Vue.component("deleteTemplate", {
            template: `
              <div class="text-center">
                  <button
                    :disabled="getDisabled()"
                    @click="toDelete"
                    class="btn btn-primary btn-sm"  
                    type="button" 
                    >
                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                  </button> 
                </div>
              `,
            data: function () {
              return {
                isNormativo: false,
                data: {}
              };
            },
            methods: {
              toDelete() {
                let id = null
                if (this.data.hasOwnProperty('parentItem')) {
                  id = this.data.parentItem.id
                }
                EventBus.$emit("deleteConvenio", {
                  el: this.data,
                  parent: id
                })
              },
              getDisabled() {
                if (this.isNormativo) {
                  if (this.data.hasOwnProperty('hasChildRecords')
                    && this.data.childRecords.length > 0) {
                    return true
                  }
                  if (this.data.archivo) {
                    return true
                  }
                  return false
                } else {
                  return true
                }
              }
            },
            created() {
              EventBus.$on("setPerfil", (el) => {
                this.isNormativo = el
              })
              EventBus.$emit("getPerfil", this.data)
            }
          })
        };
      },
      fileTemplate: function () {
        return {
          template: Vue.component("fileTemplate", {
            template: `
                <div class="text-center" v-if="data.archivo">
                  <button
                    @click="toFile"
                    class="btn btn-primary btn-sm"  
                    type="button" 
                    >
                    <span class="glyphicon glyphicon-file" aria-hidden="true"></span>
                  </button> 
                </div>
              `,
            data: function () {
              return {
                data: {}
              };
            },
            methods: {
              toFile() {
                var blob = base64toBlob(this.data.archivo);
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                  var win = window.navigator.msSaveOrOpenBlob(blob, "pdfBase64.pdf");
                } else {
                  const blobUrl = URL.createObjectURL(blob);
                  var win = window.open(blobUrl);
                }
                if (win) {
                  //Browser has allowed it to be opened
                  win.focus();
                } else {
                  //Browser has blocked it
                  alert('Por favor permitir los popups para este sitio');
                }
              }
            }
          })
        };
      },
      budgetTemplate: function () {
        return {
          template: Vue.component("BudgetTemplate", {
            template: `
                <div class="text-center">
                  <button
                    @click="toBudget"
                    class="btn btn-primary btn-sm"  
                    type="button" 
                    >
                    <span class="glyphicon glyphicon-usd" aria-hidden="true"></span>
                  </button> 
                </div>
              `,
            data: function () {
              return {
                data: {}
              };
            },
            methods: {
              toBudget() {
                EventBus.$emit("toBudget", this.data)
              }
            }
          })
        };
      },
      modificatorioTemplate: function () {
        return {
          template: Vue.component("modificatorioTemplate", {
            template: `<div v-if="data.hasOwnProperty('modificatorio') && data.modificatorio.length > 0" class="text-center">
                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 
                </div>`,
            data: function () {
              return {
                data: {}
              };
            },
          })
        };
      },
      montoTemplate: function () {
        return {
          template: Vue.component("montoTemplate", {
            template: `<div class="text-center">
              {{ getData() }}                 
                </div>`,
            data: function () {
              return {
                data: {}
              }
            },
            methods: {
              getData() {
                if (this.data.monto == 'null') {
                  return '-'
                } else {
                  return this.data.monto
                }
              }
            }
          })
        }
      },
      tramoTemplate: function () {
        return {
          template: Vue.component("tramoTemplate", {
            template: `<div class="text-center">
              {{ getData() }}                 
                </div>`,
            data: function () {
              return {
                data: {}
              }
            },
            methods: {
              getData() {
                if (this.data.tramo == 'null') {
                  return '-'
                } else {
                  return this.data.tramo
                }
              }
            }
          })
        }
      },
      origenTemplate: function () {
        return {
          template: Vue.component("origenTemplate", {
            template: `<div class="text-center">
              {{ getData() }}                 
                </div>`,
            data: function () {
              return {
                data: {}
              }
            },
            methods: {
              getData() {
                if (this.data.origen == 'null') {
                  return '-'
                } else {
                  return this.data.origen
                }
              }
            }
          })
        }
      },
      footerTotal: function () {
        return {
          template: Vue.component('maxTemplate', {
            template: `<span><strong>Total:</strong></span>`,
            data() { return { data: {} }; }
          })
        }
      },
      footerMonto: function () {
        return {
          template: Vue.component('footerMonto', {
            template: `<span>{{data.Custom}}</span>`,
            data() {
              return {
                data: {
                }
              }
            },
          })
        }
      },
      footerMeta: function () {
        return {
          template: Vue.component('minTemplate', {
            template: `<span>{{ data.Custom }}</span>`,
            data() { return { data: {} }; }
          })
        }
      },
    }
  },
  provide: {
    treegrid: [Page, Aggregate, Resize]
  },
  validations: {
    form: {
      anio: {
        required,
      },
      monto: {
        maxValue: maxValue(999999)
      },
      meta: {
        required,
      }
    },
    formMoficatorio: {
      anio: {
        required,
      },
      monto: {
        maxValue: maxValue(999999)
      },
      meta: {
        required,
      }
    }
  },
  methods: {
    openModalAddConvenio() {
      this.clearForm()
      this.loadAnios()
      this.clearMesasAvance()
      this.loadMesAvence(true)
      this.mode = 'new'
      this.modalTitle = 'Ingresar Datos del Convenio'
      this.showAdminModalConvenio = true
    },
    closeModal() {
      this.showAdminModalConvenio = false
      this.clearForm()
    },
    clearForm() {
      this.mode = ''
      this.form.id = -1
      this.form.anio = ''
      this.form.tramo = ''
      this.form.monto = ''
      this.form.origen = ''
      this.form.meta = ''
      this.form.archivo = null
      this.form.es_modificatorio = false
      this.form.modificatorio = 0
      this.isDisabled = false
      this.btnIsDisabled = false
      this.beneficiario_id = 0

    },
    beforeOpen() {
      this.loadAnios()
      bodyScroll.freeze()
    },
    beforeClose() {
      this.clearForm()
      bodyScroll.unfreeze()
    },
    loadAnios() {
      if (this.mode !== 'new') {
        this.anios = this.aniosEdit
      } else {
        this.anios = this.anios.filter(i => {
          const removeIndex = this.convenios.findIndex(item => item.anio === i.anio)
          if (removeIndex == -1) {
            return i
          }
        })
      }
    },
    onFileSelected(event) {
      this.form.archivo = event.target.files[0];
    },
    onFileSelectedModificatorio(event) {
      this.formMoficatorio.archivo = event.target.files[0];
    },
    async listaconvenio() {
      console.log("CAMINO ID");
      console.log(this.camino_id);
      // this.convenios = await getConveniosGet(this.camino_id)
      this.convenios = await getConveniosGet(7)
      this.$refs.gridConvenios.refresh()
      console.log("tis convenios get");
      console.log(this.convenios);
    },
    deleteConvenio() {
      this.$confirm('¿Desea eliminar el presente convenio?', 'Warning', {
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(async () => {
        let loadingInstance = Loading.service({ fullscreen: true, lock: true });
        await bajaConvenio(this.form.id).then(async () => {
          await this.listaconvenio()
          // this.$refs.gridConvenios.refresh()
          this.$alert(`El convenio ha sido cancelado`, 'INFORMACIÓN', {
            confirmButtonText: 'Cerrar',
            customClass: 'box-msg-login',
          })
        }).catch(async (e) => {
          console.log(e)
          let second = 10;
          const timer = setInterval(() => {
            second--;
            if (second) {
              this.$emit("show-error", 'Error al eliminar el Convenio');
            } else {
              this.$emit("show-error", false);
              clearInterval(timer);
            }
          }, 1000);
        }).finally(() => {
          this.showAdminModalConvenio = false
          loadingInstance.close();
        })
      }).catch((e) => {
        console.log(e)
      });

    },
    async saveEditConvenio(isNew) {
      const { isValido, errors } = this.getErrors('form')
      if (!isValido) {
        this.convenioErrors = errors
        let second = 15;
        const timer = setInterval(() => {
          second--;
          if (!second) {
            clearInterval(timer);
            this.convenioErrors = []
          }
        }, 1000);
        this.$alert(`Verifica los campos faltantes o con información errónea`, 'INFORMACIÓN', {
          confirmButtonText: 'Aceptar',
          customClass: 'box-msg-login',
        })
        return;
      }
      let formData = new FormData();
      formData.append("anio", this.form.anio);
      formData.append("tramo", this.form.tramo);
      formData.append("monto", this.form.monto);
      formData.append("origen", this.form.origen);
      formData.append("meta", this.form.meta);
      formData.append("estatus", "A");
      formData.append("beneficiario_id", this.beneficiario_id);
      let avanceMes = []
      this.mesesMetas.map(e => {
        avanceMes.push({
          "mes": e.mes,
          "avance": e.avance
        })
      })

      formData.append("avances", JSON.stringify(avanceMes))
      if (this.form.archivo) {
        formData.append("archivo", this.form.archivo);
      } else {
        formData.append("archivo", '');
      }

      if (isNew) {
        formData.append("modificatorio", false)
        formData.append("padre", 0)
        await this.crearConvenio(formData)
      } else {
        await this.actualizarConvenio(formData)
      }
    },
    async crearConvenio(formData) {
      let loadingInstance = Loading.service({ fullscreen: true, lock: true });
      await generarConvenio(formData, this.camino_id).then(async () => {
        await this.listaconvenio()
        // this.$refs.gridConvenios.refresh()
        this.$alert(`El convenio ha sido creado`, 'INFORMACIÓN', {
          confirmButtonText: 'Cerrar',
          customClass: 'box-msg-login',
        })
      }).catch((e) => {
        console.log(e)
        let second = 10;
        const timer = setInterval(() => {
          second--;
          if (second) {
            this.$emit("show-error", 'Error al crear el Convenio los datos ');
          } else {
            this.$emit("show-error", false);
            clearInterval(timer);
          }
        }, 1000);
      }).finally((e) => {
        loadingInstance.close();
        this.showAdminModalConvenio = false;
      })
    },
    confirmSaveModificatorio() {
      this.$confirm(`Al ingresar un nuevo convenio modificatorio, 
              el convenio original estará en modo de consulta.`, 'Alerta', {
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        customClass: 'confirmSaveModificatorio',
        type: 'warning'
      }).then(async () => {
        this.saveConvenioModificatorio()
      }).catch(async (e) => {
        console.log(e)
        this.closeModalModificatorio()
      })

    },
    async saveConvenioModificatorio() {
      const { isValido, errors } = this.getErrors('formMoficatorio')
      if (!isValido) {
        this.convenioModificatrioErrors = errors
        let second = 15;
        const timer = setInterval(() => {
          second--;
          if (!second) {
            clearInterval(timer);
            this.convenioModificatrioErrors = []
          }
        }, 1000);
        this.$alert(`Verifica los campos faltantes o con información errónea`, 'INFORMACIÓN', {
          confirmButtonText: 'Aceptar',
          customClass: 'box-msg-login',
        })
        return;
      }
      let loadingInstance = Loading.service({ fullscreen: true, lock: true });
      let formData = new FormData();
      formData.append("anio", this.formMoficatorio.anio);
      formData.append("tramo", this.formMoficatorio.tramo);
      formData.append("monto", this.formMoficatorio.monto);
      formData.append("origen", this.formMoficatorio.origen);
      formData.append("meta", this.form.meta);
      formData.append("padre", this.formMoficatorio.padre);
      formData.append("estatus", "A");
      let avanceMes = []
      this.mesesMetas.map(e => {
        avanceMes.push({
          "mes": e.mes,
          "avance": e.avance
        })
      })
      formData.append("avances", JSON.stringify(avanceMes))
      formData.append("beneficiario_id", this.beneficiario_id);
      if (this.formMoficatorio.archivo) {
        formData.append("archivo", this.formMoficatorio.archivo);
      }
      await createModificatorio(formData).then(async () => {
        // this.$refs.gridConvenios.refresh()
        await this.listaconvenio()
        // this.$refs.gridConvenios.refresh()
        this.$alert(`El convenio ha sido creado`, 'INFORMACIÓN', {
          confirmButtonText: 'Cerrar',
          customClass: 'box-msg-login',
        })
      }).catch(e => {
        console.log(e)
        let second = 10;
        const timer = setInterval(() => {
          second--;
          if (second) {
            this.$emit("show-error", 'Error al crear el Convenio los datos ');
          } else {
            this.$emit("show-error", false);
            clearInterval(timer);
          }
        }, 1000);
      }).finally((_) => {
        this.showAdminModalConvenio = false;
        this.showAdminModalConvenioMod = false;
        loadingInstance.close();
      })
    },
    closeModalModificatorio() {
      this.formMoficatorio.anio = ''
      this.formMoficatorio.tramo = ''
      this.formMoficatorio.monto = ''
      this.formMoficatorio.origen = ''
      this.formMoficatorio.padre = 0
      this.formMoficatorio.modificatorio = 0
      this.formMoficatorio.es_modificatorio = false
      this.showAdminModalConvenioMod = false
    },
    openModalModificatorio() {
      this.formMoficatorio.anio = this.form.anio
      this.formMoficatorio.padre = this.form.id
      this.formMoficatorio.tramo = this.form.tramo
      this.formMoficatorio.monto = this.form.monto
      this.formMoficatorio.origen = this.form.origen
      this.formMoficatorio.meta = this.form.meta
      this.loadMesAvence(false)
      this.showAdminModalConvenioMod = true
    },
    async actualizarConvenio(formData) {
      let loadingInstance = Loading.service({ fullscreen: true, lock: true });
      await updateConvenio(formData, this.form.id).then(async () => {
        await this.listaconvenio()
        // this.$refs.gridConvenios.refresh()
        this.$alert(`El Convenio ha sido actualizado`, 'INFORMACIÓN', {
          confirmButtonText: 'Cerrar',
          customClass: 'box-msg-login',
        })
      }).catch((e) => {
        console.log(e)
        let second = 10;
        const timer = setInterval(() => {
          second--;
          if (second) {
            this.$emit("show-error", 'Error al actualizar el Convenio');
          } else {
            this.$emit("show-error", false);
            clearInterval(timer);
          }
        }, 1000);
      }).finally((e) => {
        loadingInstance.close();
        this.showAdminModalConvenio = false;
      })
    },
    customAggregateMontoFn(data) {
      const sumMonto = data.result.reduce((tot, element) => {
        if (element.hasChildRecords &&
          element.modificatorio.length > 0) {
          return (tot || 0)
        }
        return tot + Number((element.monto == 'null' ? 0 : element.monto))
      }, 0)
      return sumMonto
    },
    customAggregateMetaFn(data) {
      const sumMeta = data.result.reduce((tot, element) => {
        if ((element.hasChildRecords)
          && (element.hasOwnProperty('modificatorio'))
          && (element.modificatorio.length > 0)) {
          return tot
        }
        return tot + Number(element.meta)
      }, 0)
      return sumMeta
    },
    async fetchDataAvance(idConvenio) {
      this.dataAvance = await getAvanceConvenio(idConvenio)
    },
    openModalBeneficiario() {
      console.log('----------->')
      this.$refs.modalBeneficiario.loadbeneficiario(this.beneficiario_id)
      this.$refs.modalBeneficiario.showAdminModalBeneficiario = true
    },
    openModalCalendarioObra() {
      this.dataAvance = []
      if (!this.form.meta || this.form.meta === 0) {
        this.$alert('Primero debe establecer la Meta', '', {
          confirmButtonText: 'Cerrar',
          callback: action => {
          }
        });
        return
      }
      if (this.getSumMeta < 0) {
        this.$alert(`La Meta del convenio sobre pasa la Longitud por programar`, 'INFORMACIÓN', {
          confirmButtonText: 'Cerrar',
          customClass: 'box-msg-login',
        })
        return
      }
      this.showModalCalendarioObra = true

    },
    async loadMesAvence(isNew) {
      this.sumMesAvance = 0
      if (!isNew) {
        await this.fetchDataAvance(this.form.id)
        this.mesesMetas.map(e => {
          const mes = this.dataAvance.findIndex(item => item.mes === e.mes)
          e.avance = this.dataAvance[mes].avance
        })
        this.getTotalAvanceMeta = 1
      }
    },
    getErrors(form) {
      this.$v[form].$touch()
      let errors = []
      let metaError = false
      if (this[form].archivo) {
        errors = [].concat(validateFile(this[form]))

        if (this.sumMesAvance != this.form.meta) {
          metaError = true
          errors.push({
            error: `*La Sumatoria de la Meta 
              Calendarizada no coincide con la Meta del Convenio`})
        }
      }
      if (!this.$v[form].anio.required) {
        errors.push({ error: '*El año es obligatorio' })
      }

      if (this.$v[form].anio.required && !metaError) {
        if (Number(this[form].anio) < Number(new Date().getFullYear())
          && this.sumMesAvance != this.form.meta) {
          errors.push({
            error: `*La Sumatoria de la Meta 
              Calendarizada no coincide con la Meta del Convenio`})
        }
      }
      if (!this.$v[form].meta.required) {
        errors.push({ error: '*La meta es obligatoria' })
      }
      if (this.getSumMeta < 0) {
        errors.push({ error: '*La Meta no pede ser mayor a la longitud total' })
      }
      return { isValido: errors.length > 0 ? false : true, errors: errors }
    },
    clearMesasAvance() {
      this.dataAvance = []
      this.mesesMetas.map(m => {
        m.avance = 0
      })
    },
    closeModalCalMeta() {
      this.clearMesasAvance()
      this.showModalCalendarioObra = false
    },
    saveCalendarioMeta() {
      if (this.sumMesAvance > this.form.meta) {
        this.$alert(`La sumatoria del avance mensual 
            no puede ser mayor a la meta del Convenio: ${this.form.meta}`, 'INFORMACIÓN', {
          confirmButtonText: 'Cerrar',
          customClass: 'box-msg-login',
        })
        return
      }
      this.showModalCalendarioObra = false
    },
    async setCatMeses() {
      this.mesesMetas = await getCatMeses()
      this.mesesMetas.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      this.mesesMetas = this.mesesMetas.map(e => ({
        ...e,
        mes: e.id,
        avance: 0
      }))
    }
  },
  computed: {
    isCanceled: function () {
      if (this.$store.state.cancelConvenio.id) {
        this.openmodal()
      }
      return this.$store.state.cancelConvenio.id
    },
    getCurrentLongitud() {
      return 314156 // TODO: BOrrar despues del debugging
      let subTotalLong = 0
      subTotalLong = this.convenios.reduce((total, convenio) => {
        const activeConvenio = getActiveConvenio(convenio)
        if (activeConvenio.id == this.form.id) {
          activeConvenio.meta = Number(this.form.meta)
        }
        return total + activeConvenio.meta
      }, 0)
      return this.mode === 'new' ? Number(subTotalLong) + Number(this.form.meta) : Number(subTotalLong)
    },
    getSumMeta() {
      return this.longitudP - this.getCurrentLongitud
    },
    getTotalAvanceMeta: {
      get: function () {
        console.log('getTotalAvanceMeta')
        const avance = this.mesesMetas.reduce((tot, m) => {
          return Number(tot) + Number(m.avance)
        }, 0)
        this.sumMesAvance = avance
        return this.sumMesAvance
      },
      set: function (val) {

      }
    }

  },

  created() {
    this.listaconvenio()
    console.log("Longitud Pavimentar");
    console.log(this.longitud_pavimentar);
    this.longitudP = this.longitud_pavimentar
    EventBus.$on('deleteConvenio', (obj) => {
      const { el, parent } = obj;
      this.loadAnios()
      this.form.id = el.id
      this.form.padre = parent
      this.form.anio = el.anio
      this.form.tramo = el.tramo
      this.form.monto = el.monto
      this.form.origen = el.origen
      this.form.meta = el.meta
      this.form.archivo = el.archivo
      this.mode = 'delete'
      this.modalTitle = 'Eliminar Datos del Convenio'
      this.isDisabled = true
      this.btnIsDisabled = false
      this.showAdminModalConvenio = true
    });
    EventBus.$on('toBudget', (el) => {
      this.$store.commit('setIdConcevenio', el.id)
      this.$router.push(`/presupuesto/${this.$route.params.obraId}/${el.anio}/${this.$store.state.camino.ancho}/${el.id}/${el.meta}/`).catch((e) => { console.log('') });
    })
    EventBus.$on("getPerfil", (el) => {
      EventBus.$emit("setPerfil", this.isNormativo)
    })
    this.setCatMeses()
  },
  beforeMount: function () {
    this.isNormativo = (this.$store.getters['user/StateRol'] == 'NORMATIVO')
    this.cons = this.isObraCanceled
    this.flagEdicion = !this.cons
    this.anios = [
      { anio: 2019 },
      { anio: 2020 },
      { anio: 2021 },
      { anio: 2022 },
      { anio: 2023 },
      { anio: 2024 },
    ]
    this.aniosEdit = [
      { anio: 2019 },
      { anio: 2020 },
      { anio: 2021 },
      { anio: 2022 },
      { anio: 2023 },
      { anio: 2024 },
    ]
  },
  mounted() {
    // this.$refs.gridConvenios.ej2Instances.grid.defaultLocale.EmptyRecord = "No hay convenios";
    bodyScroll.init()
  }
}

// TODO: Investigar que hace esta función
// TODO: Investigar que es un modificatorio
function getActiveConvenio(convenio) {
  let _convenio
  if (hasChildren(convenio) && convenio.estatus === 'M') {
    _convenio = convenio.modificatorio.reduce((c) => {
      return getActiveConvenio(c)
    })
  } else if (!hasChildren(convenio) && convenio.estatus === 'A') {
    _convenio = convenio
  }
  return _convenio

}

function hasChildren(node) {
  return (typeof node === 'object')
    && (node.hasOwnProperty('modificatorio')
      && (node.modificatorio.length > 0));
}
function base64toBlob(base64Data) {
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: "application/pdf" });
}
function validateFile(form) {
  const allowedExtensions = ['pdf']
  const sizeLimit = 12000000
  const { name: fileName, size: fileSize } = form.archivo
  const fileExtension = fileName.split(".").pop();
  let fileError = []
  if (!allowedExtensions.includes(fileExtension)) {
    fileError.push({ error: '*La extensión del archivo no es valida' })
  } else if (fileSize > sizeLimit) {
    fileError.push({ error: '*El tamaño del archivo excede los 12 megas' })
  }
  return fileError

}
</script>


<style scoped>
@import '~animate.css/animate.css';

.form-control-tramo {
  width: 20%;

}

.to-left {
  display: flex
}

.scrollable-modal {
  display: flex !important;
  flex-direction: column !important;
  height: calc(100% - 150px) !important;
}

.scrollable-modal .vm-titlebar {
  flex-shrink: 0 !important;
}

.scrollable-modal .vm-content {
  padding: 0 !important;
  flex-grow: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  min-height: 0 !important;
}

.scrollable-modal .vm-content .scrollable-content {
  position: relative !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  padding: 10px 15px 10px 15px !important;
  flex-grow: 1 !important;
}

.scrollable-modal .scrollable-modal-footer {
  padding: 15px 0px 15px 0px !important;
  border-top: 1px solid #e5e5e5 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.modal-wrapper {
  display: flex !important;
  align-items: center !important;
}

.modal-wrapper .vm {
  top: auto !important;
}

.modal {
  min-width: 300px;
}

@media (min-width: 480px) {
  .modal.modal-sm {
    max-width: 300px !important;
  }
}

@media (min-width: 992px) {

  .modal.modal-lg,
  .modal.modal-xl {
    max-width: 800px !important;
  }
}

@media (min-width: 1200px) {
  .modal.modal-xl {
    max-width: 1140px !important;
  }
}

.modal-footer {
  padding: 15px 0px 0px 0px !important;
  border-top: 1px solid #e5e5e5 !important;
  margin-left: -14px !important;
  margin-right: -14px !important;
}

.fullscreen-modal {
  width: 50%;
  max-width: 50%;
}
</style>
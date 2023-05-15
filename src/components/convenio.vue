<template>
  <div>
    <ModalSCT v-if="modalAsignarResidente && getCaminoID">
      <h3 slot="header">Asignar Residente</h3>
      <div slot="body">
        <asignar-residente :id_camino="getCaminoID" v-on:closeModal="modalAsignarResidente = false"></asignar-residente>
      </div>
      <div slot="footer">
      </div>
    </ModalSCT>

    <ModalSCT v-if="modalEditarResidente && getCaminoID">
      <h3 slot="header">Editar Asignación</h3>
      <div slot="body">
        <EditarAsignacionResidente :id_camino="getCaminoID" v-on:closeModal="modalEditarResidente = false">
        </EditarAsignacionResidente>
      </div>
      <div slot="footer">
      </div>
    </ModalSCT>

    <div class="col-md-12 mx-auto">
      <div class="row">
        <h3>Programación de Obra </h3>
        <hr class="red">
      </div>
    </div>
    <button
      :disabled="cons"
      type="button"
      @click="openModalAddConvenio"
      class="btn btn-primary"
      style="margin-bottom: 15px;"
    >
      Nuevo Convenio
    </button>
    <table-base
      :options="featureOptions"
      :headers="headers"
      :data="convenios"
    />

    <!--Convenio Nuevo & Edit--->
    <Modal :title="modalTitle" modal-class="modal2" v-model="showAdminModalConvenio" @before-open="beforeOpen"
      @before-close="beforeClose">
      <form class="scrollable-content">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="tramo">Beneficiario:</label>
            <select name="beneficiario" id="beneficiario" class="form-control" :disabled="isDisabled"
              v-model="form.beneficiario_id">
              <option value="" disabled>Seleccionar...</option>
              <option v-for="(beneficiario, index) in beneficiarios" :key="index" :value="beneficiario.id">
                {{ beneficiario.value }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="anio">Año del Convenio: </label>
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
            <vue-numeric
              :precision="2"
              separator=","
              class="form-control avance-mes"
              v-model="form.monto"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="meta">Meta:</label>
            <vue-numeric
              :precision="2"
              separator=","
              class="form-control avance-mes"
              v-model="form.meta"
            />
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
          <div class="form-group col-md-6">
            <label class="control-label">Longitud a Pavimentar</label>
            <input type="number" :value="longitudP" class="form-control" disabled id="inpt-longitud">
          </div>
          <div class="form-group col-md-12">
            <label class="control-label">Longitud por programar</label>
            <input v-model="getSumMeta" type="number" class="form-control" disabled>
          </div>
        </div>
        <div class="form-row">
          <div style="font-size: 14px;">
            <strong>
              Valores aceptados
            </strong>
            <br />
            <small>
              Lat: 14.517000 a 32.754000
            </small>
            <br />
            <small>
              Lon: -117.080000 a -86.363800
            </small>
            <br />
            <br />
          </div>
          <p>Punto Inicial</p>
          <div class="form-group col-md-6">
            <label class="control-label">Lon</label>
            <input type="number" class="form-control" id="inpt-longitud" v-model="form.lon_inicial"
              :class="!$v.form.lon_inicial.decimales ? 'form-control-error' : ''">
            <div class="row col-md-10">
              <small v-if="!$v.form.lon_inicial.decimales" class="form-text form-text-error">
                Introduce una longitud dentro de México
              </small>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label class="control-label">Lat</label>
            <input type="number" class="form-control" v-model="form.lat_inicial"
              :class="!$v.form.lat_inicial.decimales ? 'form-control-error' : ''">
            <div class="row col-md-10">
              <small v-if="!$v.form.lat_inicial.decimales" class="form-text form-text-error">
                Introduce una latitud dentro de México
              </small>
            </div>
          </div>
          <p>Punto Final</p>
          <div class="form-group col-md-6">
            <label class="control-label">Lon</label>
            <input type="number" class="form-control" id="inpt-longitud" v-model="form.lon_final"
              :class="!$v.form.lon_final.decimales ? 'form-control-error' : ''">
            <div class="row col-md-10">
              <small v-if="!$v.form.lon_final.decimales" class="form-text form-text-error">
                Introduce una longitud dentro de México
              </small>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label class="control-label">Lat</label>
            <input type="number" class="form-control" v-model="form.lat_final"
              :class="!$v.form.lat_final.decimales ? 'form-control-error' : ''">
            <div class="row col-md-10">
              <small v-if="!$v.form.lat_final.decimales" class="form-text form-text-error">
                Introduce una latitud dentro de México
              </small>
            </div>
          </div>
        </div>
        <div>
          <div v-for="(error, index) in  convenioErrors" :key="index" class="col-md-12">
            <small style="color: red!important;" class="form-text form-text-error">
              {{ error.error }}
            </small>
          </div>
        </div>
        <div class="form-row col-md-12">
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
    <ModalBeneficiario ref="modalBeneficiario" :isReadOnly="btnIsDisabled" :beneficiario_id="beneficiario_id"
      :convenio-id="currentAgreementIdSelected" />
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
    <modal title="Representantes" modal-class="scrollable-modal" wrapper-class="animate__animated"
      v-model="modalRepresentatives" in-class="animate__backInDown" bg-in-class="animate__fadeInUp">
      <button class="btn btn-default" style="margin-bottom: 15px; margin-right: 0px; margin-left: auto; display: block;"
        type="button" @click="openModalBeneficiario()">
        Agregar representante
      </button>
      <ejs-grid ref="grid" :dataSource="representativesList" gridLines="Both" :allowPaging="false" :allowSorting="true"
        :pageSettings="{
          pageCount: 5,
          pageSize: 20,
        }" :allowTextWrap="true">
        <e-columns>
          <e-column
            v-for="(column, key) in [
              {
                field: 'fullName',
                headerText: 'Nombre completo',
              },
              {
                field: 'rfc',
                headerText: 'RFC',
              },
            ]"
            :key="key"
            :field="column.field"
            :headerText="column.headerText"
          />
          <e-column
            field="clave"
            :template="IconTemplate2"
            headerText="Desactivar"
            textAlign="Center"
          />
        </e-columns>
      </ejs-grid>
    </modal>
  </div>
</template>
  
<script>
import Vue from 'vue';
import Vuelidate from 'vuelidate'
import { Loading } from 'element-ui';
import VueModal from '@kouts/vue-modal'
import ModalSCT from './Modals/SCTModal.vue'
import '@kouts/vue-modal/dist/vue-modal.css'
import ModalBeneficiario from './Modals/Beneficiario.vue'
import EventBus from '../utils/EventBus.js';
import bodyScroll from 'body-scroll-freezer'
import { required, maxValue, } from 'vuelidate/lib/validators'
import { generarConvenio, updateConvenio, createModificatorio, bajaConvenio, getAvanceConvenio, getConveniosGet, getCatMeses } from '@/api/convenio';
import VueNumeric from 'vue-numeric'
import { getBeneficiariosDropdown } from '@/api/beneficiarios'
import PlaceholderComponent from './PlaceholderComponent.vue';
import AsignarResidente from '@/components/Residentes/AsignarResidente.vue';
import EditarAsignacionResidente from './Residentes/EditarAsignacionResidente.vue';
import { updateRepresentative } from '@/api/beneficiarios'
import TableBase from '@/components/v2/TableBase'

Vue.use(VueNumeric)
Vue.use(Vuelidate)

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
    ModalBeneficiario,
    PlaceholderComponent,
    AsignarResidente,
    ModalSCT,
    EditarAsignacionResidente,
    TableBase,
  },
  data() {
    return {
      headers: [
        {
          label: 'Año del Convenio',
          field: 'anio',
        },
        {
          label: 'Tramo',
          field: 'tramo',
        },
        {
          label: 'Monto(mdp)',
          field: 'monto',
        },
        {
          label: 'Meta(km)',
          field: 'meta',
        },
        {
          label: 'Tiene Convenio Modificatorio',
          field: 'initDate',
        },
        {
          label: 'Archivo',
          field: 'endDate',
        },
      ],
      featureOptions: [
        {
          label: 'Editar convenio',
          action: (ctx) => this.toEdit(ctx),
          isVisible: () => (this.$store.getters['user/StateRol'] == 'NORMATIVO'),
        },
        {
          label: 'Eliminar convenio',
          action: (ctx) => this.deleteConvenio(ctx),
        },
        {
          label: 'Agregar convenio modificatorio',
          action: (ctx) => console.log('heyy'),
        },
        {
          label: 'Presupuesto',
          action: (ctx) => {
            this.$store.commit('setIdConcevenio', ctx.id)
            this.$router.push(`/presupuesto/${this.$route.params.obraId}/${ctx.anio}/${this.$store.state.camino.ancho}/${ctx.id}/${ctx.meta}/`)
          },
        },
        {
          label: 'Representantes',
          action: (agreement) => this.$router.push({
            name: 'Representatives',
            params: {
              agreementId: agreement.id,
            }
          })
        },
        {
          label: 'Editar asignacion',
          action: () => (this.modalEditarResidente = true),
          isVisible: () => (this.$store.getters['user/StateRol'] == 'NORMATIVO'),
        },
        {
          label: 'Asignar residente',
          action: () => (this.modalAsignarResidente = true),
          isVisible: () => (this.$store.getters['user/StateRol'] == 'NORMATIVO'),
        },
      ],
      modalAsignarResidente: false,
      modalEditarResidente: false,
      currentAgreementIdSelected: null,
      modalRepresentatives: false,
      representativesList: [],
      beneficiarios: [],
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
        beneficiario_id: '',
        lon_inicial: 0,
        lat_inicial: 0,
        lon_final: 0,
        lat_final: 0
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
      convenios: [],
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
      IconTemplate2: function () {
        return {
          template: Vue.component('IconTemplate', {
            template: `
                <div class="text-center">
                  <button
                    @click="handleClick"
                    class="btn btn-primary btn-sm"
                    type="button"
                  >
                    <span class="glyphicon glyphicon-remove" aria-hidden="true" />
                  </button>
                </div>
              `,
            data: function () {
              return {
                data: {}
              };
            },
            methods: {
              handleClick() {
                EventBus.$emit("handleClick2", this.data)
              }
            }
          })
        };
      },
      IconTemplateEdit: function () {
        return {
          template: Vue.component('IconTemplateEdit', {
            template: `
                <div class="text-center">
                  <button
                    @click="handleClick"
                    class="btn btn-primary btn-sm"
                    type="button"
                  >
                    <span class="glyphicon glyphicon-pencil" aria-hidden="true" />
                  </button>
                </div>
              `,
            data: function () {
              return {
                data: {}
              };
            },
            methods: {
              handleClick() {
                EventBus.$emit("handleClickEdit", this.data)
              }
            }
          })
        };
      },
    }
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
      },
      lat_inicial: {
        decimales: function validateDecimal(valor) {
          var RE = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,7})?|180\.0{1,10})$/ /* /^\d*(\.\d{1})?\d{0,6}$/; */
          if (RE.test(valor) && valor <= 32.754000 && valor >= 14.517000) {
            return true;
          } else if (valor === '') {
            return true;
          }
          else {
            return false;
          }
        }
      },
      lon_inicial: {
        decimales: function validateDecimal(valor) {
          var RE = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,7})?|180\.0{1,10})$/ /* /^\d*(\.\d{1})?\d{0,6}$/; */
          if (RE.test(valor) && valor <= - 86.363800 && valor >= -117.080000) {
            return true;
          } else if (valor === '') {
            return true;
          }
          else {
            return false;
          }
        }
      },
      lat_final: {
        decimales: function validateDecimal(valor) {
          var RE = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,7})?|180\.0{1,10})$/ /* /^\d*(\.\d{1})?\d{0,6}$/; */
          if (RE.test(valor) && valor <= 32.754000 && valor >= 14.517000) {
            return true;
          } else if (valor === '') {
            return true;
          } else {
            return false;
          }
        }
      },
      lon_final: {
        decimales: function validateDecimal(valor) {
          var RE = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,7})?|180\.0{1,10})$/ /* /^\d*(\.\d{1})?\d{0,6}$/; */
          if (RE.test(valor) && valor <= - 86.363800 && valor >= -117.080000) {
            return true;
          } else if (valor === '') {
            return true;
          } else {
            return false;
          }
        }
      },
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
    // funcion llamada en la columna archivo template
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
    },
    toEdit(ctx) {
      this.modalTitle = 'Actualizar Datos del Convenio'
      this.mode = 'edit'
      this.form.id = ctx.id
      this.form.anio = ctx.anio
      this.form.tramo = ctx.tramo
      this.form.monto = ctx.monto
      this.form.origen = ctx.origen
      this.form.meta = ctx.meta
      this.form.archivo = ctx.archivo
      this.form.es_modificatorio = ctx.es_modificatorio
      this.form.modificatorio = 0
      if (ctx.estatus === 'M' || ctx.archivo) {
        this.isDisabled = true
        this.btnIsDisabled = true

      }
      this.beneficiario_id = ctx.beneficiario_id
      this.loadMesAvence(false)
      this.showAdminModalConvenio = true
    },
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
      this.convenios = await getConveniosGet(this.getCaminoID)
    },
    deleteConvenio(ctx) {
      this.$confirm('¿Desea eliminar el convenio?', 'Warning', {
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      })
      .then(async () => {
        const loading = Loading.service({ fullscreen: true, lock: true })
        try {
          await bajaConvenio(ctx.id)
          await this.listaconvenio()
          this.$swal('EXITO', 'Se elimino el Convenio', "success")
        } catch (error) {
          console.error(error)
          this.$swal('ERROR', 'Error al eliminar el Convenio', "error")
        }
        loading.close();
      })
    },
    async saveEditConvenio(isNew) {
      if (this.getSumMeta < 0) {
        return this.$alert(`El campo "Meta" no debe ser mayor a la longitud total a pavimentar`, 'INFORMACIÓN', {
          confirmButtonText: 'Aceptar',
          customClass: 'box-msg-login',
        })
      }
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
      if (this.form.lat_inicial != '') {
        formData.append("lat_inicial", this.form.lat_inicial);
      }
      if (this.form.lon_inicial != '') {
        formData.append("lon_inicial", this.form.lon_inicial);
      }
      if (this.form.lat_final != '') {
        formData.append("lat_final", this.form.lat_final);
      }
      if (this.form.lon_final != '') {
        formData.append("lon_final", this.form.lon_final);
      }
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
        this.$swal('EXITO', 'El convenio ha sido creado', "success")
      }).catch((e) => {
        console.log(e)
        let second = 10;
        const timer = setInterval(() => {
          second--;
          if (second) {
            /* this.$emit("show-error", 'Error al crear el Convenio los datos '); */
            this.$swal('ERROR', 'Error al crear el Convenio los datos', "error")
          } else {
            /*  this.$emit("show-error", false); */
            this.$swal('EXITO', 'Se creo los datos el Convenio', "success")
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
        this.$swal('WARNING', 'Verifica los campos faltantes o con información errónea', "warning")
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
        await this.listaconvenio()

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

    getCaminoID() {
      console.log("getCaminoID" + this.camino_id);
      return this.camino_id
    },

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
      const longitudTotal = this.longitudP
      // Quiza no estemos considerando alguna regla de negocio
      // solo calcular los convenios activos
      const sumaConvenios = this.convenios.reduce((a, b) => (Number(a.meta || 0) + Number(b.meta || 0)), 0);
      const longitudParcial = sumaConvenios + Number(this.form.meta);
      return longitudTotal - longitudParcial;
    },
    longitudP() {
      return Number(this.longitud_pavimentar)
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

  async created() {
    // this.listaconvenio()

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
    EventBus.$on("getPerfil", (el) => {
      EventBus.$emit("setPerfil", this.isNormativo)
    })
    EventBus.$on('handleClick2', async (representante) => {
      console.log('clickIcon2');
      console.log(representante);
      /* Desactivar representante del convenio */
      const currentDate = new Date()
      const day = currentDate.getDate()
      const month = currentDate.getMonth() + 1
      const year = currentDate.getFullYear()

      const formattedDate = `${day}-${month < 10 ? '0' + month : month}-${year}`

      await updateRepresentative({ id: representante.id, fecha_fin: formattedDate })
      await getRepresentativesByAgreement(representante.id_convenio)
      alert('Representante desactivado')

    })
    EventBus.$on('handleClickEdit', async (representante) => {
      console.log('handleClickEdit');
      console.log(representante);
      this.currentAgreementIdSelected = representante.id_convenio
      openModalBeneficiario()

    })
    this.setCatMeses()

    const { data } = await getBeneficiariosDropdown(this.$route.params.obraId).then((r) => {
      console.log(r);
      this.beneficiarios = r.map(tramo => ({
        id: tramo.id_beneficiario,
        value: tramo.clave_camino
          + tramo.clave_beneficiario
          + (tramo.municipio
            ? `: ${tramo.municipio}`
            : '')
      }))
    })

  },
  beforeMount() {
    this.listaconvenio()
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

    this.$refs.gridConvenios.ej2Instances.grid.defaultLocale.EmptyRecord = "No hay convenios";
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
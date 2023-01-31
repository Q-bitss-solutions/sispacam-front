<template>
  <div class="row">
    <div class="col-md-12">
      <!-- NAV TABS -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" id="tabDatosCamino" :class="getActiveTab === 'tabDG' ? 'active' : ''">
          <a href="#datosCamino" aria-controls="profile" role="tab" data-toggle="tab" id="input-1" aria-expanded="true">
            Datos del Camino
          </a>
        </li>
        <li v-if="false" role="presentation" id="tabDatosBeneficiario">
          <a href="#datosBeneficiario" aria-controls="profile" role="tab" data-toggle="tab" id="input-1"
            aria-expanded="true">
            Beneficiario
          </a>
        </li>
        <li v-if="($route.params.obraId && this.$store.getters['user/StateRol'] == 'NORMATIVO' && isCanceled == false)"
          role="presentation" id="tabAsina">
          <a href="#asignarresidente" aria-controls="profile" role="tab" data-toggle="tab" aria-expanded="true">
            Asignar
          </a>
        </li>
        <li v-if="$route.params.obraId" role="presentation" id="tabAsina" :class="getActiveTab === 'tabConv' ? 'active' : ''">
          <a href="#convenio" aria-controls="profile" role="tab" data-toggle="tab" aria-expanded="true">
            Programación
          </a>
        </li>


      </ul>

      <!-- TAB CONTENT -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane" :class="getActiveTab === 'tabDG' ? 'active' : ''" id="datosCamino">
          <FormEditarCamino :isCanceled="isCanceled"></FormEditarCamino>
        </div>
        <div role="tabpanel" class="tab-pane" id="datosBeneficiario">
          <DatosBeneficiario :isCanceled="isCanceled"> </DatosBeneficiario>
        </div>
        <div role="tabpanel" class="tab-pane" id="asignarresidente">
          <!-- <AsignarResidente :isCanceled="isCanceled"> </AsignarResidente> -->
          <p>AQUI VA COMPONENTE "ASIGNAR RESIDENTE"</p>
        </div>
        <div role="tabpanel" class="tab-pane" :class="getActiveTab === 'tabConv' ? 'active' : ''" id="convenio">
          <convenio :camino_id="camino.id" :isObraCanceled="isCanceled" :longitud_pavimentar="camino.longitud_pavimentar"
            @show-error="showError">
          </convenio>
        </div>
      </div>
      <div>
        <div v-if="msgError" class="alert alert-danger">{{ msgError }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import convenio from '@/components/convenio';
import { getupdate } from '@/api/alta-camino';
import { getDetalleCamino } from '@/api/caminos';
import AsignarResidente from '@/components/AsignarResidente';
import DatosFinancieros from '@/components/AltaDeCaminos/DatosFinancieros';
import DatosGeograficos from '@/components/AltaDeCaminos/DatosGeograficos1';
import DatosBeneficiario from '@/components/AltaDeCaminos/DatosBeneficiario';
import FormEditarCamino from '../../components/Caminos/FormEditarCamino.vue';


export default {
  name: 'AltaCamino',
  components: {
    DatosGeograficos,
    DatosBeneficiario,
    AsignarResidente,
    convenio,
    DatosFinancieros,
    FormEditarCamino
  },
  props: {
    tabDG: {
      type: Boolean,
      default: false
    },
    tabConv: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCanceled: false,
      camino_id: 0,
      cEstado: '',
      msgError: null,
      breadcrumb: ['Camino ' + this.$route.params.obraId],
      longitud_pavimentar: '',
      camino:{}
    }
  },
  methods: {
    setCEdo(e) {
      const obj = JSON.parse(JSON.stringify(e))
      this.cEstado = obj.datos
    },
    showError(e) {
      console.log('show-error')
      this.msgError = e;
      //setTimeout(() => this.msgError = false, 10000);
    },
    ...mapMutations(['setBreadcrumb']),
    async getStatus(clave) {

      // TODO:Agregar try catch cuando se preube que es la solución
      this.camino = await getDetalleCamino(clave)
      console.log("Camino");
      console.log(this.camino);
      console.log("Longitud Pavimentar");
      console.log(this.camino.longitud_pavimentar);

      // const response = await getupdate(clave)
      // this.isCanceled = response.estatus == 'C' ? true : false
      // this.longitud_pavimentar = response.longitud_pavimentar
    },
  },
  computed: {

    getActiveTab() {
      console.log('this.tabConv')
      console.log(this.tabConv)
      console.log(this.$route.params)
      return !this.$route.params.tabConv ? 'tabDG' : 'tabConv'
    }
  },
  created() {
    if (this.$route.params.obraId) {
      console.log("CREATED");
      this.setBreadcrumb(this.breadcrumb)
      this.getStatus(this.$route.params.obraId)
    }
  }
}
</script>

<template>
  <div>

    <hr class="red" />

    <h2>Edición del camino: {{clave}}</h2>

    <div class="row">
      <div class="row col-md-9">
        <div class="col-md-6">Tipo de Camino</div>
        <div class="col-md-6">{{ tipo_camino }}</div>
      </div>
      <div class="row col-md-9">
        <div class="col-md-6">Estado</div>
        <div class="col-md-6">{{ cve_agee }}</div>
      </div>
      <div class="row col-md-9">
        <div class="col-md-6">Municipio</div>
        <div class="col-md-6">{{ icve_municipio }}</div>
      </div>
      <div class="row col-md-9">
        <div class="col-md-6">Localidades</div>
        <div class="col-md-6">{{ localidades }}</div>
      </div>
    </div>

    <hr class="red" />

    <div class="row">
      <div class="col-md-12">
        <button class="btn btn-primary active" @click="showModal = true" type="button">
          Agregar Beneficiario de Obra
        </button>
      </div>
    </div>

    <ModalSCT v-if="showModal">
      <h3 slot="header">Agregar Beneficiario de Obra</h3>
      <FormAgregarBeneficiario @updateFrentes="GetConvenios" v-on:closeModal="showModal=false" slot="body" :clave_estado="camino.datos_geograficos.icve_estado_inegi">
      </FormAgregarBeneficiario>
    </ModalSCT>

    <hr class="red" />

    <div class="row">
      <tabla-frentes-camino @deleteBeneficiario="GetConvenios" :frentes="this.convenios"></tabla-frentes-camino>
    </div>

    <hr class="red" />

    <div class="row">
      <div class="col-md-8">
        <AgregadoFrentes :total_localidades="metrics.total_localidades"
          :poblacion_municipios="metrics.poblacion_municipio" :poblacion_localidades="metrics.poblacion_localidades"
          :poblacion_beneficiada="metrics.poblacion_beneficiada"></AgregadoFrentes>
      </div>
    </div>

  </div>
</template>

<script>
import TablaFrentesCamino from "../components/Caminos/TablaFrentesCamino.vue";
import ModalSCT from "../components/Modals/SCTModal.vue";
import FormAgregarBeneficiario from "../components/Caminos/FormAgregarBeneficiario.vue";
import { getupdate, listBeneficiariosCamino } from "../api/alta-camino";
import AgregadoFrentes from "../components/Caminos/AgregadoFrentes.vue";
export default {
  components: { TablaFrentesCamino, ModalSCT, FormAgregarBeneficiario, AgregadoFrentes },
  name: "EditarCamino",
  data() {
    return {
      camino : null,
      // TODO: Quitar endpoint harcodeadp
      showModal: false,
      icve_municipio: "San Juan Teita",
      localidades:
        'LAS PILAS, EL TERCO, EL TORITO',
      consecutivo: "2",
      tipo_camino: "C",
      nombre_camino: "CAMINOS DE OAXACA dlm",
      longitud: "2.0",
      longitud_pavimentar: "2.0",
      ancho_camino: 2,
      ubicacion_camino: "sureste",
      caracteristicas: "ctcc",
      beneficios: "benfc",
      ciit: true,
      tren_maya: false,
      caminos_originales: false,
      fecha: "2021-09-23T01:49:49.762Z",
      clave: this.$route.params.obraId,
      iso: "OAX",
      usuarios: null,
      estatus: "C",
      archivo: "",
      convenios: {},
    };
  },

  methods: {
    async GetCamino(clave) {
      const response = await getupdate(clave);
      this.camino = response;

    },
    closeModal() {
      console.log("Close Modal EC");
      this.showModal = false;
    },

    async GetConvenios() {
      console.log("GetConvenios");
      const response = await listBeneficiariosCamino(this.clave);
      this.convenios = response

    }
  },
  computed: {
    metrics() {
      const metrics = {
        total_localidades: 0,
        poblacion_municipio: 0,
        poblacion_localidades: 0,
        poblacion_beneficiada: 0
      }
      console.log("CONVENIOS");
      console.log(this.convenios);
      let municipios = []
      // Municipio sin localidad
      let msl =[]
      for (const e of this.convenios){
        if(!msl.includes(e.clave_municipio) && e.clave_localidad==''){
          msl.push(e.clave_municipio)
          metrics.poblacion_beneficiada+=(e.p_municipio*1)
        }
      }
      for (const e of this.convenios){
        if(!msl.includes(e.clave_municipio)){
          metrics.poblacion_beneficiada+=(e.p_total_localidades*1)
        }
      }
      for (const e of this.convenios) {
        if (!municipios.includes(e.clave_municipio)) {
          metrics.total_localidades += (e.num_localidades * 1)
          metrics.poblacion_municipio += (e.p_municipio * 1)
          metrics.poblacion_localidades += (e.p_total_localidades * 1)

          municipios.push(e.clave_municipio)
          
        }
      }
      return metrics
    }

  },

  created() {
    this.GetConvenios()
    this.GetCamino(this.clave)
  },


};
</script>
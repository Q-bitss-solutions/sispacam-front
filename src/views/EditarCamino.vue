<template>
  <div>

    <hr class="red" />

    <h2>Edición del camino: {{ clave }}</h2>

    <div class="row">
      <div class="row col-md-9">
        <div class="col-md-6">Tipo de Camino</div>
        <div class="col-md-6">{{ camino.tipo_camino }}</div>
      </div>
      <div class="row col-md-9">
        <div class="col-md-6">Estado</div>
        <div class="col-md-6">{{ camino.cve_agee }}</div>
      </div>
      <div class="row col-md-9">
        <div class="col-md-6">Municipio</div>
        <div class="col-md-6">{{ camino.icve_municipio }}</div>
      </div>
      <div class="row col-md-9">
        <div class="col-md-6">Localidades</div>
        <div class="col-md-6">{{ camino.localidades }}</div>
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
      <FormAgregarBeneficiario @updateFrentes="GetConvenios(camino.id)" v-on:closeModal="showModal=false" slot="body" :camino="camino">
      </FormAgregarBeneficiario>
    </ModalSCT>

    <hr class="red" />

    <div class="row">
      <tabla-frentes-camino @deleteBeneficiario="GetConvenios(camino.id)" :frentes="this.convenios"></tabla-frentes-camino>
    </div>

    <hr class="red" />

    <div class="row">
      <div class="col-md-8">
        <AgregadoFrentes :metrics="metrics"></AgregadoFrentes>
      </div>
    </div>

  </div>
</template>

<script>
import TablaFrentesCamino from "../components/Caminos/TablaFrentesCamino.vue";
import ModalSCT from "../components/Modals/SCTModal.vue";
import FormAgregarBeneficiario from "../components/Caminos/FormAgregarBeneficiario.vue";
import { getupdate, listBeneficiariosCamino, listMetricasBeneficiario } from "../api/alta-camino";
import AgregadoFrentes from "../components/Caminos/AgregadoFrentes.vue";
export default {
  components: { TablaFrentesCamino, ModalSCT, FormAgregarBeneficiario, AgregadoFrentes },
  name: "EditarCamino",
  data() {
    return {
      camino: null,
      showModal: false,
      metrics:[],

      // TODO: Quitar endpoint harcodeadp
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
      console.log("CAMINO");
      console.log(this.camino);
      this.GetConvenios(response.id)
      this.GetMetrics(response.id)
    },
    closeModal() {
      console.log("Close Modal EC");
      this.showModal = false;
    },

    async GetConvenios(id_camino) {
      console.log("GetConvenios");
      const response = await listBeneficiariosCamino(id_camino);
      this.convenios = response
    },
    async GetMetrics(id_camino){
      const response = await listMetricasBeneficiario(id_camino);
      console.log("METRICS");
      console.log(this.metrics);
      this.metrics = response
    }

  },

  created() {
    this.GetCamino(this.clave)
  },


};
</script>